import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface InlineErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  id?: string;
}

export const InlineError: React.FC<InlineErrorProps> = ({
  message,
  id,
  className,
  ...props
}) => {
  if (!message) return null;

  return (
    <div
      id={id}
      role="alert"
      aria-live="polite"
      className={cn('flex items-center gap-1.5 text-xs text-rose-600 font-medium mt-1.5', className)}
      {...props}
    >
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
};
