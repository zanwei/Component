import { useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DragTypes } from '../constants/dndTypes';
import type { TabItem } from '../types/tabs';

interface DragItem {
  id: string;
  index: number;
  type: string;
}

interface UseTabDragProps {
  id: string;
  index: number;
  moveTab: (dragIndex: number, hoverIndex: number) => void;
  updateInsertPosition: (position: { index: number; side: 'left' | 'right' } | null) => void;
}

export function useTabDrag({ 
  id, 
  index, 
  moveTab, 
  updateInsertPosition 
}: UseTabDragProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: DragTypes.TAB,
    item: () => ({ id, index, type: DragTypes.TAB }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveTab(item.index, index);
      }
      updateInsertPosition(null);
    },
  });

  const [, drop] = useDrop({
    accept: DragTypes.TAB,
    hover(item: DragItem, monitor) {
      if (!ref.current) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        updateInsertPosition(null);
        return;
      }

      const hoverRect = ref.current.getBoundingClientRect();
      const hoverMiddleX = (hoverRect.right - hoverRect.left) / 2;
      const mousePosition = monitor.getClientOffset();
      if (!mousePosition) return;

      const hoverClientX = mousePosition.x - hoverRect.left;
      const dragDirection = dragIndex < hoverIndex ? 1 : -1;

      // 计算移动阈值和插入位置
      const moveThreshold = dragDirection === 1 ? 
        hoverMiddleX + hoverRect.width * 0.2 : 
        hoverMiddleX - hoverRect.width * 0.2;

      // 更新插入位置指示器
      if (dragDirection === 1) {
        if (hoverClientX > moveThreshold) {
          updateInsertPosition({ index: hoverIndex, side: 'right' });
          moveTab(dragIndex, hoverIndex);
          item.index = hoverIndex;
        } else {
          updateInsertPosition({ index: hoverIndex, side: 'left' });
        }
      } else {
        if (hoverClientX < moveThreshold) {
          updateInsertPosition({ index: hoverIndex, side: 'left' });
          moveTab(dragIndex, hoverIndex);
          item.index = hoverIndex;
        } else {
          updateInsertPosition({ index: hoverIndex, side: 'right' });
        }
      }
    },
    drop() {
      updateInsertPosition(null);
    },
  });

  return {
    isDragging,
    dragDropRef: drag(drop(ref)),
  };
} 