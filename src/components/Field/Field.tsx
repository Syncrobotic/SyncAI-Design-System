import type { ReactElement, ReactNode } from 'react';
import { cloneElement, isValidElement, useId } from 'react';
import './Field.css';

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
  const wrapperClass = ['sds-field', className].filter(Boolean).join(' ');

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
    <div className={wrapperClass} data-sds-component="Field">
      <label className="sds-field__label" htmlFor={id}>
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </label>
      <div className="sds-field__control">{enhancedChildren}</div>
      {description != null ? (
        <div className="sds-field__description" id={descriptionId}>
          {description}
        </div>
      ) : null}
      {error != null ? (
        <div className="sds-field__error" id={errorId}>
          {error}
        </div>
      ) : null}
    </div>
  );
}

