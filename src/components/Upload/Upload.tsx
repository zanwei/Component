import * as React from 'react';
import { UploadContainerPanel } from './UploadContainerPanel';
import './Upload.css';

interface UploadProps {
  maxSize?: number;
  onFileSelect?: (file: File) => void;
}

export const Upload: React.FC<UploadProps> = ({ maxSize = 100, onFileSelect }) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const file = selectedFiles[0];
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size should not exceed ${maxSize}MB`);
        return;
      }
      setFiles([...files, file]);
      onFileSelect?.(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  // 如果有文件，只显示 UploadContainerPanel
  if (files.length > 0) {
    return (
      <UploadContainerPanel 
        files={files} 
        onAddMore={() => inputRef.current?.click()}
        onRemove={(index) => {
          const newFiles = [...files];
          newFiles.splice(index, 1);
          setFiles(newFiles);
        }}
      />
    );
  }

  // 如果没有文件，显示上传界面
  return (
    <div className="upload-container">
      <input
        ref={inputRef}
        type="file"
        className="upload-input"
        onChange={handleFileSelect}
      />
      <button className="upload-button" onClick={handleClick}>
        Add a file or image
      </button>
      <div className="upload-info">
        <span className="upload-size-limit">Max file size: {maxSize}MB</span>
        <a href="#" className="upload-pro-link">
          Upgrade to Pro
        </a>
      </div>
    </div>
  );
}; 