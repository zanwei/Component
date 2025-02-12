export interface TabItem {
  id: string;
  title: string;
}

export interface DragItem {
  id: string;
  index: number;
}

export interface TabProps {
  tab: TabItem;
  index: number;
  isActive: boolean;
  moveTab: (dragIndex: number, hoverIndex: number) => void;
  onClose: (id: string, e: React.MouseEvent) => void;
  onSelect: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
} 