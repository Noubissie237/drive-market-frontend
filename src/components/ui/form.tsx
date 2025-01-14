import * as React from "react";
import { Path, FormProvider, UseFormReturn, Controller, useFormContext, FieldValues, Control } from "react-hook-form";
import { cn } from "../../lib/utils";
import { get } from "lodash";

const FormItemContext = React.createContext<{ name: string }>({ name: "" });

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    form: UseFormReturn<any>;
    children: React.ReactNode;
    className?: string;
    onSubmit?: (data: any) => void;
}

const Form = ({ form, children, className, onSubmit }: FormProps) => {
    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit || ((data) => console.log(data)))}
                className={cn("space-y-4", className)}
            >
                {children}
            </form>
        </FormProvider>
    );
};

interface FormFieldProps<T extends FieldValues = any> {
    name: Path<T>;
    control?: Control<T>;
    render: ({ field }: { field: any }) => React.ReactElement;  // Changé de ReactNode à ReactElement
}

const FormField = <T extends FieldValues>({ name, control, render }: FormFieldProps<T>) => {
    const { control: contextControl } = useFormContext<T>();

    return (
        <Controller
            name={name}
            control={control || contextControl}
            render={({ field, fieldState }) => render({ field })}  // Vous pouvez aussi ajouter fieldState si nécessaire
        />
    );
};

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
    ({ className, children, name, ...props }, ref) => {
        return (
            <FormItemContext.Provider value={{ name }}>
                <div ref={ref} className={cn("space-y-1", className)} {...props}>
                    {children}
                </div>
            </FormItemContext.Provider>
        );
    }
);
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
    HTMLLabelElement,
    React.HTMLAttributes<HTMLLabelElement>
>(({ className, children, ...props }, ref) => {
    return (
        <label
            ref={ref}
            className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
            {...props}
        >
            {children}
        </label>
    );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    return (
        <div ref={ref} className={cn("relative", className)} {...props}>
            {children}
        </div>
    );
});
FormControl.displayName = "FormControl";

const FormMessage = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    const { formState: { errors } } = useFormContext();
    const { name } = React.useContext(FormItemContext);
    const error = get(errors, name);

    if (!error) {
        return null;
    }

    return (
        <p
            ref={ref}
            className={cn("text-sm font-medium text-red-500", className)}
            {...props}
        >
            {error.message?.toString()}
        </p>
    );
});
FormMessage.displayName = "FormMessage";

export {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormItemContext,
    type FormItemProps,
    type FormFieldProps,
    type FormProps
};