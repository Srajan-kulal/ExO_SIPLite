import React, { useState } from 'react'
import { useStore, SCALE_ATTRS, IDEAS_ATTRS, MTP_DEF, ALL_ATTRS } from '../store/useStore'
import AttributeCard from './AttributeCard'
import MTPBlock from './MTPBlock'
import SubmitModal from './SubmitModal'

function ProgressBar({ count, total, color }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-white/5">
        <div className="h-1.5 rounded-full transition-all" style={{ width: `${(count / total) * 100}%`, background: color }} />
      </div>
      <span className="text-xs text-gray-500 shrink-0">{count}/{total}</span>
    </div>
  )
}

export default function CanvasView() {
  const {
    teamName, projectName, mentorName,
    status, submittedAt, lastSavedAt,
    canSubmit, getCompletionCount, getStatus,
    showHints, showContext,
    toggleHints, toggleContext,
    context, submit, reset,
    activeAttr, setActiveAttr,
  } = useStore()

  const [showModal, setShowModal] = useState(false)
  const submitted = status === 'submitted'
  const totalDone = getCompletionCount()
  const totalAttrs = ALL_ATTRS.length
  const hasCtx = context.problemStatement || context.hmwStatement || context.primaryStakeholder

  // Scale / IDEAS counts
  const scaleDone = SCALE_ATTRS.filter(a => getStatus(a.id) === 'complete').length
  const ideasDone = IDEAS_ATTRS.filter(a => getStatus(a.id) === 'complete').length
  const mtpDone   = getStatus('mtp') === 'complete'

  // Active attr details
  const activeAttrDef = activeAttr ? ALL_ATTRS.find(a => a.id === activeAttr) : null

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0f0f1a' }}>

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="border-b border-white/5 px-4 py-3 flex items-center justify-between gap-3 shrink-0" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xl">⚡</span>
          <div className="min-w-0">
            <div className="font-bold text-white text-sm truncate">ExO Canvas — {projectName}</div>
            <div className="text-xs text-gray-500 truncate">{teamName}{mentorName ? ` · ${mentorName}` : ''}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
          {/* Progress pills */}
          <div className="hidden md:flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-lg font-semibold ${mtpDone ? 'bg-yellow-900/50 text-yellow-400' : 'bg-white/5 text-gray-600'}`}>MTP {mtpDone ? '✓' : '○'}</span>
            <span className="text-xs px-2 py-1 rounded-lg font-semibold bg-pink-900/20 text-pink-400">SCALE {scaleDone}/5</span>
            <span className="text-xs px-2 py-1 rounded-lg font-semibold bg-blue-900/20 text-blue-400">IDEAS {ideasDone}/5</span>
          </div>

          {submitted && <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-900/40 text-green-400">✓ Submitted</div>}

          {hasCtx && (
            <button onClick={toggleContext} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${showContext ? 'border-pink-500/40 text-pink-400 bg-pink-900/20' : 'border-white/10 text-gray-500 hover:bg-white/5'}`}>
              📎 Context
            </button>
          )}
          <button onClick={toggleHints} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${showHints ? 'border-yellow-500/40 text-yellow-400 bg-yellow-900/20' : 'border-white/10 text-gray-500 hover:bg-white/5'}`}>
            💡 Hints
          </button>

          {!submitted
            ? <button onClick={() => setShowModal(true)} disabled={!canSubmit()} className="btn-primary disabled:opacity-30 disabled:cursor-not-allowed">Submit →</button>
            : <button onClick={reset} className="btn-ghost text-xs">← Start over</button>
          }
        </div>
      </header>

      {/* ── Sub-bar ─────────────────────────────────────────────── */}
      <div className="border-b border-white/5 px-4 py-1.5 flex items-center justify-between text-xs text-gray-600" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <span>{submitted ? `Submitted ${submittedAt ? new Date(submittedAt).toLocaleString() : ''}` : lastSavedAt ? `Auto-saved ${new Date(lastSavedAt).toLocaleTimeString()}` : 'Not yet saved'}</span>
        <span className="hidden sm:block text-gray-700">Fill MTP first, then SCALE (external), then IDEAS (internal)</span>
      </div>

      {/* ── Context panel ───────────────────────────────────────── */}
      {showContext && hasCtx && (
        <div className="mx-4 mt-3 rounded-2xl p-4 border border-white/5 flex gap-4 flex-wrap" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="text-xs font-bold text-pink-500 uppercase tracking-wide shrink-0 mt-0.5">📎 Context</div>
          {context.problemStatement && <div className="text-xs text-gray-400"><span className="text-gray-600 font-semibold">Problem:</span> {context.problemStatement}</div>}
          {context.hmwStatement && <div className="text-xs text-gray-400"><span className="text-gray-600 font-semibold">HMW:</span> {context.hmwStatement}</div>}
          {context.primaryStakeholder && <div className="text-xs text-gray-400"><span className="text-gray-600 font-semibold">Stakeholder:</span> {context.primaryStakeholder}</div>}
        </div>
      )}

      {/* ── Submitted banner ────────────────────────────────────── */}
      {submitted && (
        <div className="mx-4 mt-3 rounded-2xl px-5 py-4 border border-green-800/40 flex items-center gap-3" style={{ background: 'rgba(21,128,61,0.1)' }}>
          <span className="text-xl">✅</span>
          <div>
            <div className="font-semibold text-green-400 text-sm">ExO Canvas submitted successfully</div>
            <div className="text-xs text-green-700 mt-0.5">Your canvas is now locked. Your mentor will review it shortly.</div>
          </div>
        </div>
      )}

      {/* ── Main canvas grid ────────────────────────────────────── */}
      <div className="flex-1 p-4">
        {/* Top progress bars */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-xs font-bold text-pink-500 uppercase tracking-wide mb-1.5">SCALE — External</div>
            <ProgressBar count={scaleDone} total={5} color="#ec4899" />
          </div>
          <div>
            <div className="text-xs font-bold text-yellow-500 uppercase tracking-wide mb-1.5 text-center">MTP</div>
            <div className="h-1.5 rounded-full" style={{ background: mtpDone ? '#eab308' : 'rgba(255,255,255,0.05)' }} />
          </div>
          <div>
            <div className="text-xs font-bold text-blue-400 uppercase tracking-wide mb-1.5 text-right">IDEAS — Internal</div>
            <ProgressBar count={ideasDone} total={5} color="#3b82f6" />
          </div>
        </div>

        {/* Three-column canvas */}
        <div className="grid gap-3" style={{ gridTemplateColumns: '1fr 1.2fr 1fr' }}>

          {/* SCALE column */}
          <div className="flex flex-col gap-3">
            <div className="text-center mb-1">
              <div className="inline-flex gap-0.5">
                {['S','C','A','L','E'].map(l => (
                  <span key={l} className="w-6 h-6 rounded text-white text-xs font-black flex items-center justify-center" style={{ background: '#ec4899' }}>{l}</span>
                ))}
              </div>
              <div className="text-xs text-pink-600 mt-1">External Mechanisms</div>
            </div>
            {SCALE_ATTRS.map(attr => (
              <AttributeCard key={attr.id} def={attr} submitted={submitted} compact />
            ))}
          </div>

          {/* MTP centre column */}
          <div className="flex flex-col gap-3">
            <div className="text-center mb-1">
              <span className="inline-block px-3 py-0.5 rounded text-black text-xs font-black" style={{ background: '#eab308' }}>MTP</span>
              <div className="text-xs text-yellow-700 mt-1">Massive Transformative Purpose</div>
            </div>
            <MTPBlock submitted={submitted} />

            {/* Overall completion summary */}
            <div className="rounded-2xl p-4 border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Overall Progress</div>
              <div className="text-3xl font-black text-white mb-1 text-center">{totalDone}<span className="text-gray-600 text-lg">/{totalAttrs}</span></div>
              <div className="text-xs text-gray-600 text-center mb-3">attributes filled</div>
              <div className="h-2 rounded-full bg-white/5">
                <div className="h-2 rounded-full transition-all" style={{ width: `${(totalDone / totalAttrs) * 100}%`, background: 'linear-gradient(90deg, #ec4899, #eab308, #3b82f6)' }} />
              </div>
              {!submitted && (
                <div className="mt-3 text-xs text-gray-600 text-center leading-relaxed">
                  {canSubmit() ? '✅ Ready to submit' : 'Need: MTP + 3 SCALE + 3 IDEAS attributes'}
                </div>
              )}
            </div>
          </div>

          {/* IDEAS column */}
          <div className="flex flex-col gap-3">
            <div className="text-center mb-1">
              <div className="inline-flex gap-0.5">
                {['I','D','E','A','S'].map(l => (
                  <span key={l} className="w-6 h-6 rounded text-white text-xs font-black flex items-center justify-center" style={{ background: '#3b82f6' }}>{l}</span>
                ))}
              </div>
              <div className="text-xs text-blue-600 mt-1">Internal Mechanisms</div>
            </div>
            {IDEAS_ATTRS.map(attr => (
              <AttributeCard key={attr.id} def={attr} submitted={submitted} compact />
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile strip ────────────────────────────────────────── */}
      <div className="md:hidden border-t border-white/5 px-4 py-2 shrink-0" style={{ background: 'rgba(0,0,0,0.4)' }}>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {ALL_ATTRS.map(a => {
            const st = getStatus(a.id)
            return (
              <button key={a.id} onClick={() => setActiveAttr(a.id)}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs whitespace-nowrap shrink-0 border transition-colors ${
                  st === 'complete' ? 'bg-green-900/40 text-green-400 border-green-800/40' :
                  st === 'partial'  ? 'bg-amber-900/40 text-amber-400 border-amber-800/40' :
                  'bg-white/5 text-gray-500 border-white/5'
                }`}>
                <span>{st === 'complete' ? '✓' : a.acronym || 'M'}</span>
                <span>{a.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {showModal && <SubmitModal onClose={() => setShowModal(false)} onConfirm={() => { submit(); setShowModal(false) }} />}
    </div>
  )
}
