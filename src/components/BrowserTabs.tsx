import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './BrowserTabs.css';

interface TabItem {
  id: string;
  title: string;
  favicon?: string;
  url: string;
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
      className={`browser-tab ${isActive ? 'active' : ''} ${isDragging ? 'dragging' : ''}`}
      onClick={() => onSelect(tab.id)}
    >
      <div className="tab-content">
        {tab.favicon && (
          <img src={tab.favicon} alt="" className="favicon" />
        )}
        <span className="title">{tab.title}</span>
        <button 
          className="close-button"
          onClick={(e) => {
            e.stopPropagation();
            onClose(tab.id);
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export const BrowserTabs: React.FC = () => {
  const [tabs, setTabs] = useState<TabItem[]>([
    {
      id: '1',
      title: '起始页',
      url: 'about:blank',
      favicon: 'https://www.google.com/favicon.ico'
    },
  ]);
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleClose = (id: string) => {
    if (tabs.length === 1) {
      handleNewTab();
    }
    setTabs(tabs.filter(tab => tab.id !== id));
    if (activeTab === id) {
      setActiveTab(tabs[tabs.length - 2]?.id);
    }
  };

  const handleNewTab = () => {
    const newTab = {
      id: String(Date.now()),
      title: '新标签页',
      url: 'about:blank',
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
      <div className="browser-window">
        <div className="browser-tabs-container">
          <div className="tabs-row">
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
          </div>
          <button className="new-tab-button" onClick={handleNewTab}>
            +
          </button>
        </div>
        <div className="browser-content">
          <div className="address-bar">
            <input 
              type="text" 
              value={tabs.find(tab => tab.id === activeTab)?.url} 
              placeholder="输入网址或搜索内容"
            />
          </div>
          <div className="page-content">
            {/* 页面内容区域 */}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}; 