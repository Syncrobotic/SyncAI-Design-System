import './Progress.css';

export type ProgressProps = {
  /** 0 - 100 */
  value: number;
  className?: string;
  /** px or css size; Figma panel width is 342px */
  width?: number | string;
};

export function Progress({ value, className, width }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const percent = `${clamped}%`;

  return (
    <div
      className={['sds-progress', className].filter(Boolean).join(' ')}
      data-sds-component="Progress"
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      style={width != null ? { width } : undefined}
    >
      <div className="sds-progress__fill" style={{ width: percent }} />
    </div>
  );
}

