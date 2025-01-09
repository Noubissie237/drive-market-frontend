import React from 'react';
import { cn } from '../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const spinnerVariants = cva(
  'relative inline-block rounded-full animate-spin-grow',
  {
    variants: {
      variant: {
        default: [
          'border-2',
          'border-t-primary',
          'border-r-primary/30',
          'border-b-primary/30',
          'border-l-primary/30'
        ],
        secondary: [
          'border-2',
          'border-t-secondary',
          'border-r-secondary/30',
          'border-b-secondary/30',
          'border-l-secondary/30'
        ],
        destructive: [
          'border-2',
          'border-t-destructive',
          'border-r-destructive/30',
          'border-b-destructive/30',
          'border-l-destructive/30'
        ],
        muted: [
          'border-2',
          'border-t-muted-foreground',
          'border-r-muted-foreground/30',
          'border-b-muted-foreground/30',
          'border-l-muted-foreground/30'
        ],
      },
      size: {
        xs: 'h-4 w-4',
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
      },
      animation: {
        grow: 'animate-spin-grow',
        slow: 'animate-spin-slow',
        normal: 'animate-spin',
        fast: 'animate-spin-fast',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      animation: 'normal',
    },
  }
);

interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
  showLabel?: boolean;
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ 
    className, 
    variant, 
    size, 
    animation,
    label = "Chargement...",
    showLabel = false,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        className={cn('flex flex-col items-center justify-center gap-3', className)}
        {...props}
      >
        <div className={cn(spinnerVariants({ variant, size, animation }))}>
          <span className="sr-only">{label}</span>
        </div>
        {showLabel && (
          <span className="text-sm text-muted-foreground animate-pulse">
            {label}
          </span>
        )}
      </div>
    );
  }
);

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;