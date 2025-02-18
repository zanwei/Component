import * as React from 'react';
import { FileIcon, MoreVertical, Loader } from 'lucide-react';
import './Upload.css';

interface UploadProps {
    maxSize: number;
    onFileSelect: (file: File) => void;
}

export const Upload: React.FC<UploadProps> = ({ maxSize, onFileSelect }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > maxSize * 1024 * 1024) {
            alert(`File size must be less than ${maxSize}MB`);
            return;
        }

        setIsLoading(true);
        try {
            await onFileSelect(file);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="upload-container">
            <input
                ref={fileInputRef}
                type="file"
                className="upload-input"
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
            />
            {isLoading ? (
                <div className="upload-loading">
                    <Loader className="upload-loading-icon" size={20} />
                    Uploading...
                </div>
            ) : (
                <>
                    <button className="upload-button" onClick={handleClick}>
                        Add a file or image
                    </button>
                    <div className="upload-info">
                        <span className="upload-size-limit">The maximum size per file is {maxSize}MB</span>
                        <a href="#" className="upload-pro-link">
                            Upgrade to Pro
                        </a>
                    </div>
                </>
            )}
        </div>
    );
}; 