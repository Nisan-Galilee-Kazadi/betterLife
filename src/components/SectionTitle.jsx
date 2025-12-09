import React from 'react'

export function SectionTitle({ kicker, title, children }) {
    return (
        <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#63b32e]">{kicker}</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
            {children ? <div className="text-lg text-slate-600">{children}</div> : null}
        </div>
    )
}
