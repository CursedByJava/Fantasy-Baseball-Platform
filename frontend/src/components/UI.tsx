import React from 'react'


export function Badge({ children }: { children: React.ReactNode }) {
    return <span className="rounded-full bg-slate-100 text-slate-700 text-xs px-2 py-1 border border-slate-200">{children}</span>
}


export function Stat({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex items-baseline gap-2">
        <span className="text-[11px] uppercase tracking-wide text-slate-500">{label}</span>
        <span className="font-semibold">{value ?? '-'}</span>
        </div>
    )
}


export function Avatar({ name }: { name: string }) {
    const initials = name.split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase()
    return <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold">{initials}</div>
}