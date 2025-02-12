import React from 'react';
import { useAtom } from 'jotai';
import { MultiTabPanel, multiTabPanelAtom } from './Panels/MultiTabPanel';

export const MainPanel: React.FC = () => {
  const [, setMultiTabPanel] = useAtom(multiTabPanelAtom);

  const handleShowMultiTab = () => {
    setMultiTabPanel(prev => ({ ...prev, isVisible: true }));
  };

  return (
    <div className="main-panel">
      <div className="panel-controls">
        <button onClick={handleShowMultiTab}>
          Show Multi-Tab
        </button>
      </div>
      <MultiTabPanel />
    </div>
  );
}; 