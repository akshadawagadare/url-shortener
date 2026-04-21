import { useEffect, useState } from 'react'
import { CheckCircle, X } from 'lucide-react'

function ToastItem({ toast, onDismiss }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Trigger enter animation
    const enterTimer = setTimeout(() => setVisible(true), 10)
    // Auto-dismiss after 3s
    const exitTimer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onDismiss(toast.id), 300)
    }, 3000)

    return () => {
      clearTimeout(enterTimer)
      clearTimeout(exitTimer)
    }
  }, [toast.id, onDismiss])

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`flex items-center gap-3 rounded-xl border border-primary/30 bg-card px-4 py-3 shadow-lg shadow-black/40 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}
    >
      <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
      <span className="flex-1 text-sm font-medium text-foreground">{toast.message}</span>
      <button
        onClick={() => {
          setVisible(false)
          setTimeout(() => onDismiss(toast.id), 300)
        }}
        aria-label="Dismiss notification"
        className="flex h-5 w-5 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

export default function Toast({ toasts, onDismiss }) {
  return (
    <div
      aria-label="Notifications"
      className="pointer-events-none fixed bottom-6 right-4 z-50 flex flex-col gap-2 sm:right-6"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  )
}
