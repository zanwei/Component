import * as React from 'react';
import { useAtom } from 'jotai';
import { Dropdown } from './components/Dropdown';
import { IconPanelB } from './components/IconPanel';
import { JotaiPanel } from './components/JotaiPanel';
import { MultiTab } from './components/MultiTab';
import { activePanelAtom } from './store/atoms';
import { Upload } from './components/Upload';
import { WorkspacePicker } from './components/Workspace';
import './App.css';

const App: React.FC = () => {
    const [activePanel] = useAtom(activePanelAtom);

    return (
        <div className="app">
            {/* Jotai Panel - 固定在左上角 */}
            <JotaiPanel />

            {/* 中央内容区域 */}
            <div className="content-wrapper">
                <div className="panel-container">
                    {activePanel === 'dropdown' && (
                        <Dropdown value="" onChange={() => {}} />
                    )}

                    {activePanel === 'icon' && (
                        <IconPanelB 
                            onSelect={(iconName) => {
                                console.log('Selected emoji:', iconName);
                            }}
                            recentIcons={[]}
                        />
                    )}

                    {activePanel === 'multi-tab' && (
                        <div className="multi-tab-container">
                            <MultiTab />
                        </div>
                    )}

                    {activePanel === 'upload' && (
                        <div className="upload-container">
                            <Upload 
                                maxSize={100}
                                onFileSelect={(file) => {
                                    console.log('Selected file:', file);
                                }}
                            />
                        </div>
                    )}

                    {activePanel === 'workspace' && (
                        <div className="workspace-container">
                            <WorkspacePicker />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App; 