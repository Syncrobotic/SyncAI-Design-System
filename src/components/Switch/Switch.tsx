import { Switch as UiSwitch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export type SwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  /** Used for aria-label; if the outer scope already has a <label>, you can omit it. */
  ariaLabel?: string;
};

export function Switch({ checked, onCheckedChange, disabled, className, ariaLabel }: SwitchProps) {
  return (
    <UiSwitch
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(className)}
      data-sds-component="Switch"
    />
  );
}

