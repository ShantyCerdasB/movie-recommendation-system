import { useSyncExternalStore } from 'react'

let activeRequestCount = 0
const listeners = new Set<() => void>()

function emitChange() {
  listeners.forEach((listener) => listener())
}

export function beginNetworkActivity() {
  activeRequestCount += 1
  emitChange()
}

export function endNetworkActivity() {
  activeRequestCount = Math.max(0, activeRequestCount - 1)
  emitChange()
}

function subscribe(listener: () => void) {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot() {
  return activeRequestCount
}

export function useNetworkActivityCount() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
