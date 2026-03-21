/**
 * @fileoverview Generic debounce hook that delays propagating a value update
 * until the specified delay has elapsed without further changes.
 */
import { useState, useEffect } from 'react'

/**
 * Returns a debounced copy of `value` that only updates after `delay`
 * milliseconds have passed since the last render with a new value.
 *
 * @template T - Type of the value being debounced.
 * @param value - The live value to debounce.
 * @param delay - Debounce delay in milliseconds. Defaults to `300`.
 * @returns The debounced value, which lags behind `value` by up to `delay` ms.
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
