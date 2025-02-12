import './JotaiPanel.css';

interface JotaiPanelProps {
    activePanel: 'dropdown' | 'icon';
    onPanelChange: (panel: 'dropdown' | 'icon') => void;
}

export const JotaiPanel = ({ activePanel, onPanelChange }: JotaiPanelProps) => {
    return (
        <div className="jotai-panel">
            <div className="jotai-header">Jotai Panel</div>
            <div className="jotai-content">
                <button 
                    className={`jotai-button ${activePanel === 'dropdown' ? 'active' : ''}`}
                    onClick={() => onPanelChange('dropdown')}
                >
                    Dropdown Menu
                </button>
                <button 
                    className={`jotai-button ${activePanel === 'icon' ? 'active' : ''}`}
                    onClick={() => onPanelChange('icon')}
                >
                    Emoji Panel
                </button>
            </div>
        </div>
    );
}; 