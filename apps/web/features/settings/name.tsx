"use client";

import { cn } from "@lir/lib";
import {
  updateUserSchema,
  type UserProps,
  type UpdateUserInput,
} from "@lir/lib/schema";
import {
  Input,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@lir/ui";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { sessionModel } from "~/entities/session";

import { useUpdateUser } from "./api";

export const NameSetting = ({ user }: { user: UserProps }) => {
  const { mutateAsync: updateUser } = useUpdateUser();

  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: { name: user.name },
    mode: "onChange",
  });
  // Do not use `isDirty` directly here because the submission does not
  // trigger the reset, and as a result, the update button does not disappear.
  // @see https://github.com/react-hook-form/react-hook-form/issues/4740
  const isDirty = form.formState.dirtyFields.name;
  const errorMessage = form.formState.errors.name?.message;

  const onSubmit = async () => {
    try {
      await updateUser({
        name: form.getValues().name,
      });

      // Hide the update button
      form.reset({}, { keepValues: true });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    } else {
      toast.dismiss();
    }
  }, [errorMessage]);

  return (
    <Form {...form}>
      <form
        className="flex items-end justify-between gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <div className="w-56 flex-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-1 block text-xs">Display name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className={cn("h-8 px-2", errorMessage && "border-destructive")}
                    {...form.register("name", {
                      onChange: (e) => {
                        const parsed = updateUserSchema.safeParse({
                          name: e.target.value,
                        });

                        if (parsed.success) {
                          sessionModel.setUser({
                            ...user,
                            name: parsed.data.name!,
                          });
                        }
                      },
                    })}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        {isDirty && !errorMessage && (
          <Button type="submit" className="h-8 px-2" variant="control-ghost">
            Update
          </Button>
        )}
      </form>
    </Form>
  );
};
