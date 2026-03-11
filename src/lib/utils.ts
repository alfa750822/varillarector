import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  // Fallback if clsx or tailwind-merge are missing
  if (typeof clsx === 'undefined' || typeof twMerge === 'undefined') {
    return inputs.filter(Boolean).join(' ');
  }
  return twMerge(clsx(inputs))
}