import type { ReactNode } from 'react';
import {
  AlertDialog as AlertDialogRoot,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import type { ButtonVariant } from '@/components/Button';

/** Figma `Type=Desktop` (9:8006) and `Type=Mobile` (9:7999). */
export type AlertDialogLayout = 'desktop' | 'mobile';

export type AlertDialogAction = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  /**
   * Button tone/variant for the underlying Cancel/Action button.
   * - `tone` kept as an alias for backwards/UX symmetry.
   */
  variant?: ButtonVariant;
  tone?: ButtonVariant;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

export type AlertDialogProps = {
  title: ReactNode;
  description?: ReactNode;
  layout?: AlertDialogLayout;
  secondaryAction: AlertDialogAction;
  primaryAction: AlertDialogAction;
  className?: string;
  /** Controlled open state. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Trigger element — if provided, clicking it opens the dialog. */
  trigger?: ReactNode;
};

export function AlertDialog({
  title,
  description,
  layout = 'desktop',
  secondaryAction,
  primaryAction,
  className,
  open,
  onOpenChange,
  trigger,
}: AlertDialogProps) {
  const renderActionInner = (action: AlertDialogAction) => (
    <>
      {action.iconLeft ? (
        <span className="inline-flex size-[13.25px] shrink-0 items-center justify-center [&>svg]:size-[13.25px]">
          {action.iconLeft}
        </span>
      ) : null}
      <span>{action.label}</span>
      {action.iconRight ? (
        <span className="inline-flex size-[13.25px] shrink-0 items-center justify-center [&>svg]:size-[13.25px]">
          {action.iconRight}
        </span>
      ) : null}
    </>
  );

  const resolveActionVariant = (action: AlertDialogAction): ButtonVariant | undefined =>
    action.variant ?? action.tone;

  return (
    <AlertDialogRoot open={open} onOpenChange={onOpenChange}>
      {trigger ? <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger> : null}
      <AlertDialogContent
        className={cn(
          layout === 'mobile' ? 'max-w-[320px]' : 'max-w-[480px]',
          className,
        )}
      >
        <AlertDialogHeader
          className={layout === 'mobile' ? 'sm:text-center items-center' : undefined}
        >
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description != null && description !== '' && description !== false ? (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter
          className={cn(
            layout === 'mobile' ? 'flex-col sm:flex-col' : 'flex-row justify-end',
          )}
        >
          {layout === 'desktop' ? (
            <>
              <AlertDialogCancel
                variant={resolveActionVariant(secondaryAction)}
                onClick={secondaryAction.onClick}
                disabled={secondaryAction.disabled}
              >
                {renderActionInner(secondaryAction)}
              </AlertDialogCancel>
              <AlertDialogAction
                variant={resolveActionVariant(primaryAction)}
                onClick={primaryAction.onClick}
                disabled={primaryAction.disabled}
              >
                {renderActionInner(primaryAction)}
              </AlertDialogAction>
            </>
          ) : (
            <>
              <AlertDialogAction
                variant={resolveActionVariant(primaryAction)}
                onClick={primaryAction.onClick}
                disabled={primaryAction.disabled}
              >
                {renderActionInner(primaryAction)}
              </AlertDialogAction>
              <AlertDialogCancel
                variant={resolveActionVariant(secondaryAction)}
                onClick={secondaryAction.onClick}
                disabled={secondaryAction.disabled}
              >
                {renderActionInner(secondaryAction)}
              </AlertDialogCancel>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
}
