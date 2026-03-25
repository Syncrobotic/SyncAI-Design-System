import './Switch.css';

export type SwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  /** 用於 aria-label；若你外層有 <label>，可不填 */
  ariaLabel?: string;
};

export function Switch({ checked, onCheckedChange, disabled, className, ariaLabel }: SwitchProps) {
  const rootClass = ['sds-switch', checked && 'sds-switch--checked', className].filter(Boolean).join(' ');

  return (
    <span className={rootClass} data-sds-component="Switch">
      <input
        className="sds-switch__input"
        type="checkbox"
        checked={checked}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(e) => onCheckedChange(e.target.checked)}
      />
      <span className="sds-switch__track" aria-hidden />
      <span className="sds-switch__thumb" aria-hidden />
    </span>
  );
}

