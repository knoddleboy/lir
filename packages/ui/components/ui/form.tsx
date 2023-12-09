"use client";

import { cn } from "@lir/lib";
import { passwordHints } from "@lir/lib/error";
import type { PasswordValidStates } from "@lir/lib/validator";

import type * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
  type FieldErrors,
} from "react-hook-form";

import { Icons } from "../icons";
import { Label } from "./label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-1", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ ...props }, ref) => {
  const { formItemId } = useFormField();

  return <Label ref={ref} htmlFor={formItemId} {...props} />;
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();

  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-destructive text-sm font-medium", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

type FormHintProps = React.HTMLAttributes<HTMLUListElement> & {
  fieldName: string;
  hints?: (keyof typeof PasswordValidStates)[] | string[];
};

const FormHints = <T extends FieldValues = FieldValues>({
  fieldName,
  hints,
  className,
  ...props
}: FormHintProps) => {
  const context = useFormContext() as ReturnType<typeof useFormContext> | null;
  // Cannot use outside React Hook Form context
  if (!context) return null;

  const { formState } = context;
  // @ts-expect-error ignore
  const fieldErrors: FieldErrors<T> | undefined = formState.errors[fieldName];

  return (
    <ul className={cn("pl-[14px] pt-1 text-sm", className)} {...props}>
      {hints?.map((key: string) => {
        const dirty = formState.dirtyFields[fieldName];
        const submitted = formState.isSubmitted;
        const error = fieldErrors
          ? fieldErrors[key] || fieldErrors?.message
          : undefined;

        return (
          <li key={key} className={cn(error && submitted && "text-destructive")}>
            {dirty ? (
              error ? (
                <Icons.circle
                  fill="currentColor"
                  size={5}
                  className="mr-3 inline-block"
                />
              ) : (
                <Icons.check
                  size={12}
                  strokeWidth={3}
                  className="-ml-[3px] mr-2 inline-block"
                />
              )
            ) : (
              <Icons.circle
                fill="currentColor"
                size={5}
                className="mr-3 inline-block"
              />
            )}
            {passwordHints[key as keyof typeof passwordHints]}
          </li>
        );
      })}
    </ul>
  );
};
FormHints.displayName = "FormHints";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormHints,
  FormField,
};
