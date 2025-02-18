import * as React from 'react';
import { FileIcon, MoreVertical, Download, Trash2, Loader } from 'lucide-react';
import './UploadContainerPanel.css';

interface UploadListProps {
    files: File[];
    onDelete: (index: number) => void;
    onFileSelect: (file: File) => void;
    maxSize: number;
}

interface FileWithStatus extends File {
    isUploading?: boolean;
}

export const UploadList: React.FC<UploadListProps> = ({ files, onDelete, onFileSelect, maxSize }) => {
    const [openMenuIndex, setOpenMenuIndex] = React.useState<number | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [uploadingStates, setUploadingStates] = React.useState<boolean[]>(files.map(() => false));

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

    const handleAddMore = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > maxSize * 1024 * 1024) {
            alert(`File size must be less than ${maxSize}MB`);
            return;
        }

        await onFileSelect(file);
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
            <input
                ref={fileInputRef}
                type="file"
                className="upload-input"
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
            />
            <div className="upload-files-list">
                {files.map((file, index) => (
                    <div key={index} className="upload-file-item">
                        <div className="upload-file-info">
                            <FileIcon className="upload-file-icon" />
                            <span className="upload-file-name">{file.name}</span>
                            {uploadingStates[index] && (
                                <Loader className="upload-loading-icon" size={16} />
                            )}
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
            <button className="upload-add-more" onClick={handleAddMore}>
                <span className="upload-add-more-icon">+</span>
                Add a file or image
            </button>
        </div>
    );
}; 