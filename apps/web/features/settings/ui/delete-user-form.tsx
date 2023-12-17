"use client";

import { ErrorResponseCode } from "@lir/lib/error";
import { deleteUserSchema, type DeleteUserInput } from "@lir/lib/schema";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  PasswordField,
} from "@lir/ui";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

import { useDeleteUser } from "../api";

export const DeleteUserForm = () => {
  const router = useRouter();

  const { mutateAsync: deleteAccount, isPending } = useDeleteUser();

  const form = useForm<DeleteUserInput>({
    resolver: zodResolver(deleteUserSchema),
    defaultValues: {
      password: "",
    },
  });
  const isDirty = form.formState.isDirty;

  const errorMessages: { [key: string]: string } = {
    [ErrorResponseCode.InvalidCredentials]: "Invalid password",
  };

  const onSubmit = async (data: DeleteUserInput) => {
    try {
      await deleteAccount({ ...data });

      toast.success("Account successfully deleted. See you!");
      router.replace("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(errorMessages[error.response?.data.message]);
      }
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-[15px]">Please enter your password to confirm.</p>
      <Form {...form}>
        <form
          className="flex items-center space-x-4"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
          <div className="flex-1">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordField {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={!isDirty || isPending}
            variant="control-destructive"
            className="h-[30px] font-medium"
            size="link"
            type="submit"
          >
            Delete my account
          </Button>
        </form>
      </Form>
    </div>
  );
};
