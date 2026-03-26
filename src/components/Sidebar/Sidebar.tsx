import type { ReactNode } from 'react';
import { Icon } from '../Icon';
import type { OrbieIconName } from '../../icons/orbieIconMap';
import './Sidebar.css';

export type SidebarItem = {
  id: string;
  label: string;
  icon?: OrbieIconName;
  active?: boolean;
  /** indent for 2nd level */
  level?: 1 | 2;
  badge?: ReactNode;
  disabled?: boolean;
};

export type SidebarGroup = {
  id: string;
  label: string;
  items: SidebarItem[];
};

export type SidebarProps = {
  collapsed?: boolean;
  groups: SidebarGroup[];
  /** used as aria-label for nav */
  ariaLabel?: string;
  className?: string;
  onItemClick?: (item: SidebarItem) => void;
};

export function Sidebar({ collapsed = false, groups, ariaLabel = 'Sidebar', className, onItemClick }: SidebarProps) {
  const rootClass = ['sds-sidebar', collapsed ? 'sds-sidebar--collapsed' : 'sds-sidebar--expanded', className]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={rootClass} aria-label={ariaLabel} data-sds-component="Sidebar">
      {groups.map((g) => (
        <div key={g.id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {collapsed ? null : <div className="sds-sidebar__groupLabel">{g.label}</div>}
          <div className="sds-sidebar__items">
            {g.items.map((item) => (
              <button
                key={item.id}
                type="button"
                className={[
                  'sds-sidebar-item',
                  collapsed ? 'sds-sidebar-item--collapsed' : 'sds-sidebar-item--expanded',
                  item.active ? 'sds-sidebar-item--active' : 'sds-sidebar-item--default',
                ]
                  .filter(Boolean)
                  .join(' ')}
                disabled={item.disabled}
                onClick={() => onItemClick?.(item)}
              >
                {item.icon ? (
                  <Icon name={item.icon} size={20} className={collapsed ? '' : ''} />
                ) : (
                  <span style={{ width: 20, height: 20, display: 'inline-block' }} aria-hidden />
                )}
                {!collapsed ? <span className="sds-sidebar-item__label">{item.label}</span> : null}
                {item.badge && !collapsed ? item.badge : null}
              </button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

