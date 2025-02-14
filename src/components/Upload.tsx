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

interface UploadedFile {
  file: File;
  previewUrl: string | null;
  loading?: boolean;
}

export const Upload: React.FC<UploadProps> = ({ 
  maxSize = 100,
  onFileSelect 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  // 监听文件列表变化，当列表为空时重置状态
  useEffect(() => {
    if (uploadedFiles.length === 0 && status === 'complete') {
      setStatus('idle');
    }
  }, [uploadedFiles.length, status]);

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

    // 添加新文件到列表，标记为 loading
    const newFile: UploadedFile = {
      file,
      previewUrl: null,
      loading: true
    };
    setUploadedFiles(prev => [...prev, newFile]);
    setStatus('complete');

    // 模拟上传过程
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 如果是图片，创建预览URL
    let previewUrl = null;
    if (isImageFile(file)) {
      previewUrl = URL.createObjectURL(file);
    }

    // 更新文件状态，移除 loading 标记
    setUploadedFiles(prev => prev.map(f => 
      f.file === file ? { ...f, previewUrl, loading: false } : f
    ));
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
            <a 
              href="https://affine.pro/pricing" 
              className="upload-pro-link"
              target="_blank"  // 在新标签页打开
              rel="noopener noreferrer"  // 安全性考虑
            >
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
      />
    </>
  );
}; 