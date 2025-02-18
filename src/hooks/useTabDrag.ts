import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier } from 'dnd-core';

interface DragItem {
  id: string;
  index: number;
}

interface UseTabDragProps {
  id: string;
  index: number;
  moveTab: (dragIndex: number, hoverIndex: number) => void;
  updateInsertPosition: (position: { index: number; side: 'left' | 'right' } | null) => void;
}

export const useTabDrag = ({ id, index, moveTab, updateInsertPosition }: UseTabDragProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'TAB',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'TAB',
    hover: (item: DragItem, monitor) => {
      if (!ref.current) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveTab(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return {
    ref,
    isDragging,
  };
}; 