import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { icons, IconName, SearchIcon } from '../../assets/icons';
import './IconPanel.css';

interface IconPanelProps {
    onSelect: (iconName: IconName) => void;
    recentIcons: Array<{
        name: string;
        count: number;
    }>;
}

// 定义颜色选项
const colorOptions = [
    '#C83030', '#FFAE63', '#FDE047', '#22BF07', '#448E86',
    '#53B2EF', '#7C3AED', '#CC4187', '#CDCDCD'
];

export const IconPanel: React.FC<IconPanelProps> = ({ onSelect, recentIcons }) => {
    const [searchText, setSearchText] = useState('');
    const [selectedColor, setSelectedColor] = useState('#53B2EF');  // 默认蓝色
    const [showColorPicker, setShowColorPicker] = useState(false);
    const colorPickerRef = useRef<HTMLDivElement>(null);
    const colorButtonRef = useRef<HTMLButtonElement>(null);
    const [colorPickerPosition, setColorPickerPosition] = useState({ top: 0, left: 0 });
    const [selectedIconName, setSelectedIconName] = useState<IconName | null>(null);

    // 处理点击外部关闭颜色选择器
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showColorPicker &&
                colorPickerRef.current &&
                colorButtonRef.current &&
                !colorPickerRef.current.contains(event.target as Node) &&
                !colorButtonRef.current.contains(event.target as Node)) {
                setShowColorPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showColorPicker]);

    const allIcons = Object.entries(icons).map(([name, Icon]) => ({
        name: name as IconName,
        icon: (
            <div className="icon-wrapper" style={{ color: selectedColor }}>
                <Icon 
                    className="panel-icon" 
                    aria-hidden="true"
                    fill="currentColor"
                    stroke="currentColor"
                />
            </div>
        )
    }));

    const sortedRecentIcons = [...recentIcons]
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    const handleIconSelect = (iconName: IconName) => {
        setSelectedIconName(iconName);
        onSelect(iconName);
    };

    const filteredIcons = allIcons.filter(icon => 
        icon.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const hasSearchResults = filteredIcons.length > 0;

    // 计算颜色选择器面板位置
    const updateColorPickerPosition = () => {
        if (colorButtonRef.current) {
            const buttonRect = colorButtonRef.current.getBoundingClientRect();
            const panelWidth = 246; // 颜色选择器面板宽度
            const buttonWidth = buttonRect.width;
            
            setColorPickerPosition({
                top: buttonRect.bottom + 4, // 按钮底部 + 4px 间距
                left: buttonRect.left - (panelWidth - buttonWidth) / 2 // 居中对齐
            });
        }
    };

    // 点击按钮时更新位置
    const handleColorButtonClick = () => {
        updateColorPickerPosition();
        setShowColorPicker(!showColorPicker);
    };

    return (
        <AnimatePresence>
            <motion.div 
                className={`icon-panel bg-white rounded-lg ${!hasSearchResults ? 'no-result' : ''}`}
                initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -20, scaleY: 1 }}
                transition={{ 
                    duration: 0,
                    ease: [0.42, 0, 0.58, 1],
                    opacity: { duration: 0.1 },
                    y: { duration: 0.1 }
                }}
            >
                {/* 固定头部区域 */}
                <div className="panel-header">
                    <h2 className="panel-title">Icons</h2>
                    <div className="search-container">
                        <div className="search-input-wrapper">
                            <SearchIcon className="search-icon" />
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Filter..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                        <button 
                            ref={colorButtonRef}
                            className="color-picker-button"
                            onClick={handleColorButtonClick}
                        >
                            <div 
                                className="color-dot"
                                style={{ backgroundColor: selectedColor }}
                            />
                        </button>
                    </div>
                </div>

                {/* 可滚动的内容区域 */}
                <div className="panel-content">
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
                                            className={`icon-item ${selectedIconName === name ? 'selected' : ''}`}
                                            onClick={() => handleIconSelect(name)}
                                        >
                                            {icon}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* 颜色选择器面板保持不变 */}
                {showColorPicker && (
                    <div 
                        ref={colorPickerRef}
                        className="color-picker-panel"
                        style={{
                            top: `${colorPickerPosition.top}px`,
                            left: `${colorPickerPosition.left}px`
                        }}
                    >
                        {colorOptions.map((color) => (
                            <button
                                key={color}
                                className="color-option"
                                onClick={() => {
                                    setSelectedColor(color);
                                    setShowColorPicker(false);
                                }}
                            >
                                <div 
                                    className="color-dot"
                                    style={{ backgroundColor: color }}
                                />
                            </button>
                        ))}
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}; 