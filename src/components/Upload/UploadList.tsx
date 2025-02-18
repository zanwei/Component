import * as React from 'react';
import { FileIcon, MoreVertical, Download, Trash2 } from 'lucide-react';
import './UploadContainerPanel.css';

interface UploadListProps {
    files: File[];
    onAddMore: () => void;
    onDelete: (index: number) => void;
}

export const UploadList: React.FC<UploadListProps> = ({ files, onAddMore, onDelete }) => {
    const [openMenuIndex, setOpenMenuIndex] = React.useState<number | null>(null);

    const handleMenuClick = (index: number) => {
        setOpenMenuIndex(openMenuIndex === index ? null : index);
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

    const handleClickOutside = React.useCallback(() => {
        setOpenMenuIndex(null);
    }, []);

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <div className="upload-container-panel">
            <div className="upload-files-list">
                {files.map((file, index) => (
                    <div key={index} className="upload-file-item">
                        <div className="upload-file-info">
                            <FileIcon className="upload-file-icon" />
                            <span className="upload-file-name">{file.name}</span>
                        </div>
                        <button 
                            className="upload-file-menu-trigger"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleMenuClick(index);
                            }}
                        >
                            <MoreVertical size={16} />
                        </button>
                        {openMenuIndex === index && (
                            <div className="upload-file-menu">
                                <button 
                                    className="upload-file-menu-item"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDownload(file);
                                        setOpenMenuIndex(null);
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
                                        setOpenMenuIndex(null);
                                    }}
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