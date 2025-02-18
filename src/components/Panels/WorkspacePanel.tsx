import React from 'react';
import { atom, useAtom } from 'jotai';
import { WorkspacePicker } from '../WorkspacePicker';

export const workspacePanelAtom = atom({
  isVisible: false,
});

export const WorkspacePanel: React.FC = () => {
  const [{ isVisible }] = useAtom(workspacePanelAtom);

  if (!isVisible) return null;

  return (
    <div className="panel workspace-panel">
      <WorkspacePicker />
    </div>
  );
}; 