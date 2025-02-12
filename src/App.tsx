import React from 'react';
import { useAtom } from 'jotai';
import { Dropdown } from './components/Dropdown';
import { IconPanelB } from './components/IconPanelB';
import { JotaiPanel } from './components/JotaiPanel';
import { MultiTab } from './components/MultiTab';
import { activePanelAtom } from './store/atoms';
import './App.css';

function App() {
    const [activePanel] = useAtom(activePanelAtom);

    return (
        <div className="app">
            {/* Jotai Panel - 固定在左上角 */}
            <JotaiPanel />

            {/* 中央内容区域 */}
            <div className="content-wrapper">
                <div className="panel-container">
                    {activePanel === 'dropdown' && (
                        <div className="app">
                            <Dropdown onClose={() => {}} />
                        </div>
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
                </div>
            </div>
        </div>
    );
}

export default App; 