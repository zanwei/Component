import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './Tabs.css';

interface TabItem {
  id: string;
  title: string;
  content: React.ReactNode;
  isDirty?: boolean;
}

interface TabProps {
  tab: TabItem;
  isActive: boolean;
  onClose: (id: string) => void;
  onSelect: (id: string) => void;
  index: number;
  moveTab: (dragIndex: number, hoverIndex: number) => void;
}

const Tab: React.FC<TabProps> = ({ tab, isActive, onClose, onSelect, index, moveTab }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TAB',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'TAB',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveTab(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`tab ${isActive ? 'active' : ''} ${isDragging ? 'dragging' : ''}`}
      onClick={() => onSelect(tab.id)}
    >
      <span className="tab-title">
        {tab.title}
        {tab.isDirty && <span className="dirty-indicator">•</span>}
      </span>
      <button className="close-button" onClick={(e) => {
        e.stopPropagation();
        onClose(tab.id);
      }}>
        ×
      </button>
    </div>
  );
};

export const Tabs: React.FC = () => {
  const [tabs, setTabs] = useState<TabItem[]>([
    { id: '1', title: '未命名 1', content: '标签页 1 的内容' },
    { id: '2', title: '未命名 2', content: '标签页 2 的内容' },
  ]);
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleClose = (id: string) => {
    setTabs(tabs.filter(tab => tab.id !== id));
    if (activeTab === id) {
      setActiveTab(tabs[tabs.length - 2]?.id);
    }
  };

  const handleNewTab = () => {
    const newTab = {
      id: String(tabs.length + 1),
      title: `未命名 ${tabs.length + 1}`,
      content: `标签页 ${tabs.length + 1} 的内容`,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const moveTab = (dragIndex: number, hoverIndex: number) => {
    const newTabs = [...tabs];
    const dragTab = newTabs[dragIndex];
    newTabs.splice(dragIndex, 1);
    newTabs.splice(hoverIndex, 0, dragTab);
    setTabs(newTabs);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="tabs-container">
        <div className="tabs-header">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              onClose={handleClose}
              onSelect={setActiveTab}
              index={index}
              moveTab={moveTab}
            />
          ))}
          <button className="new-tab-button" onClick={handleNewTab}>
            +
          </button>
        </div>
        <div className="tab-content">
          {tabs.find(tab => tab.id === activeTab)?.content}
        </div>
      </div>
    </DndProvider>
  );
}; 