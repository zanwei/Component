import React, { useRef, useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { TabProps, DragItem } from '../../types/tabs';

export const Tab: React.FC<TabProps> = ({ 
  tab, 
  index, 
  isActive, 
  moveTab, 
  onClose, 
  onSelect, 
  onRename 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropIndicator, setDropIndicator] = useState<'left' | 'right' | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(tab.title);

  const [{ isDragging }, drag] = useDrag({
    type: 'TAB',
    item: { id: tab.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => setDropIndicator(null),
  });

  const [, drop] = useDrop({
    accept: 'TAB',
    hover(item: DragItem, monitor) {
      if (!ref.current || !monitor.isOver({ shallow: true })) {
        setDropIndicator(null);
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        setDropIndicator(null);
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset!.x - hoverBoundingRect.left;

      setDropIndicator(hoverClientX < hoverMiddleX ? 'left' : 'right');
    },
    drop(item: DragItem, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset!.x - hoverBoundingRect.left;

      const finalIndex = hoverClientX < hoverMiddleX ? hoverIndex : hoverIndex + 1;

      moveTab(dragIndex, finalIndex);
      setDropIndicator(null);
    },
  });

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditValue(tab.title);
  };

  const handleInputBlur = () => {
    if (editValue.trim()) {
      onRename(tab.id, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && editValue.trim()) {
      onRename(tab.id, editValue.trim());
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setEditValue(tab.title);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (!isDragging) {
      setDropIndicator(null);
    }
  }, [isDragging]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    return () => setDropIndicator(null);
  }, []);

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`tab ${isActive ? 'active' : ''} ${isDragging ? 'dragging' : ''} ${
        dropIndicator ? `drop-${dropIndicator}` : ''
      }`}
      onClick={() => onSelect(tab.id)}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          className="tab-input"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <span className="tab-title">{tab.title}</span>
      )}
      <button 
        className="tab-close"
        onClick={(e) => onClose(tab.id, e)}
      >
        ×
      </button>
    </div>
  );
}; 