import type { ReactNode } from 'react';
import { useId } from 'react';
import './AlertDialog.css';

/** Figma `Type=Desktop`（9:8006）與 `Type=Mobile`（9:7999）。 */
export type AlertDialogLayout = 'desktop' | 'mobile';

export type AlertDialogAction = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

export type AlertDialogProps = {
  title: ReactNode;
  description?: ReactNode;
  layout?: AlertDialogLayout;
  secondaryAction: AlertDialogAction;
  primaryAction: AlertDialogAction;
  className?: string;
  /** 設為 true 時加上 `aria-modal`（外層需搭配遮罩與 focus trap 才算完整 modal）。 */
  modal?: boolean;
};

export function AlertDialog({
  title,
  description,
  layout = 'desktop',
  secondaryAction,
  primaryAction,
  className,
  modal = false,
}: AlertDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const rootClass = ['sds-alert-dialog', `sds-alert-dialog--${layout}`, className].filter(Boolean).join(' ');

  const secondaryBtn = (
    <button
      type="button"
      className="sds-alert-dialog__btn sds-alert-dialog__btn--secondary"
      onClick={secondaryAction.onClick}
      disabled={secondaryAction.disabled}
    >
      {secondaryAction.label}
    </button>
  );

  const primaryBtn = (
    <button
      type="button"
      className="sds-alert-dialog__btn sds-alert-dialog__btn--primary"
      onClick={primaryAction.onClick}
      disabled={primaryAction.disabled}
    >
      {primaryAction.label}
    </button>
  );

  return (
    <div
      className={rootClass}
      data-sds-component="AlertDialog"
      role="alertdialog"
      aria-modal={modal || undefined}
      aria-labelledby={titleId}
      aria-describedby={
        description != null && description !== '' && description !== false ? descriptionId : undefined
      }
    >
      <div className="sds-alert-dialog__stack">
        <h2 className="sds-alert-dialog__title" id={titleId}>
          {title}
        </h2>
        {description != null && description !== '' && description !== false ? (
          <p className="sds-alert-dialog__description" id={descriptionId}>
            {description}
          </p>
        ) : null}
        <div className="sds-alert-dialog__actions">
          {layout === 'desktop' ? (
            <>
              {secondaryBtn}
              {primaryBtn}
            </>
          ) : (
            <>
              {primaryBtn}
              {secondaryBtn}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
