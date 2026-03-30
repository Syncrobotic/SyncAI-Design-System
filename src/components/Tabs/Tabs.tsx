import type { ReactNode } from 'react';
import {
  Tabs as UiTabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Icon } from '../Icon';
import type { OrbieIconName } from '../../icons/orbieIconMap';
import { cn } from '@/lib/utils';

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
    <UiTabs
      value={value}
      onValueChange={onValueChange}
      className={cn(className)}
      data-sds-component="Tabs"
    >
      <TabsList aria-label={ariaLabel}>
        {items.map((item) => (
          <TabsTrigger
            key={item.id}
            value={item.id}
            disabled={item.disabled}
          >
            {item.icon ? (
              <span className="inline-flex">
                <Icon name={item.icon} size={14} />
              </span>
            ) : null}
            {item.label != null ? item.label : null}
            {item.counter != null ? (
              <span className="ml-1 inline-flex min-w-4 items-center justify-center rounded-[10px] bg-background/20 px-1 text-[11px] font-bold leading-4">
                {item.counter}
              </span>
            ) : null}
          </TabsTrigger>
        ))}
      </TabsList>
    </UiTabs>
  );
}

