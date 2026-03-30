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

/** Figma `Type=Desktop` (9:8006) and `Type=Mobile` (9:7999). */
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
  return (
    <AlertDialogRoot open={open} onOpenChange={onOpenChange}>
      {trigger ? <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger> : null}
      <AlertDialogContent
        className={cn(
          layout === 'mobile' ? 'max-w-[320px]' : 'max-w-[480px]',
          className,
        )}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description != null && description !== '' && description !== false ? (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter
          className={cn(
            layout === 'mobile'
              ? 'flex-col'
              : 'flex-row justify-end',
          )}
        >
          {layout === 'desktop' ? (
            <>
              <AlertDialogCancel
                onClick={secondaryAction.onClick}
                disabled={secondaryAction.disabled}
              >
                {secondaryAction.label}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={primaryAction.onClick}
                disabled={primaryAction.disabled}
              >
                {primaryAction.label}
              </AlertDialogAction>
            </>
          ) : (
            <>
              <AlertDialogAction
                onClick={primaryAction.onClick}
                disabled={primaryAction.disabled}
              >
                {primaryAction.label}
              </AlertDialogAction>
              <AlertDialogCancel
                onClick={secondaryAction.onClick}
                disabled={secondaryAction.disabled}
              >
                {secondaryAction.label}
              </AlertDialogCancel>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
}
