import type { ReactNode } from 'react';
import { Icon } from '../Icon';
import type { OrbieIconName } from '../../icons/orbieIconMap';
import { cn } from '@/lib/utils';

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
  return (
    <nav
      className={cn(
        'flex flex-col gap-4 bg-sidebar p-2',
        collapsed ? 'w-14 items-center' : 'w-56',
        className,
      )}
      aria-label={ariaLabel}
      data-sds-component="Sidebar"
    >
      {groups.map((g) => (
        <div key={g.id} className="flex flex-col gap-1.5">
          {collapsed ? null : (
            <div className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {g.label}
            </div>
          )}
          <div className="flex flex-col gap-0.5">
            {g.items.map((item) => (
              <button
                key={item.id}
                type="button"
                className={cn(
                  'inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors',
                  'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  'disabled:pointer-events-none disabled:opacity-50',
                  item.active && 'bg-sidebar-accent text-sidebar-accent-foreground',
                  !item.active && 'text-sidebar-foreground',
                  collapsed && 'justify-center px-0',
                  item.level === 2 && !collapsed && 'pl-8',
                )}
                disabled={item.disabled}
                onClick={() => onItemClick?.(item)}
              >
                {item.icon ? (
                  <Icon name={item.icon} size={20} />
                ) : (
                  <span className="inline-block size-5" aria-hidden />
                )}
                {!collapsed ? <span className="truncate">{item.label}</span> : null}
                {item.badge && !collapsed ? item.badge : null}
              </button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

