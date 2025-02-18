import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import {
    EyeIcon,
    PlusIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    LockClosedIcon,
    DocumentDuplicateIcon,
    TrashIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';
import './Dropdown.css';
import { IconPanel } from '../IconPanel';
import { IconName, icons } from '../../assets/icons';

interface DropdownProps {
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
    icon?: "user" | "edit";
}

export const Dropdown: React.FC<DropdownProps> = ({
    value,
    onChange,
}) => {
    const [selectedIcon, setSelectedIcon] = useState<IconName | null>('category');
    const [showIconPanel, setShowIconPanel] = useState(false);
    const [recentIcons, setRecentIcons] = useState<Array<{ name: string; count: number }>>([]);
    const [iconButtonRect, setIconButtonRect] = useState<DOMRect | null>(null);
    const [typeValue, setTypeValue] = useState('Last edited by');
    
    // 添加 refs
    const iconButtonRef = useRef<HTMLButtonElement>(null);
    const iconPanelRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 处理点击外部关闭
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showIconPanel &&
                iconButtonRef.current &&
                iconPanelRef.current &&
                !iconButtonRef.current.contains(event.target as Node) &&
                !iconPanelRef.current.contains(event.target as Node)) {
                setShowIconPanel(false);
            }
            if (dropdownRef.current && 
                !dropdownRef.current.contains(event.target as Node)) {
                setShowIconPanel(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showIconPanel]);

    const handleIconSelect = (iconName: IconName) => {
        setSelectedIcon(iconName);
        setShowIconPanel(false);
        
        // 更新最近使用的图标
        setRecentIcons(prev => {
            const existing = prev.find(i => i.name === iconName);
            if (existing) {
                return prev.map(i => 
                    i.name === iconName 
                        ? { ...i, count: i.count + 1 }
                        : i
                );
            }
            return [...prev, { name: iconName, count: 1 }];
        });
    };

    const handleIconButtonClick = () => {
        if (iconButtonRef.current) {
            const rect = iconButtonRef.current.getBoundingClientRect();
            setIconButtonRect(rect);
            setShowIconPanel(!showIconPanel);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setTypeValue(value);
        }
    };

    const SelectedIcon = selectedIcon ? icons[selectedIcon] : null;

    const optionGroups = [
        [
            { icon: <EyeIcon className="icon-small" />, label: "Hide in view" }
        ],
        [
            { icon: <PlusIcon className="icon-small" />, label: "Insert left column" },
            { icon: <PlusIcon className="icon-small" />, label: "Insert right column" },
            { icon: <ArrowLeftIcon className="icon-small" />, label: "Move left" },
            { icon: <ArrowRightIcon className="icon-small" />, label: "Move right" }
        ],
        [
            { icon: <LockClosedIcon className="icon-small" />, label: "Freeze up to column" }
        ],
        [
            { icon: <DocumentDuplicateIcon className="icon-small" />, label: "Duplicate" },
            { icon: <TrashIcon className="icon-small" />, label: "Delete column" }
        ]
    ];

    return (
        <div className="center-container">
            <div className="dropdown-container" ref={dropdownRef}>
                <div className="dropdown-menu">
                    <div className="dropdown-input-section">
                        <button 
                            ref={iconButtonRef}
                            className="icon-button" 
                            onClick={handleIconButtonClick}
                            data-active={showIconPanel}
                        >
                            {SelectedIcon ? (
                                <SelectedIcon className="selected-icon" />
                            ) : (
                                <div className="selected-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                </div>
                            )}
                        </button>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Last edited by"
                            className="dropdown-input"
                        />
                    </div>
                    <div className="dropdown-type-section">
                        <span className="type-label">Type</span>
                        <span className="type-value">{typeValue}</span>
                        <span className="type-arrow">
                            <ChevronRightIcon className="icon-small" />
                        </span>
                    </div>
                    {optionGroups.map((group, groupIndex) => (
                        <div key={groupIndex} className="dropdown-group">
                            {group.map((option, index) => (
                                <div 
                                    key={index} 
                                    className={`dropdown-item ${option.label === "Delete column" ? "delete-item" : ""}`}
                                >
                                    <span className="item-icon">{option.icon}</span>
                                    <span className="item-label">{option.label}</span>
                                </div>
                            ))}
                            {groupIndex < optionGroups.length - 1 && <div className="dropdown-divider" />}
                        </div>
                    ))}
                </div>
                {showIconPanel && (
                    <IconPanel 
                        onSelect={handleIconSelect}
                        recentIcons={[]}
                    />
                )}
            </div>
        </div>
    );
}; 