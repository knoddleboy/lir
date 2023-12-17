import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string | undefined): string {
  if (!name) return "";

  const parts = name.split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  } else {
    return parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("");
  }
}
