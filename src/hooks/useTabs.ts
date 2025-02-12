import { useState } from 'react';
import type { TabItem } from '../types/tabs';

const INITIAL_TABS: TabItem[] = [
  { id: '1', title: 'Tab 1' },
  { id: '2', title: 'Tab 2' },
  { id: '3', title: 'Tab 3' },
  { id: '4', title: 'Tab 4' },
  { id: '5', title: 'Tab 5' },
];

export function useTabs() {
  const [tabs, setTabs] = useState<TabItem[]>(INITIAL_TABS);
  const [activeTab, setActiveTab] = useState(INITIAL_TABS[0].id);

  const handleMove = (dragIndex: number, hoverIndex: number) => {
    setTabs(prev => {
      const newTabs = [...prev];
      const [draggedTab] = newTabs.splice(dragIndex, 1);
      newTabs.splice(hoverIndex, 0, draggedTab);
      return newTabs;
    });
  };

  const handleClose = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    setTabs(prev => {
      const newTabs = prev.filter(tab => tab.id !== id);
      
      if (newTabs.length === 0) {
        const newTab = {
          id: String(Date.now()),
          title: 'Tab 1'
        };
        setActiveTab(newTab.id);
        return [newTab];
      }

      if (activeTab === id) {
        const currentIndex = prev.findIndex(tab => tab.id === id);
        const newActiveId = newTabs[currentIndex - 1]?.id || newTabs[0].id;
        setActiveTab(newActiveId);
      }

      return newTabs;
    });
  };

  const handleAdd = () => {
    const newTab = {
      id: String(Date.now()),
      title: `Tab ${tabs.length + 1}`
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTab(newTab.id);
  };

  const handleRename = (id: string, newTitle: string) => {
    setTabs(prev => 
      prev.map(tab => tab.id === id ? { ...tab, title: newTitle } : tab)
    );
  };

  const handleSelect = (id: string) => {
    setActiveTab(id);
  };

  return {
    tabs,
    activeTab,
    handleMove,
    handleClose,
    handleAdd,
    handleRename,
    handleSelect,
  };
} 