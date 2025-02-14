import React, { useState, useEffect } from 'react';
import { 
  FileIcon, ImageIcon, FileTextIcon, 
  FileSpreadsheetIcon, FileTypeIcon, FileVideoIcon,
  FileAudioIcon, FileJsonIcon, FileCodeIcon,
  MoreVertical, Download, Trash2
} from 'lucide-react';
import './UploadContainerPanel.css';

interface UploadContainerPanelProps {
  files: Array<{
    file: File;
    previewUrl: string | null;
  }>;
  onAddMore: () => void;
  onDelete: (index: number) => void;
}

export type FileType = 'document' | 'image' | 'audio' | 'video' | 'data' | 'code' | 'other';

export const UploadContainerPanel: React.FC<UploadContainerPanelProps> = ({
  files,
  onAddMore,
  onDelete
}) => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

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

  const getFileType = (file: File): FileType => {
    const { type, name } = file;
    const extension = name.split('.').pop()?.toLowerCase();

    if (fileTypes.document.includes(type) || ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'md'].includes(extension || '')) {
      return 'document';
    }
    if (fileTypes.image.includes(type) || ['jpg', 'jpeg', 'png', 'gif', 'svg', 'bmp', 'webp'].includes(extension || '')) {
      return 'image';
    }
    if (fileTypes.audio.includes(type) || ['mp3', 'wav', 'm4a'].includes(extension || '')) {
      return 'audio';
    }
    if (fileTypes.video.includes(type) || ['mp4', 'mov', 'webm'].includes(extension || '')) {
      return 'video';
    }
    if (fileTypes.data.includes(type) || ['csv', 'json'].includes(extension || '')) {
      return 'data';
    }
    if (fileTypes.code.includes(type) || ['html', 'htm', 'txt'].includes(extension || '')) {
      return 'code';
    }
    return 'other';
  };

  const getFileIcon = (fileType: FileType) => {
    switch (fileType) {
      case 'document':
        return <FileTextIcon className="upload-file-icon" />;
      case 'image':
        return <ImageIcon className="upload-file-icon" />;
      case 'audio':
        return <FileAudioIcon className="upload-file-icon" />;
      case 'video':
        return <FileVideoIcon className="upload-file-icon" />;
      case 'data':
        return <FileJsonIcon className="upload-file-icon" />;
      case 'code':
        return <FileCodeIcon className="upload-file-icon" />;
      default:
        return <FileIcon className="upload-file-icon" />;
    }
  };

  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toLowerCase() || '';
  };

  const formatFileName = (filename: string) => {
    const extension = getFileExtension(filename);
    const nameWithoutExt = filename.replace(new RegExp(`\\.${extension}$`), '');
    
    if (nameWithoutExt.length <= 20) {
      return filename;
    }
    
    return `${nameWithoutExt.slice(0, 20)}...${extension ? `.${extension}` : ''}`;
  };

  const handleDownload = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleMenuClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="upload-container-panel">
      <div className="upload-files-list">
        {files.map((item, index) => (
          <div key={`${item.file.name}-${index}`} className="upload-file-item">
            {item.previewUrl ? (
              <div className="upload-preview">
                <img src={item.previewUrl} alt="Preview" className="upload-preview-image" />
              </div>
            ) : (
              <div className="upload-file-info">
                {getFileIcon(getFileType(item.file))}
                <span className="upload-file-name">
                  {formatFileName(item.file.name)}
                </span>
              </div>
            )}
            <button 
              className="upload-file-menu-trigger"
              onClick={(e) => handleMenuClick(index, e)}
            >
              <MoreVertical size={16} />
            </button>
            {activeMenu === index && (
              <div className="upload-file-menu">
                <button 
                  className="upload-file-menu-item"
                  onClick={() => handleDownload(item.file)}
                >
                  <Download size={16} />
                  Download
                </button>
                <button 
                  className="upload-file-menu-item"
                  onClick={() => onDelete(index)}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="upload-add-more" onClick={onAddMore}>
        <span className="upload-add-more-icon">+</span>
        Add a file or image
      </button>
    </div>
  );
}; 