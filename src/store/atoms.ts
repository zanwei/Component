import { atom } from 'jotai';

// 定义面板类型
export type PanelType = 'dropdown' | 'icon' | 'multi-tab' | null;

// 创建管理当前打开面板的 atom
export const activePanelAtom = atom<PanelType>('dropdown');

// 创建面板位置的 atom
export const panelPositionAtom = atom({
    x: 0,
    y: 0,
});

// 创建一个派生的 atom 来处理面板的显示/隐藏逻辑
export const togglePanelAtom = atom(
    (get) => get(activePanelAtom),
    (_, set, panel: PanelType) => {
        set(activePanelAtom, panel === get(activePanelAtom) ? null : panel);
    }
); 