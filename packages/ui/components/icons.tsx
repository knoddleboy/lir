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
} as const;
