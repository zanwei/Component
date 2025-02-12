import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { icons, IconName, SearchIcon } from '../assets/icons';
import './IconPanelB.css';

interface IconPanelBProps {
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

export const IconPanelB: React.FC<IconPanelBProps> = ({ onSelect, recentIcons }) => {
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
            <div className="icon-wrapper-b" style={{ color: selectedColor }}>
                <Icon 
                    className="panel-icon-b" 
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
        <div 
            className={`icon-panel-b bg-white rounded-lg ${!hasSearchResults ? 'no-result' : ''}`}
        >
            <div className="panel-header-b">
                <h2 className="panel-title-b">Icons</h2>
                <div className="search-container-b">
                    <div className="search-input-wrapper-b">
                        <SearchIcon className="search-icon-b" />
                        <input
                            type="text"
                            className="search-input-b"
                            placeholder="Filter..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                    <button 
                        ref={colorButtonRef}
                        className="color-picker-button-b"
                        onClick={handleColorButtonClick}
                    >
                        <div 
                            className="color-dot-b"
                            style={{ backgroundColor: selectedColor }}
                        />
                    </button>
                </div>
            </div>

            <div className="panel-content-b">
                {!hasSearchResults ? (
                    <div className="panel-section-b">
                        <h3 className="section-title-b">No result</h3>
                    </div>
                ) : (
                    <>
                        {sortedRecentIcons.length > 0 && !searchText && (
                            <div className="panel-section-b">
                                <h3 className="section-title-b">Recent</h3>
                                <div className="icon-grid-b">
                                    {sortedRecentIcons.map(recent => {
                                        const iconData = allIcons.find(i => i.name === recent.name);
                                        return iconData && (
                                            <motion.button
                                                key={recent.name}
                                                className="icon-item-b"
                                                onClick={() => handleIconSelect(recent.name as IconName)}
                                            >
                                                {iconData.icon}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        <div className="panel-section-b">
                            <h3 className="section-title-b">Icons</h3>
                            <div className="icon-grid-b">
                                {filteredIcons.map(({ name, icon }) => (
                                    <motion.button
                                        key={name}
                                        className={`icon-item-b ${selectedIconName === name ? 'selected' : ''}`}
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

            {showColorPicker && (
                <div 
                    ref={colorPickerRef}
                    className="color-picker-panel-b"
                    style={{
                        top: `${colorPickerPosition.top}px`,
                        left: `${colorPickerPosition.left}px`
                    }}
                >
                    {colorOptions.map((color) => (
                        <button
                            key={color}
                            className="color-option-b"
                            onClick={() => {
                                setSelectedColor(color);
                                setShowColorPicker(false);
                            }}
                        >
                            <div 
                                className="color-dot-b"
                                style={{ backgroundColor: color }}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}; 