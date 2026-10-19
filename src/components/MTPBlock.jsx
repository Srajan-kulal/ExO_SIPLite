import React, { useRef, useEffect } from 'react'
import { useStore, MTP_DEF } from '../store/useStore'

export default function MTPBlock({ submitted }) {
  const { blocks, updateBlock, activeAttr, setActiveAttr, showHints, getStatus } = useStore()
  const content  = blocks['mtp']?.content || ''
  const status   = getStatus('mtp')
  const isActive = activeAttr === 'mtp'
  const taRef    = useRef(null)

  useEffect(() => {
    if (taRef.current) { taRef.current.style.height = 'auto'; taRef.current.style.height = taRef.current.scrollHeight + 'px' }
  }, [content])

  return (
    <div
      className="rounded-3xl border-2 p-6 flex flex-col transition-all mtp-glow"
      style={{
        background: '#13110a',
        borderColor: isActive ? '#eab308' : '#422006',
        boxShadow: isActive ? '0 0 60px rgba(234,179,8,0.25)' : '0 0 40px rgba(234,179,8,0.08)',
        minHeight: 200,
      }}
      onClick={() => !submitted && setActiveAttr('mtp')}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-black" style={{ background: '#eab308' }}>
            MTP
          </div>
          <div>
            <div className="font-black text-yellow-400 text-sm uppercase tracking-widest">Massive Transformative Purpose</div>
            <div className="text-xs text-yellow-700 mt-0.5">The north star of your ExO — your reason for being</div>
          </div>
        </div>
        <span className={`w-2.5 h-2.5 rounded-full ${status === 'complete' ? 'bg-green-500' : status === 'partial' ? 'bg-amber-400' : 'bg-gray-700'}`} />
      </div>

      {/* Hint */}
      {showHints && isActive && (
        <div className="text-xs text-yellow-700 rounded-xl px-4 py-3 mb-4 leading-relaxed border border-yellow-900/40" style={{ background: 'rgba(234,179,8,0.05)' }}>
          💡 {MTP_DEF.hint}
        </div>
      )}

      {/* Textarea */}
      <textarea
        ref={taRef}
        className="flex-1 resize-none text-base leading-relaxed w-full focus:outline-none bg-transparent placeholder-yellow-900 font-medium text-center"
        style={{ color: '#fde68a', minHeight: 80 }}
        placeholder={submitted ? '—' : MTP_DEF.placeholder}
        value={content}
        disabled={submitted}
        maxLength={MTP_DEF.maxChars}
        rows={3}
        onChange={e => { updateBlock('mtp', e.target.value); e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px' }}
        onFocus={() => setActiveAttr('mtp')}
      />

      {/* Char */}
      {isActive && !submitted && (
        <div className="text-xs text-yellow-900 text-right mt-2">{content.length} / {MTP_DEF.maxChars}</div>
      )}

      {/* Examples */}
      {!content && !submitted && (
        <div className="mt-4 pt-4 border-t border-yellow-900/20">
          <div className="text-xs text-yellow-900 mb-2 font-semibold uppercase tracking-wide">Examples</div>
          <div className="space-y-1">
            {['Organize the world\'s information','Make clean energy affordable for all','Democratize education for 1 billion learners'].map((ex, i) => (
              <div key={i} className="text-xs text-yellow-800 italic">{ex}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
