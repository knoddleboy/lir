"use client";

import { cn } from "@lir/lib";

import React, { useCallback, useState } from "react";

import { Icons } from "../icons";
import { InputField, type InputFieldProps } from "./input-field";

export const PasswordField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisible = useCallback(
      () => setPasswordVisible(!passwordVisible),
      [passwordVisible, setPasswordVisible]
    );

    return (
      <InputField
        ref={ref}
        type={passwordVisible ? "text" : "password"}
        placeholder="Enter your password"
        className={cn(
          // Workaround for password field dot size
          // @see https://stackoverflow.com/questions/6859727/styling-password-fields-in-css
          !passwordVisible &&
            `[&:not(:placeholder-shown)]:font-[small-caption]
             [&:not(:placeholder-shown)]:text-[16px]
             [&:not(:placeholder-shown)]:tracking-widest`,
          props.className
        )}
        {...props}
        addonSufix={
          <button
            tabIndex={-1}
            type="button"
            className="px-2 !outline-none"
            onClick={togglePasswordVisible}
          >
            {passwordVisible ? (
              <Icons.eyeSlash width={16} />
            ) : (
              <Icons.eye width={16} />
            )}
          </button>
        }
      />
    );
  }
);
PasswordField.displayName = "PasswordField";

export const EmailField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    return (
      <InputField
        ref={ref}
        type="email"
        placeholder="Enter your email"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect="off"
        inputMode="email"
        {...props}
      />
    );
  }
);
EmailField.displayName = "EmailField";
