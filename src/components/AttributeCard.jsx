import React, { useRef, useEffect } from 'react'
import { useStore } from '../store/useStore'

function StatusDot({ status }) {
  const cls = status === 'complete' ? 'bg-green-500' : status === 'partial' ? 'bg-amber-400' : 'bg-gray-700'
  return <span className={`inline-block w-2 h-2 rounded-full shrink-0 ${cls}`} />
}

function CharBar({ count, max, color }) {
  const pct = Math.min(count / max, 1)
  const barColor = pct >= 1 ? '#ef4444' : pct >= 0.9 ? '#f59e0b' : color
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex-1 h-0.5 rounded-full bg-white/5">
        <div className="h-0.5 rounded-full transition-all" style={{ width: `${pct * 100}%`, background: barColor }} />
      </div>
      <span className="text-xs shrink-0" style={{ color: pct >= 1 ? '#ef4444' : '#4b5563' }}>{count}/{max}</span>
    </div>
  )
}

export default function AttributeCard({ def, submitted, compact = false }) {
  const { blocks, updateBlock, activeAttr, setActiveAttr, showHints, getStatus } = useStore()
  const content = blocks[def.id]?.content || ''
  const status  = getStatus(def.id)
  const isActive = activeAttr === def.id
  const taRef = useRef(null)

  useEffect(() => {
    if (taRef.current) {
      taRef.current.style.height = 'auto'
      taRef.current.style.height = taRef.current.scrollHeight + 'px'
    }
  }, [content])

  return (
    <div
      className="attr-card"
      style={{
        background: def.bg,
        borderColor: isActive ? def.color : 'rgba(255,255,255,0.06)',
        boxShadow: isActive ? `0 0 20px ${def.color}22` : 'none',
      }}
      onClick={() => !submitted && setActiveAttr(def.id)}
    >
      {/* Header */}
      <div className="attr-label" style={{ color: def.color }}>
        {def.group && (
          <span className="w-5 h-5 rounded-md text-white text-xs font-black flex items-center justify-center shrink-0"
            style={{ background: def.color }}>
            {def.acronym}
          </span>
        )}
        <span className="flex-1 truncate">{def.label}</span>
        <StatusDot status={status} />
      </div>

      {/* Hint */}
      {showHints && isActive && !compact && (
        <div className="text-xs text-gray-400 rounded-xl px-3 py-2.5 mb-3 leading-relaxed border border-white/5"
          style={{ background: 'rgba(255,255,255,0.04)' }}>
          💡 {def.hint}
        </div>
      )}

      {/* Textarea */}
      <textarea
        ref={taRef}
        className="attr-textarea"
        placeholder={submitted ? '—' : def.placeholder}
        value={content}
        disabled={submitted}
        maxLength={def.maxChars}
        rows={compact ? 3 : 4}
        onChange={e => { updateBlock(def.id, e.target.value); e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px' }}
        onFocus={() => setActiveAttr(def.id)}
      />

      {/* Char bar */}
      {isActive && !submitted && (
        <CharBar count={content.length} max={def.maxChars} color={def.color} />
      )}
    </div>
  )
}
