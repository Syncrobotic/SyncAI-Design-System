import type { ReactElement, ReactNode } from 'react';
import { cloneElement, isValidElement, useId } from 'react';
import { cn } from '@/lib/utils';

export type FieldProps = {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  className?: string;
  /** If not provided, will use React `useId()` to generate a stable id. */
  controlId?: string;
  children: ReactNode;
};

export function Field({
  label,
  description,
  error,
  required,
  className,
  controlId,
  children,
}: FieldProps) {
  const autoId = useId();
  const id = controlId ?? autoId;
  const descriptionId = description != null ? `${id}-description` : undefined;
  const errorId = error != null ? `${id}-error` : undefined;

  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  const enhancedChildren = isValidElement(children)
    ? cloneElement(children as ReactElement<any>, {
        id,
        'aria-describedby': describedBy,
        'aria-invalid': error != null ? true : undefined,
        ...(error != null && (children as ReactElement<any>).props?.state == null
          ? { state: 'error' }
          : null),
      })
    : children;

  return (
    <div className={cn('flex flex-col gap-1', className)} data-sds-component="Field">
      <label
        className="text-[14px] font-medium leading-[21px] tracking-[0.07px] text-foreground"
        htmlFor={id}
      >
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </label>
      <div>{enhancedChildren}</div>
      {description != null ? (
        <div className="text-sm text-muted-foreground" id={descriptionId}>
          {description}
        </div>
      ) : null}
      {error != null ? (
        <div className="text-sm text-destructive" id={errorId}>
          {error}
        </div>
      ) : null}
    </div>
  );
}

