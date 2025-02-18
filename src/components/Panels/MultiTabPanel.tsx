import React from 'react';
import { atom, useAtom } from 'jotai';
import { MultiTab } from '../MultiTab';

export const multiTabPanelAtom = atom({
  isVisible: false,
});

export const MultiTabPanel: React.FC = () => {
  const [{ isVisible }] = useAtom(multiTabPanelAtom);

  if (!isVisible) return null;

  return (
    <div className="panel multi-tab-panel">
      <MultiTab />
    </div>
  );
}; 