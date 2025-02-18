import * as React from 'react';
import { useAtom } from 'jotai';
import { Dropdown } from './components/Dropdown';
import { IconPanelB } from './components/IconPanel';
import { JotaiPanel } from './components/JotaiPanel';
import { MultiTab } from './components/MultiTab';
import { activePanelAtom } from './store/atoms';
import { Upload } from './components/Upload/Upload';
import { UploadList } from './components/Upload/UploadList';
import { WorkspacePicker } from './components/Workspace';
import './App.css';

const App: React.FC = () => {
    const [activePanel] = useAtom(activePanelAtom);
    const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);

    const handleFileSelect = (file: File) => {
        setUploadedFiles(prev => [...prev, file]);
    };

    const handleDelete = (index: number) => {
        setUploadedFiles(prev => {
            const newFiles = [...prev];
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    return (
        <div className="app">
            {/* Jotai Panel - 固定在左上角 */}
            <JotaiPanel />

            {/* 中央内容区域 */}
            <div className="content-wrapper">
                <div className="panel-container">
                    {activePanel === 'dropdown' && (
                        <div className="panel-content">
                            <Dropdown value="" onChange={() => {}} />
                        </div>
                    )}

                    {activePanel === 'icon' && (
                        <div className="panel-content">
                            <IconPanelB 
                                onSelect={(iconName) => {
                                    console.log('Selected emoji:', iconName);
                                }}
                                recentIcons={[]}
                            />
                        </div>
                    )}

                    {activePanel === 'multi-tab' && (
                        <div className="panel-content">
                            <MultiTab />
                        </div>
                    )}

                    {activePanel === 'upload' && (
                        <div className="panel-content">
                            {uploadedFiles.length === 0 ? (
                                <Upload 
                                    maxSize={100}
                                    onFileSelect={handleFileSelect}
                                />
                            ) : (
                                <UploadList 
                                    files={uploadedFiles}
                                    onAddMore={() => setUploadedFiles([])}
                                    onDelete={handleDelete}
                                />
                            )}
                        </div>
                    )}

                    {activePanel === 'workspace' && (
                        <div className="panel-content">
                            <WorkspacePicker />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App; 