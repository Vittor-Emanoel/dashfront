import { CrossCircledIcon } from '@radix-ui/react-icons';
import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import Inpt from 'react-input-mask';
import { cn } from './lib/lib';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  mask: string;
  placeholder: string;
}

const InputMask = forwardRef(
  (
    {
      className,
      id,
      value,
      mask,
      placeholder,
      type,
      error,
      ...props
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className="w-full">
        <Inpt
          mask={mask}
          placeholder={placeholder}
          defaultValue={value}
          type={type}
          className={cn(
            'flex border w-full rounded-md h-[42px] text-sm border-input bg-background px-3 py-2  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
            error && 'border-red-500 placeholder:red-500',
          )}
          ref={ref as any}
          {...props}
        />

        {error && (
          <div className="flex gap-2 mt-2 text-red-500">
            <CrossCircledIcon />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    );
  },
);

InputMask.displayName = 'Input';

export { InputMask };
