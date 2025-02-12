import React, { useRef, useState, useEffect } from 'react';
import type { TabProps } from '../../types/tabs';
import { useTabDrag } from '../../hooks/useTabDrag';

export const Tab: React.FC<TabProps> = ({ 
  tab, 
  index, 
  isActive, 
  moveTab, 
  onClose, 
  onSelect, 
  onRename,
  insertPosition,
  onUpdateInsertPosition
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(tab.title);

  const { dragDropRef, isDragging, handlerId } = useTabDrag({
    id: tab.id,
    index,
    moveTab,
    updateInsertPosition: onUpdateInsertPosition
  });

  const showLeftIndicator = insertPosition?.index === index && insertPosition?.side === 'left';
  const showRightIndicator = insertPosition?.index === index && insertPosition?.side === 'right';

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
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <div
      ref={dragDropRef}
      className={`tab ${isActive ? 'active' : ''} ${isDragging ? 'dragging' : ''}`}
      data-handler-id={handlerId}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={() => onSelect(tab.id)}
      onDoubleClick={handleDoubleClick}
    >
      {showLeftIndicator && (
        <div className="tab-insert-indicator visible" style={{ left: -1 }} />
      )}
      {showRightIndicator && (
        <div className="tab-insert-indicator visible" style={{ right: -1 }} />
      )}
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