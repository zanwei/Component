import React, { useState, useRef } from 'react';
import { Cloud, Monitor, Server, Download, Plus } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './WorkspacePicker.css';

// 生成低饱和度的 HCL 颜色
const generatePastelColor = () => {
  const h = Math.random() * 360; // 随机色相
  const c = 15 + Math.random() * 20; // 低饱和度 (15-35)
  const l = 80 + Math.random() * 10; // 高亮度 (80-90)
  return `hsl(${h}deg ${c}% ${l}%)`;
};

interface WorkspaceItem {
  id: string;
  title: string;
  color: string;
  type: 'cloud' | 'local' | 'server';
}

interface WorkspacePickerProps {
  email?: string;
}

// 静态服务器工作区
const STATIC_SERVERS: WorkspaceItem[] = [
  {
    id: 'static-1',
    title: 'Demo Workspace',
    type: 'server',
    color: generatePastelColor()
  },
  {
    id: 'static-2',
    title: 'Demo Workspace',
    type: 'server',
    color: generatePastelColor()
  }
];

const STATIC_CLOUD_WORKSPACES: WorkspaceItem[] = [
  {
    id: 'cloud-1',
    title: 'Demo Workspace',
    type: 'cloud',
    color: generatePastelColor()
  },
  {
    id: 'cloud-2',
    title: 'Demo Workspace',
    type: 'cloud',
    color: generatePastelColor()
  },
  {
    id: 'cloud-3',
    title: 'Demo Workspace',
    type: 'cloud',
    color: generatePastelColor()
  }
];

const STATIC_LOCAL_WORKSPACES: WorkspaceItem[] = [
  {
    id: 'local-1',
    title: 'Demo Workspace',
    type: 'local',
    color: generatePastelColor()
  },
  {
    id: 'local-2',
    title: 'Demo Workspace',
    type: 'local',
    color: generatePastelColor()
  },
  {
    id: 'local-3',
    title: 'Demo Workspace',
    type: 'local',
    color: generatePastelColor()
  }
];

interface DragItem {
  id: string;
  index: number;
  type: string;
  sectionType: 'cloud' | 'local' | 'server';
}

const WorkspaceItem = React.memo(({ 
  workspace, 
  index, 
  moveItem,
  sectionType 
}: { 
  workspace: WorkspaceItem; 
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number, sectionType: string) => void;
  sectionType: 'cloud' | 'local' | 'server';
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: `WORKSPACE_${sectionType.toUpperCase()}`,
    item: { id: workspace.id, index, type: sectionType },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: `WORKSPACE_${sectionType.toUpperCase()}`,
    hover: (item: DragItem, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveItem(dragIndex, hoverIndex, sectionType);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div 
      ref={ref} 
      className={`workspace-item ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="workspace-icon" style={{ backgroundColor: workspace.color }} />
      <span className="workspace-title">{workspace.title}</span>
      <div className="workspace-actions">
        <button className="workspace-action-btn">
          <Monitor size={16} />
        </button>
        <button className="workspace-action-btn">
          <Server size={16} />
        </button>
      </div>
    </div>
  );
});

export const WorkspacePicker: React.FC<WorkspacePickerProps> = ({
  email = 'example@company.com',
}) => {
  const [cloudWorkspaces, setCloudWorkspaces] = useState(STATIC_CLOUD_WORKSPACES);
  const [localWorkspaces, setLocalWorkspaces] = useState(STATIC_LOCAL_WORKSPACES);
  const [serverWorkspaces, setServerWorkspaces] = useState(STATIC_SERVERS);

  const moveItem = (dragIndex: number, hoverIndex: number, sectionType: string) => {
    const updateWorkspaces = (setter: React.Dispatch<React.SetStateAction<WorkspaceItem[]>>) => {
      setter(prev => {
        const newItems = [...prev];
        const [draggedItem] = newItems.splice(dragIndex, 1);
        newItems.splice(hoverIndex, 0, draggedItem);
        return newItems;
      });
    };

    switch (sectionType) {
      case 'cloud':
        updateWorkspaces(setCloudWorkspaces);
        break;
      case 'local':
        updateWorkspaces(setLocalWorkspaces);
        break;
      case 'server':
        updateWorkspaces(setServerWorkspaces);
        break;
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="workspace-picker">
        {/* AFFiNE Cloud Section */}
        <div className="workspace-section cloud-section">
          <div className="workspace-header">
            <Cloud size={16} />
            <span>AFFiNE Cloud</span>
          </div>
          <div className="workspace-email">{email}</div>
          <div className="workspace-list">
            {cloudWorkspaces.map((workspace, index) => (
              <WorkspaceItem
                key={workspace.id}
                workspace={workspace}
                index={index}
                moveItem={moveItem}
                sectionType="cloud"
              />
            ))}
          </div>
        </div>

        <div className="workspace-divider" />

        {/* Local Storage Section */}
        <div className="workspace-section local-section">
          <div className="workspace-header">
            <Monitor size={16} />
            <span>Local Storage</span>
          </div>
          <div className="workspace-list">
            {localWorkspaces.map((workspace, index) => (
              <WorkspaceItem
                key={workspace.id}
                workspace={workspace}
                index={index}
                moveItem={moveItem}
                sectionType="local"
              />
            ))}
          </div>
        </div>

        <div className="workspace-divider" />

        {/* Server Section */}
        <div className="workspace-section server-section">
          <div className="workspace-header">
            <Server size={16} />
            <span>192.168.2.120:3000</span>
          </div>
          <div className="workspace-email">{email}</div>
          <div className="workspace-list">
            {serverWorkspaces.map((workspace, index) => (
              <WorkspaceItem
                key={workspace.id}
                workspace={workspace}
                index={index}
                moveItem={moveItem}
                sectionType="server"
              />
            ))}
            <button className="workspace-action-item">
              <div className="workspace-icon-wrapper">
                <Plus size={18} />
              </div>
              <span>Add Server</span>
            </button>
          </div>
        </div>

        <div className="workspace-divider" />

        {/* Bottom Actions */}
        <div className="workspace-actions-bottom">
          <button className="workspace-action-item">
            <div className="workspace-icon-wrapper">
              <Download size={18} />
            </div>
            <span>Import Workspace</span>
          </button>
          <button className="workspace-action-item">
            <div className="workspace-icon-wrapper">
              <Plus size={18} />
            </div>
            <span>Create Workspace</span>
          </button>
        </div>
      </div>
    </DndProvider>
  );
}; 