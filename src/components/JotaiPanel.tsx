import React from 'react';
import { useAtom } from 'jotai';
import { activePanelAtom, togglePanelAtom } from '../store/atoms';
import './JotaiPanel.css';

export const JotaiPanel = () => {
    const [activePanel] = useAtom(activePanelAtom);
    const [, togglePanel] = useAtom(togglePanelAtom);

    return (
        <div className="jotai-panel">
            <div className="jotai-header">Jotai Panel</div>
            <div className="jotai-content">
                <button 
                    className={`jotai-button ${activePanel === 'dropdown' ? 'active' : ''}`}
                    onClick={() => togglePanel('dropdown')}
                >
                    Dropdown Menu
                </button>
                <button 
                    className={`jotai-button ${activePanel === 'icon' ? 'active' : ''}`}
                    onClick={() => togglePanel('icon')}
                >
                    Emoji Panel
                </button>
                <button 
                    className={`jotai-button ${activePanel === 'multi-tab' ? 'active' : ''}`}
                    onClick={() => togglePanel('multi-tab')}
                >
                    Multi Tab
                </button>
                <button 
                    className={`jotai-button ${activePanel === 'upload' ? 'active' : ''}`}
                    onClick={() => togglePanel('upload')}
                >
                    Upload Panel
                </button>
                <button 
                    className={`jotai-button ${activePanel === 'workspace' ? 'active' : ''}`}
                    onClick={() => togglePanel('workspace')}
                >
                    Workspace Picker
                </button>
            </div>
        </div>
    );
}; 