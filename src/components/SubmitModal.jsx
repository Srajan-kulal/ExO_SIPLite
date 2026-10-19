import React from 'react'
import { useStore, SCALE_ATTRS, IDEAS_ATTRS, MTP_DEF } from '../store/useStore'

export default function SubmitModal({ onClose, onConfirm }) {
  const { blocks, getStatus } = useStore()

  const groups = [
    { label: 'MTP', attrs: [MTP_DEF], color: '#eab308' },
    { label: 'SCALE', attrs: SCALE_ATTRS, color: '#ec4899' },
    { label: 'IDEAS', attrs: IDEAS_ATTRS, color: '#3b82f6' },
  ]

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md rounded-3xl p-8 border border-white/10" style={{ background: '#131320' }}>
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">⚡</div>
          <h2 className="text-xl font-bold text-white mb-2">Submit your ExO Canvas?</h2>
          <p className="text-sm text-gray-400 leading-relaxed">The canvas will be locked and sent to your mentor for review.</p>
        </div>

        {/* Completion summary */}
        <div className="rounded-2xl p-4 mb-5 border border-white/5" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Attribute completion</div>
          {groups.map(g => (
            <div key={g.label} className="mb-3">
              <div className="text-xs font-bold mb-1.5" style={{ color: g.color }}>{g.label}</div>
              <div className="grid grid-cols-3 gap-1.5">
                {g.attrs.map(a => {
                  const st = getStatus(a.id)
                  return (
                    <div key={a.id} className={`flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg ${st === 'complete' ? 'bg-green-900/40 text-green-400' : st === 'partial' ? 'bg-amber-900/40 text-amber-400' : 'bg-white/5 text-gray-600'}`}>
                      <span>{st === 'complete' ? '✓' : st === 'partial' ? '~' : '○'}</span>
                      <span className="truncate">{a.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 btn-ghost">Go back</button>
          <button onClick={onConfirm} className="flex-1 btn-primary">Submit canvas</button>
        </div>
      </div>
    </div>
  )
}
