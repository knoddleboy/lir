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
  Skeleton,
} from "@lir/ui";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useIsClient } from "usehooks-ts";

import { sessionModel } from "~/entities/session";

import { useUpdateUser } from "./api";

export const NameSetting = ({ user }: { user: UserProps | null }) => {
  const isClient = useIsClient();

  const { mutateAsync: updateUser } = useUpdateUser();

  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: { name: user?.name },
    mode: "onChange",
  });
  const isDirty = form.formState.isDirty;
  const isValid = form.formState.isValid;

  const onSubmit = async () => {
    try {
      await updateUser({
        name: form.getValues().name,
      });

      form.reset({}, { keepValues: true });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isValid && isClient) {
      toast.error(form.formState.errors.name?.message);
    } else {
      toast.dismiss();
    }
  }, [isValid]);

  useEffect(() => {
    if (user) {
      form.reset({ name: user.name });
    }
  }, []);

  if (!user) {
    return (
      <>
        <div className="flex flex-col">
          <Skeleton className="mb-1 h-4 w-20" />
          <Skeleton className="h-8 w-56" />
        </div>
      </>
    );
  }

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
                    className={cn("h-8 px-2", !isValid && "border-destructive")}
                    defaultValue={user.name}
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
        {isDirty && isValid && (
          <Button type="submit" className="h-8 px-2" variant="control-ghost">
            Update
          </Button>
        )}
      </form>
    </Form>
  );
};
