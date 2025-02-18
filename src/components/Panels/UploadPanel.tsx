import React from 'react';
import { atom, useAtom } from 'jotai';
import { UploadContainerPanel } from '../Upload/UploadContainerPanel';

export const uploadPanelAtom = atom({
  isVisible: false,
  files: []
});

export const UploadPanel: React.FC = () => {
  const [{ isVisible }] = useAtom(uploadPanelAtom);

  if (!isVisible) return null;

  return (
    <div className="panel upload-panel">
      <UploadContainerPanel 
        files={[]}
        onAddMore={() => {}}
        onDelete={() => {}}
        onMove={() => {}}
      />
    </div>
  );
}; 