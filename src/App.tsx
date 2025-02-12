import { useAtom } from 'jotai';
import { Dropdown } from './components/Dropdown';
import { IconPanelB } from './components/IconPanelB';
import { JotaiPanel } from './components/JotaiPanel';
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
                            <Dropdown 
                                value="" 
                                onChange={() => {}}
                            />
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
                </div>
            </div>
        </div>
    );
}

export default App; 