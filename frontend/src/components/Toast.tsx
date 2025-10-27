import React, { createContext, useContext, useState } from 'react'

interface Toast {
    id: number
    message: string
    type: 'error' | 'success' | 'info'
}

interface ToastContextType {
    showToast: (message: string, type: Toast['type']) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = (message: string, type: Toast['type']) => {
        const id = Math.random()
        setToasts(prev => [...prev, { id, message, type }])
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id))
        }, 3000)
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-4 right-4 space-y-2">
                {toasts.map(toast => (
                    <div 
                        key={toast.id}
                        className={`px-4 py-2 rounded-lg text-white shadow-lg transform transition-all ${
                            toast.type === 'error' ? 'bg-red-600' :
                            toast.type === 'success' ? 'bg-emerald-600' :
                            'bg-blue-600'
                        }`}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) throw new Error('useToast must be used within ToastProvider')
    return context
}