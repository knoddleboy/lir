import {
  LucideArrowLeft,
  LucideCheck,
  LucideCircle,
  LucideMenu,
} from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  logo: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <path
        fill="currentColor"
        d="M5.4,10.9c0,3.2,2.3,5.4,5.7,5.4h1.7v8.3c0,0.6,0.4,1,1,1c0.6,0,1-0.4,1-1v-17h2.3v17c0,0.6,0.4,1,1,1c0.6,0,1-0.4,1-1v-17  H21c0.6,0,1-0.4,1-1c0-0.6-0.4-1-1-1h-9.9C7.6,5.5,5.4,7.6,5.4,10.9z"
      />
      <path
        fill="currentColor"
        d="M26.6,21.1c0-3.2-2.3-5.4-5.7-5.4h-1.7V7.5c0-0.6-0.4-1-1-1c-0.6,0-1,0.4-1,1v17h-2.3v-17c0-0.6-0.4-1-1-1c-0.6,0-1,0.4-1,1  v17H11c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1h9.9C24.4,26.5,26.6,24.4,26.6,21.1z"
      />
    </svg>
  ),
  eye: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        d="M8 13c4.7 0 8-3.8 8-5 0-1.2-3.3-5-8-5S0 6.8 0 8c0 1.2 3.3 5 8 5zm0-.9c-3.9 0-7-3.3-7-4.1 0-.7 3.1-4.1 7-4.1 3.8 0 7 3.4 7 4.1 0 .8-3.2 4.1-7 4.1zm0-.8c1.8 0 3.3-1.5 3.3-3.3 0-1.8-1.5-3.3-3.3-3.3-1.8 0-3.3 1.5-3.3 3.3 0 1.8 1.5 3.3 3.3 3.3zm0-2.2c-.6 0-1.1-.5-1.1-1.1 0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1 0 .6-.5 1.1-1.1 1.1z"
      />
    </svg>
  ),
  eyeSlash: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        d="M3.7 5.4C2.1 6.4 1 7.7 1 8.1c0 .8 3.1 4.1 7 4.1.8 0 1.5-.1 2.2-.3l.8.8c-1 .3-1.9.4-3 .4-4.7 0-8-3.8-8-5 0-.7 1.1-2.3 3-3.4l.7.7zM16 8.1c0 .7-1.1 2.2-2.9 3.4l-.7-.7C14 9.9 15 8.6 15 8.1 15 7.4 11.9 4 8 4c-.7 0-1.5.1-2.1.3l-.8-.7C6 3.3 7 3.1 8 3.1c4.7 0 8 3.8 8 5zm-6.6 3c-.4.2-.9.3-1.4.3-1.8 0-3.3-1.5-3.3-3.3 0-.5.1-1 .3-1.4l4.4 4.4zm1.9-3c0 .5-.1.9-.3 1.4L6.6 5.2c.4-.2.9-.3 1.4-.3 1.8 0 3.3 1.4 3.3 3.2zm1.2 5.1c.2.2.5.2.6 0 .2-.2.2-.5 0-.6L3.3 2.8c-.2-.2-.5-.2-.6 0-.2.2-.2.5 0 .6l9.8 9.8z"
      />
    </svg>
  ),
  circle: LucideCircle,
  check: LucideCheck,
  arrowLeft: LucideArrowLeft,
  menu: LucideMenu,
} as const;
