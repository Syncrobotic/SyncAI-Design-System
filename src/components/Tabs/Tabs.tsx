import type { ReactNode } from 'react';
import { Icon } from '../Icon';
import type { OrbieIconName } from '../../icons/orbieIconMap';
import './Tabs.css';

export type TabsItem = {
  id: string;
  label?: ReactNode;
  icon?: OrbieIconName;
  disabled?: boolean;
  /** Figma `.Tabs Counter` */
  counter?: number;
};

export type TabsProps = {
  items: TabsItem[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  ariaLabel?: string;
};

export function Tabs({ items, value, onValueChange, className, ariaLabel = 'Tabs' }: TabsProps) {
  return (
    <div role="tablist" aria-label={ariaLabel} className={['sds-tabs', className].filter(Boolean).join(' ')} data-sds-component="Tabs">
      {items.map((item) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={item.disabled}
            className={[
              'sds-tabs__tab',
              active && 'sds-tabs__tab--active',
              item.disabled && 'sds-tabs__tab--disabled',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => {
              if (!item.disabled) onValueChange(item.id);
            }}
          >
            {item.icon ? (
              <span className="sds-tabs__icon">
                <Icon name={item.icon} size={14} />
              </span>
            ) : null}
            {item.label != null ? item.label : null}
            {item.counter != null ? <span className="sds-tabs__counter">{item.counter}</span> : null}
          </button>
        );
      })}
    </div>
  );
}

