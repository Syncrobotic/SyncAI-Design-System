import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';
import './Input.css';

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

  const wrapperClass = [
    'sds-input',
    isError && 'sds-input--error',
    disabled && 'sds-input--disabled',
    as === 'textarea' && 'sds-input--textarea',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClass} data-sds-component="Input">
      {startAdornment ? (
        <span className="sds-input__adornment" aria-hidden>
          {startAdornment}
        </span>
      ) : null}
      {as === 'textarea' ? (
        <textarea
          className="sds-input__native sds-input__native--textarea"
          disabled={disabled}
          aria-invalid={ariaInvalid}
          {...(rest as NativeTextareaProps)}
        />
      ) : (
        <input
          className="sds-input__native"
          disabled={disabled}
          aria-invalid={ariaInvalid}
          {...(rest as NativeInputProps)}
        />
      )}
      {endAdornment ? (
        <span className="sds-input__adornment" aria-hidden>
          {endAdornment}
        </span>
      ) : null}
    </div>
  );
}

