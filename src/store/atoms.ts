import { atom } from 'jotai';

// 定义面板类型
export type PanelType = 
  | 'dropdown' 
  | 'icon' 
  | 'multi-tab'
  | 'upload'
  | 'workspace'
  | null;

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
    (get, set, panel: PanelType) => {
        const currentPanel = get(activePanelAtom);
        set(activePanelAtom, panel === currentPanel ? null : panel);
    }
); 