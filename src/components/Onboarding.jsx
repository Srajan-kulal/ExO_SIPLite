import React, { useState } from 'react'
import { useStore } from '../store/useStore'

export default function Onboarding({ onStart }) {
  const { setMeta, setContext } = useStore()
  const [form, setForm] = useState({ teamName: '', projectName: '', mentorName: '' })
  const [ctx, setCtx] = useState({ problemStatement: '', hmwStatement: '', primaryStakeholder: '' })
  const [showCtx, setShowCtx] = useState(false)

  const handleStart = () => {
    if (!form.teamName.trim() || !form.projectName.trim()) return
    setMeta(form); setContext(ctx); onStart()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'radial-gradient(ellipse at 30% 20%, #2d0a3e 0%, #0f0f1a 60%, #050d1a 100%)' }}>
      <div className="w-full max-w-lg">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">⚡</div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">ExO Canvas</h1>
          <p className="text-pink-300 text-sm font-medium">SIP Lite · Inunity</p>
          <p className="text-gray-400 text-sm mt-3 max-w-sm mx-auto leading-relaxed">
            Map your organisation across the 10 attributes of an Exponential Organisation — SCALE externally, IDEAS internally, anchored to a Massive Transformative Purpose.
          </p>

          {/* SCALE + IDEAS badge strip */}
          <div className="flex items-center justify-center gap-3 mt-5 flex-wrap">
            <div className="flex gap-1">
              {['S','C','A','L','E'].map(l => (
                <span key={l} className="w-7 h-7 rounded-lg bg-pink-600/30 border border-pink-500/40 text-pink-300 text-xs font-black flex items-center justify-center">{l}</span>
              ))}
            </div>
            <span className="text-gray-600 text-xs">+</span>
            <div className="flex gap-1">
              {['I','D','E','A','S'].map(l => (
                <span key={l} className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-black flex items-center justify-center">{l}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-3xl p-8 border border-white/10" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}>
          <h2 className="font-bold text-white text-lg mb-5">About your team</h2>

          <div className="space-y-4 mb-6">
            {[
              ['Team name', 'teamName', 'e.g. Team Innovate', true],
              ['Organisation / project name', 'projectName', 'e.g. AgriConnect — farmer advisory platform', true],
              ['Mentor name', 'mentorName', 'e.g. Prof. Anand Kumar', false],
            ].map(([label, key, ph, req]) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                  {label} {req && <span className="text-pink-400">*</span>}
                </label>
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-pink-500/60 focus:bg-white/8 transition-all"
                  placeholder={ph} value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                />
              </div>
            ))}
          </div>

          <button onClick={() => setShowCtx(o => !o)}
            className="text-xs text-pink-400 hover:text-pink-300 font-medium flex items-center gap-1 mb-4 transition-colors">
            {showCtx ? '▲' : '▼'} Add context from earlier SIP Lite tools (optional)
          </button>

          {showCtx && (
            <div className="rounded-2xl p-5 mb-6 space-y-3 border border-white/10" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <p className="text-xs text-gray-500 leading-relaxed">Outputs from earlier tools shown as reference hints on the canvas.</p>
              {[
                ['Problem statement', 'problemStatement', 'Your team\'s defined problem statement…', true],
                ['HMW statement', 'hmwStatement', 'How Might We…', true],
                ['Primary stakeholder', 'primaryStakeholder', 'e.g. Smallholder farmers in Kolar district', false],
              ].map(([label, key, ph, isTextarea]) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</label>
                  {isTextarea
                    ? <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-300 placeholder-gray-600 resize-none focus:outline-none focus:border-pink-500/40 transition-all" rows={2} placeholder={ph} value={ctx[key]} onChange={e => setCtx(c => ({ ...c, [key]: e.target.value }))} />
                    : <input className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-pink-500/40 transition-all" placeholder={ph} value={ctx[key]} onChange={e => setCtx(c => ({ ...c, [key]: e.target.value }))} />
                  }
                </div>
              ))}
            </div>
          )}

          <button onClick={handleStart}
            disabled={!form.teamName.trim() || !form.projectName.trim()}
            className="w-full btn-primary py-3.5 text-base disabled:opacity-30 disabled:cursor-not-allowed">
            Open ExO Canvas →
          </button>
          <p className="text-xs text-gray-600 text-center mt-4">Session only · No data saved to server</p>
        </div>
      </div>
    </div>
  )
}
