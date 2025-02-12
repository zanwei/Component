import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { TabItem, DragItem } from '../types/tabs';

interface UseDragTabProps {
  tab: TabItem;
  index: number;
  moveTab: (dragIndex: number, hoverIndex: number) => void;
}

export function useDragTab({ tab, index, moveTab }: UseDragTabProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'TAB',
    item: () => ({ id: tab.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'TAB',
    hover(item: DragItem, monitor) {
      if (!ref.current) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) return;

      // Get mouse position relative to the dropped element
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      // Only perform the move when the mouse has crossed half of the items width
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return;
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return;

      // Update positions
      moveTab(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  return {
    ref,
    isDragging,
    dragDropRef: drag(drop(ref))
  };
} 