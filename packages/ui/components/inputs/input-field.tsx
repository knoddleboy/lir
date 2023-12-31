import { cn } from "@lir/lib";

import React from "react";

import { Input, type InputProps } from "../ui/input";

type AddonWrapperProps = {
  className?: string;
  children?: React.ReactNode;
  onClickAddon?: () => void;
};

const AddonWrapper = ({ className, children, onClickAddon }: AddonWrapperProps) => (
  <div
    onClick={onClickAddon}
    className={cn(
      "border-input bg-muted h-8 border",
      onClickAddon && "cursor-pointer",
      className
    )}
  >
    <div className="flex h-full flex-col justify-center">{children}</div>
  </div>
);

export interface InputFieldProps extends InputProps, AddonWrapperProps {
  addonPrefix?: React.ReactNode;
  addonSufix?: React.ReactNode;
  onClickAddon?: () => void;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const { className, addonPrefix, addonSufix, onClickAddon, ...rest } = props;

    return addonPrefix || addonSufix ? (
      <div className="_ring-within relative flex w-full items-center rounded-md">
        {addonPrefix && (
          <AddonWrapper className="rounded-l-md">{addonPrefix}</AddonWrapper>
        )}

        <Input
          className={cn(
            "!ring-0",
            addonPrefix && "rounded-l-none border-l-0",
            addonSufix && "rounded-r-none border-r-0",
            className
          )}
          {...rest}
          ref={ref}
        />

        {addonSufix && (
          <AddonWrapper className="rounded-r-md" onClickAddon={onClickAddon}>
            {addonSufix}
          </AddonWrapper>
        )}
      </div>
    ) : (
      <Input className={cn(className)} {...rest} ref={ref} />
    );
  }
);
InputField.displayName = "InputField";
