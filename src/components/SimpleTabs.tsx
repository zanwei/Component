import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Tab } from './Tab';
import { useTabs } from '../hooks/useTabs';
import './SimpleTabs.css';

export const SimpleTabs: React.FC = () => {
  const {
    tabs,
    activeTab,
    handleMove: moveTab,
    handleClose,
    handleAdd: handleAddTab,
    handleRename,
    handleSelect: setActiveTab,
  } = useTabs();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="simple-tabs-container">
        <div className="tabs-scroll-container">
          <div className="tabs-wrapper">
            {tabs.map((tab, index) => (
              <Tab
                key={tab.id}
                tab={tab}
                index={index}
                isActive={activeTab === tab.id}
                moveTab={moveTab}
                onClose={handleClose}
                onSelect={setActiveTab}
                onRename={handleRename}
              />
            ))}
          </div>
        </div>
        <button className="add-tab-button" onClick={handleAddTab}>
          +
        </button>
      </div>
    </DndProvider>
  );
}; 