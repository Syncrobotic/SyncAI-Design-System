import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';
import { cn } from '@/lib/utils';

export type InputState = 'default' | 'error';

type CommonProps = {
  state?: InputState;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  className?: string;
};

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;
type NativeTextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>;

export type InputProps =
  | (CommonProps & { as?: 'input' } & NativeInputProps)
  | (CommonProps & { as: 'textarea' } & NativeTextareaProps);

export function Input(props: InputProps) {
  const {
    state = 'default',
    startAdornment,
    endAdornment,
    className,
    as = 'input',
    disabled,
    'aria-invalid': ariaInvalidProp,
    ...rest
  } = props as InputProps & {
    disabled?: boolean;
    'aria-invalid'?: boolean | 'true' | 'false';
  };

  const isError = state === 'error';
  const ariaInvalid = isError ? true : ariaInvalidProp;

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg border bg-transparent shadow-xs transition-colors',
        isError
          ? 'border-destructive focus-within:ring-1 focus-within:ring-[var(--sds-input-ring-error)]'
          : 'border-input focus-within:ring-1 focus-within:ring-ring',
        disabled && 'cursor-not-allowed opacity-50',
        as === 'textarea' && 'items-start',
        className,
      )}
      data-sds-component="Input"
    >
      {startAdornment ? (
        <span className="flex shrink-0 items-center pl-3 text-muted-foreground" aria-hidden>
          {startAdornment}
        </span>
      ) : null}
      {as === 'textarea' ? (
        <textarea
          className="min-h-[60px] w-full flex-1 bg-transparent px-3 py-2 text-[14px] leading-[21px] tracking-[0.07px] placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed"
          disabled={disabled}
          aria-invalid={ariaInvalid}
          {...(rest as NativeTextareaProps)}
        />
      ) : (
        <input
          className="min-h-9 w-full flex-1 bg-transparent px-3 py-[7.5px] text-[14px] leading-[21px] tracking-[0.07px] placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed"
          disabled={disabled}
          aria-invalid={ariaInvalid}
          {...(rest as NativeInputProps)}
        />
      )}
      {endAdornment ? (
        <span className="flex shrink-0 items-center pr-3 text-muted-foreground" aria-hidden>
          {endAdornment}
        </span>
      ) : null}
    </div>
  );
}

