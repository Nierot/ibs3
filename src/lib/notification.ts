import { writable } from 'svelte/store'

type Notification = {
  title: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  time?: number
}

export const notifications = writable<Notification[]>([])

export function toast(notification: Notification) {
  notifications.update((notifications) => [...notifications, notification])
  setTimeout(removeToast, notification.time ?? 5000)
}

function removeToast() {
  notifications.update((state) => state.slice(1))
}