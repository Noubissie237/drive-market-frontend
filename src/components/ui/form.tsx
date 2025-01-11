import * as React from "react";
import { Path, FormProvider, UseFormReturn, Controller, useFormContext, FieldValues, Control } from "react-hook-form";
import { cn } from "../../lib/utils";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    form: UseFormReturn<any>;
    children: React.ReactNode;
    className?: string;
}

const Form = ({ form, children, className }: FormProps) => {
    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit((data) => console.log(data))}
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
    render: ({ field }: { field: any }) => React.ReactNode;
}

const FormField = <T extends FieldValues>({ name, control, render }: FormFieldProps<T>) => {
    const { control: contextControl } = useFormContext<T>();

    return (
        <Controller
            name={name}
            control={control || contextControl}
            render={({ field }) => (
                <div className="space-y-2">
                    {render({ field })}
                </div>
            )}
        />
    );
};



const FormItem = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <div className={cn("space-y-1", className)}>{children}</div>;
};

const FormLabel = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <label className={cn("text-sm font-medium leading-none", className)}>
            {children}
        </label>
    );
};

const FormControl = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <div className={cn("relative", className)}>{children}</div>;
};

export { Form, FormField, FormItem, FormLabel, FormControl };