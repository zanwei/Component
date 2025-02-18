import * as React from 'react';
import { UploadContainerPanel } from '../Upload/UploadContainerPanel';
import './UploadPanel.css';

interface FileItem {
  file: File;
  previewUrl: string | null;
  loading?: boolean;
}

export const UploadPanel: React.FC = () => {
  const [files, setFiles] = React.useState<FileItem[]>([]);

  return (
    <div className="upload-panel">
      <UploadContainerPanel
        files={files}
        onAddMore={() => {}}
        onRemove={(index: number) => {
          const newFiles = [...files];
          if (newFiles[index].previewUrl) {
            URL.revokeObjectURL(newFiles[index].previewUrl);
          }
          newFiles.splice(index, 1);
          setFiles(newFiles);
        }}
      />
    </div>
  );
}; 