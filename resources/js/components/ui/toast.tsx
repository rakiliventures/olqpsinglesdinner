import { createContext, useCallback, useContext, useMemo, useState } from 'react'

export type ToastVariant = 'default' | 'destructive'

export type ToastItem = {
  id: number
  title?: string
  description?: string
  variant?: ToastVariant
  durationMs?: number
}

type ToastContextValue = {
  toast: (input: Omit<ToastItem, 'id'>) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const toast = useCallback((input: Omit<ToastItem, 'id'>) => {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    const item: ToastItem = {
      id,
      variant: 'default',
      durationMs: 4000,
      ...input,
    }
    setToasts((prev) => [...prev, item])
    const timeout = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, item.durationMs)
    return () => clearTimeout(timeout)
  }, [])

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export function Toaster({ toasts, onDismiss }: { toasts: ToastItem[]; onDismiss: (id: number) => void }) {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[60] flex w-full max-w-sm flex-col gap-2 sm:right-6 sm:top-6">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={[
            'pointer-events-auto overflow-hidden rounded-md border p-3 shadow-md backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/50',
            t.variant === 'destructive'
              ? 'border-red-300 bg-red-50 text-red-900 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-200'
              : 'border-black/10 bg-white text-black dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-100',
          ].join(' ')}
        >
          {t.title && <div className="text-sm font-semibold">{t.title}</div>}
          {t.description && <div className="mt-0.5 text-sm opacity-90">{t.description}</div>}
          <button
            type="button"
            className="mt-2 rounded-sm border px-2 py-1 text-xs hover:bg-black/5 dark:hover:bg-white/10"
            onClick={() => onDismiss(t.id)}
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  )
}
