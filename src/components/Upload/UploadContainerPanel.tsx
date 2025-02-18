import React, { useState, useEffect, useRef } from 'react';
import { 
  FileIcon, ImageIcon, FileTextIcon, 
  FileVideoIcon, FileAudioIcon, FileJsonIcon, FileCodeIcon,
  MoreVertical, Download, Trash2, Loader2
} from 'lucide-react';
import './UploadContainerPanel.css';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface UploadContainerPanelProps {
  files: Array<{
    file: File;
    previewUrl: string | null;
    loading?: boolean;
  }>;
  onAddMore: () => void;
  onDelete: (index: number) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}

export type FileType = 'document' | 'image' | 'audio' | 'video' | 'data' | 'code' | 'other';

interface DragItem {
  index: number;
  type: string;
}

const FileItem: React.FC<{
  item: UploadContainerPanelProps['files'][0];
  index: number;
  onDelete: (index: number) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  getFileIcon: (fileType: FileType) => JSX.Element;
  getFileType: (file: File) => FileType;
  formatFileName: (filename: string) => string;
  handleDownload: (file: File) => void;
}> = ({ item, index, onDelete, onMove, getFileIcon, getFileType, formatFileName, handleDownload }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [activeMenu, setActiveMenu] = useState<boolean>(false);

  const [{ isDragging }, drag] = useDrag({
    type: 'FILE_ITEM',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !item.loading,
  });

  const [, drop] = useDrop({
    accept: 'FILE_ITEM',
    hover(dragItem: DragItem, monitor) {
      if (!ref.current) return;
      const dragIndex = dragItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      onMove(dragIndex, hoverIndex);
      dragItem.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenu(!activeMenu);
  };

  return (
    <div 
      ref={ref}
      className={`upload-file-item ${isDragging ? 'dragging' : ''}`}
    >
      {item.loading ? (
        <div className="upload-file-info loading">
          <Loader2 className="upload-loading-icon" />
          <span className="upload-file-name">Loading...</span>
        </div>
      ) : (
        item.previewUrl ? (
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
        )
      )}
      <button 
        className="upload-file-menu-trigger"
        onClick={handleMenuClick}
        disabled={item.loading}
      >
        <MoreVertical size={16} />
      </button>
      {activeMenu && !item.loading && (
        <div className="upload-file-menu">
          <button 
            className="upload-file-menu-item"
            onClick={(e) => {
              e.stopPropagation();
              handleDownload(item.file);
            }}
          >
            <Download size={16} />
            Download
          </button>
          <button 
            className="upload-file-menu-item"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(index);
            }}
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export const UploadContainerPanel: React.FC<UploadContainerPanelProps> = ({
  files,
  onAddMore,
  onDelete,
  onMove
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

  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="upload-container-panel">
        <div className="upload-files-list">
          {files.map((item, index) => (
            <FileItem
              key={`${item.file.name}-${index}`}
              item={item}
              index={index}
              onDelete={onDelete}
              onMove={onMove}
              getFileIcon={getFileIcon}
              getFileType={getFileType}
              formatFileName={formatFileName}
              handleDownload={handleDownload}
            />
          ))}
        </div>
        <button className="upload-add-more" onClick={onAddMore}>
          <span className="upload-add-more-icon">+</span>
          Add a file or image
        </button>
      </div>
    </DndProvider>
  );
}; 