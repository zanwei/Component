import React, { useRef, useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { UploadContainerPanel } from './UploadContainerPanel';
import './Upload.css';
import type { FileType } from './UploadContainerPanel';  // 导入 FileType 类型

interface UploadProps {
  maxSize?: number; // 单位：MB
  onFileSelect?: (file: File) => void;
}

type UploadStatus = 'idle' | 'loading' | 'complete';

export const Upload: React.FC<UploadProps> = ({ 
  maxSize = 100,
  onFileSelect 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    file: File;
    previewUrl: string | null;
  }>>([]);

  // 监听文件列表变化，当列表为空时重置状态
  useEffect(() => {
    if (uploadedFiles.length === 0 && status === 'complete') {
      setStatus('idle');
    }
  }, [uploadedFiles.length, status]);

  const fileTypes = {
    document: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/markdown'
    ],
    image: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/svg+xml',
      'image/bmp',
      'image/webp'
    ],
    audio: [
      'audio/mpeg',
      'audio/wav',
      'audio/mp4'
    ],
    video: [
      'video/mp4',
      'video/quicktime',
      'video/webm'
    ],
    data: [
      'text/csv',
      'application/json'
    ],
    code: [
      'text/html',
      'text/plain'
    ]
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const isImageFile = (file: File) => {
    const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp'];
    return imageTypes.includes(file.type);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxSize) {
      alert(`File size exceeds ${maxSize}MB limit`);
      return;
    }

    setStatus('loading');

    // 模拟上传过程
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 如果是图片，创建预览URL
    let previewUrl = null;
    if (isImageFile(file)) {
      previewUrl = URL.createObjectURL(file);
    }

    setUploadedFiles(prev => [...prev, { file, previewUrl }]);
    setStatus('complete');
    onFileSelect?.(file);
  };

  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toLowerCase() || '';
  };

  return (
    <>
      {status === 'idle' && (
        <div className="upload-container">
          <button className="upload-button" onClick={handleClick}>
            Choose a file
          </button>
          <div className="upload-info">
            <span className="upload-size-limit">
              The maximum size per file is {maxSize}MB
            </span>
            <a href="#" className="upload-pro-link">
              Upgrade to Pro
            </a>
          </div>
        </div>
      )}

      {status === 'loading' && (
        <div className="upload-container">
          <div className="upload-loading">
            <Loader2 className="upload-loading-icon" />
            <span>Loading...</span>
          </div>
        </div>
      )}

      {status === 'complete' && uploadedFiles.length > 0 && (
        <UploadContainerPanel
          files={uploadedFiles}
          onAddMore={handleClick}
          onDelete={(index) => {
            setUploadedFiles(prev => prev.filter((_, i) => i !== index));
          }}
        />
      )}

      <input
        ref={inputRef}
        type="file"
        className="upload-input"
        onChange={handleFileChange}
        accept={Object.values(fileTypes).flat().join(',')}
      />
    </>
  );
}; 