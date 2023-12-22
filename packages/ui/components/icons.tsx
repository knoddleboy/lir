import {
  LucideArrowLeft,
  LucideArrowRight,
  LucideArrowUpDown,
  LucideCheck,
  LucideChevronDown,
  LucideChevronLeft,
  LucideChevronRight,
  LucideChevronUp,
  LucideCircle,
  LucideDownload,
  LucideLoader2,
  LucideMenu,
  LucideMoon,
  LucidePlus,
  LucideSettings,
  LucideSun,
  LucideXCircle,
  MoreHorizontal,
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
  search: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        d="M.1 6.5C.1 10.1 3 13 6.6 13c1.4 0 2.7-.5 3.8-1.2l4 4c.2.2.4.3.7.3.6 0 .9-.4.9-1 0-.3-.1-.5-.3-.7l-4-4c.8-1.1 1.3-2.5 1.3-3.9C13 2.9 10.1 0 6.5 0S.1 2.9.1 6.5zm1.4 0c0-2.8 2.3-5.1 5.1-5.1s5.1 2.3 5.1 5.1-2.3 5.1-5.1 5.1c-2.9 0-5.1-2.3-5.1-5.1z"
      />
    </svg>
  ),
  trash: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        d="M5.9 13.7c.3 0 .5-.2.4-.4l-.2-7.7c0-.3-.2-.4-.4-.4-.3 0-.5.2-.4.4l.2 7.7c-.1.2.1.4.4.4zm2.1 0c.3 0 .5-.2.5-.4V5.6c0-.3-.2-.4-.5-.4s-.5.1-.5.4v7.7c0 .2.2.4.5.4zm2.1 0c.3 0 .4-.2.4-.4l.2-7.7c0-.3-.2-.4-.4-.4-.3 0-.4.2-.4.4l-.2 7.7c0 .2.2.4.4.4zM4.8 3.3H6V1.7c0-.4.3-.7.7-.7h2.6c.4 0 .7.3.7.7v1.5h1.1V1.7c0-1-.7-1.7-1.8-1.7H6.6C5.5 0 4.8.6 4.8 1.7v1.6zm-3.2.6h12.8c.3 0 .5-.3.5-.5 0-.3-.2-.5-.5-.5H1.6c-.3-.1-.6.1-.6.4 0 .3.3.6.6.6zM4.7 16h6.6c1 0 1.7-.7 1.8-1.7l.5-10.6h-1.2l-.5 10.5c0 .4-.3.7-.7.7H4.8c-.4 0-.7-.3-.7-.7L3.6 3.7H2.4l.5 10.6c.1 1 .8 1.7 1.8 1.7z"
      />
    </svg>
  ),
  document: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        d="M4 16h8c1.5 0 2.3-.8 2.3-2.3V6.9c0-1-.1-1.4-.7-2L9.5.7C8.9.1 8.4 0 7.6 0H4C2.5 0 1.7.8 1.7 2.3v11.3c0 1.6.8 2.4 2.3 2.4zm.1-1.2c-.8 0-1.2-.4-1.2-1.2V2.4c0-.7.4-1.2 1.2-1.2h3.3v4.3c0 .9.5 1.4 1.4 1.4h4.3v6.7c0 .7-.4 1.2-1.2 1.2H4.1zm4.9-9c-.3 0-.4-.1-.4-.4v-4l4.3 4.4H9z"
      />
      <path
        fill="currentColor"
        d="M10.7 9H5.1c-.3 0-.5.2-.5.5s.2.5.5.5h5.7c.3 0 .5-.2.5-.5-.1-.3-.3-.5-.6-.5zm0 2.6H5.1c-.3 0-.5.2-.5.5s.2.4.5.4h5.7c.3 0 .5-.2.5-.4-.1-.3-.3-.5-.6-.5z"
      />
    </svg>
  ),
  tick: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        d="M6.2 15.8c.5 0 .9-.2 1.2-.6l8.3-12.9c.2-.3.3-.6.3-.9 0-.7-.5-1.2-1.2-1.2-.5 0-.8.2-1.1.7L6.1 12.8 2.3 7.9c-.3-.4-.6-.5-1-.5-.8 0-1.3.5-1.3 1.2 0 .3.1.6.4.9L5 15.2c.3.4.7.6 1.2.6z"
      />
    </svg>
  ),
  circle: LucideCircle,
  check: LucideCheck,
  arrowLeft: LucideArrowLeft,
  arrowRight: LucideArrowRight,
  arrowUpDown: LucideArrowUpDown,
  chevronLeft: LucideChevronLeft,
  chevronUp: LucideChevronUp,
  chevronRight: LucideChevronRight,
  chevronDown: LucideChevronDown,
  menu: LucideMenu,
  settings: LucideSettings,
  import: LucideDownload,
  plus: LucidePlus,
  sun: LucideSun,
  moon: LucideMoon,
  xCircle: LucideXCircle,
  spinner: LucideLoader2,
  more: MoreHorizontal,
} as const;
