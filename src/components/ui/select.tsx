import * as React from "react";
import { cn } from "../../lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    onValueChange?: (value: string) => void;
    defaultValue?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, onValueChange, defaultValue, children, ...props }, ref) => {
        return (
            <select
                ref={ref}
                className={cn(
                    "flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                onChange={(e) => onValueChange?.(e.target.value)}
                defaultValue={defaultValue}
                {...props}
            >
                {children}
            </select>
        );
    }
);
Select.displayName = "Select";

const SelectTrigger = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
        )}
        {...props}
    />
));
SelectTrigger.displayName = "SelectTrigger";

interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
    placeholder?: string;
}

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
    ({ className, placeholder, ...props }, ref) => {
        return (
            <span
                ref={ref}
                className={cn("text-sm font-medium", className)}
                {...props}
            >
                {placeholder}
            </span>
        );
    }
);
SelectValue.displayName = "SelectValue";

const SelectContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "absolute z-50 mt-1 w-full rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
            className
        )}
        {...props}
    />
));
SelectContent.displayName = "SelectContent";

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
  }
  
  const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
    ({ className, value, children, ...props }, ref) => {
      return (
        <div
          ref={ref}
          className={cn(
            "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
          )}
          {...props}
        >
          {children}
        </div>
      );
    }
  );
  SelectItem.displayName = "SelectItem";

export {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
};