import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { icons, IconName } from '../assets/icons';
import './IconPanel.css';

interface IconPanelProps {
    onSelect: (iconName: IconName) => void;
    recentIcons: Array<{
        name: string;
        count: number;
    }>;
}

export const IconPanel: React.FC<IconPanelProps> = ({ onSelect, recentIcons }) => {
    const [searchText, setSearchText] = useState('');

    const allIcons = Object.entries(icons).map(([name, Icon]) => ({
        name: name as IconName,
        icon: <Icon className="panel-icon" aria-hidden="true" />
    }));

    const sortedRecentIcons = [...recentIcons]
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    const handleIconSelect = (iconName: IconName) => {
        onSelect(iconName);
    };

    const filteredIcons = allIcons.filter(icon => 
        icon.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const hasSearchResults = filteredIcons.length > 0;

    return (
        <AnimatePresence>
            <motion.div 
                className={`icon-panel bg-white rounded-lg ${!hasSearchResults ? 'no-result' : ''}`}
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ 
                    duration: 0.15,
                    ease: [0.4, 0, 0.2, 1]
                }}
            >
                <h2 className="panel-title">Icons</h2>
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Filter..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                {!hasSearchResults ? (
                    <div className="panel-section">
                        <h3 className="section-title">No result</h3>
                    </div>
                ) : (
                    <>
                        {sortedRecentIcons.length > 0 && !searchText && (
                            <div className="panel-section">
                                <h3 className="section-title">Recent</h3>
                                <div className="icon-grid">
                                    {sortedRecentIcons.map(recent => {
                                        const iconData = allIcons.find(i => i.name === recent.name);
                                        return iconData && (
                                            <motion.button
                                                key={recent.name}
                                                className="icon-item"
                                                onClick={() => handleIconSelect(recent.name as IconName)}
                                            >
                                                {iconData.icon}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        <div className="panel-section">
                            <h3 className="section-title">Icons</h3>
                            <div className="icon-grid">
                                {filteredIcons.map(({ name, icon }) => (
                                    <motion.button
                                        key={name}
                                        className="icon-item"
                                        onClick={() => handleIconSelect(name)}
                                    >
                                        {icon}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </motion.div>
        </AnimatePresence>
    );
}; 