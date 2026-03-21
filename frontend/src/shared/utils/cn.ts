/**
 * @fileoverview Utility for composing Tailwind class names safely.
 */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges an arbitrary number of class name inputs and resolves Tailwind
 * conflicts so that the last relevant class always wins.
 *
 * @param inputs - Any mix of strings, arrays, or conditional objects accepted by `clsx`.
 * @returns A single merged class name string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
