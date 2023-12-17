import { getInitials } from "@lir/lib";
import { Avatar as UIAvatar, AvatarFallback, AvatarImage } from "@lir/ui";

import { cva, type VariantProps } from "class-variance-authority";

const avatarVariants = cva("", {
  variants: {
    size: {
      base: "mr-2 h-8 w-8",
      md: "mr-3 h-10 w-10",
      lg: "mr-5 h-16 w-16",
    },
    fallbackSize: {
      base: "text-[15px]",
      md: "text-[19px]",
      lg: "text-3xl",
    },
  },
  compoundVariants: [
    { size: "base", fallbackSize: "base" },
    { size: "md", fallbackSize: "md" },
    { size: "lg", fallbackSize: "lg" },
  ],
  defaultVariants: {
    size: "base",
    fallbackSize: "base",
  },
});

interface Props extends VariantProps<typeof avatarVariants> {
  avatarUrl?: string | null;
  fallbackName?: string;
}

export const Avatar = ({ avatarUrl, fallbackName, size }: Props) => (
  <UIAvatar className={avatarVariants({ size, fallbackSize: null })}>
    <AvatarImage src={avatarUrl || ""} />
    <AvatarFallback className={avatarVariants({ fallbackSize: size, size: null })}>
      {getInitials(fallbackName)}
    </AvatarFallback>
  </UIAvatar>
);
