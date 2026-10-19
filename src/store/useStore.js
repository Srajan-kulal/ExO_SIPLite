import { create } from 'zustand'

// ── ExO Attribute Definitions ────────────────────────────────────
// SCALE = external mechanisms (right side of canvas)
// IDEAS = internal mechanisms (left side of canvas)
// MTP   = centre — the Massive Transformative Purpose

export const MTP_DEF = {
  id: 'mtp',
  label: 'Massive Transformative Purpose',
  acronym: 'MTP',
  color: '#eab308',
  bg: '#1c1a05',
  border: '#854d0e',
  hint: 'The MTP is the north star of your ExO — a bold, aspirational statement about the change your organisation exists to create. It should be massive (world-scale ambition), transformative (changes the status quo fundamentally), and purposeful (emotionally compelling). Examples: "Organize the world\'s information" · "Make clean energy too cheap to meter" · "Democratize education for the world."',
  placeholder: 'Write your Massive Transformative Purpose — bold, aspirational, world-scale…',
  maxChars: 300,
  order: 0,
}

export const SCALE_ATTRS = [
  {
    id: 'staff_on_demand',
    label: 'Staff on Demand',
    acronym: 'S',
    group: 'SCALE',
    color: '#ec4899',
    bg: '#1a0510',
    border: '#9d174d',
    hint: 'Use a network of on-demand, external talent rather than full-time employees. Hire and release specialists as needs arise — freelancers, gig workers, crowdsourced contributors. How does your ExO access talent without owning it?',
    placeholder: 'How do you access the talent you need without full-time headcount? (e.g. freelancers, gig platforms, community contributors)',
    maxChars: 500,
    order: 1,
  },
  {
    id: 'community_crowd',
    label: 'Community & Crowd',
    acronym: 'C',
    group: 'SCALE',
    color: '#f472b6',
    bg: '#1a0510',
    border: '#9d174d',
    hint: 'Build and leverage a passionate community around your MTP. Go beyond users — create co-creators, advocates, and contributors. The crowd can generate ideas, test products, provide funding, and amplify reach. Who is your community and how do you activate them?',
    placeholder: 'Who is your community? How do they co-create, contribute to, or amplify your ExO beyond just using it?',
    maxChars: 500,
    order: 2,
  },
  {
    id: 'algorithms',
    label: 'Algorithms',
    acronym: 'A',
    group: 'SCALE',
    color: '#ec4899',
    bg: '#1a0510',
    border: '#9d174d',
    hint: 'Use machine learning, AI, and automated decision-making to scale operations without scaling headcount. Algorithms allow personalisation, prediction, and optimisation at scale. What decisions in your organisation could be automated or enhanced by algorithms?',
    placeholder: 'What processes, decisions, or personalisation in your ExO are automated by algorithms or AI?',
    maxChars: 500,
    order: 3,
  },
  {
    id: 'leveraged_assets',
    label: 'Leveraged Assets',
    acronym: 'L',
    group: 'SCALE',
    color: '#f472b6',
    bg: '#1a0510',
    border: '#9d174d',
    hint: 'Access and use assets without owning them — physical infrastructure, equipment, data, or IP. ExOs are asset-light: they rent, share, or borrow what they need. What assets does your ExO access without owning? (Think Airbnb, Uber — they don\'t own rooms or cars.)',
    placeholder: 'What key assets does your ExO use without owning? How do you access infrastructure, data, or IP on demand?',
    maxChars: 500,
    order: 4,
  },
  {
    id: 'engagement',
    label: 'Engagement',
    acronym: 'E',
    group: 'SCALE',
    color: '#ec4899',
    bg: '#1a0510',
    border: '#9d174d',
    hint: 'Use reputation systems, gamification, incentive competitions, and digital feedback loops to drive loyalty and participation. Engagement mechanisms make external stakeholders want to contribute and return. How do you keep your community and users deeply engaged and intrinsically motivated?',
    placeholder: 'What gamification, reputation systems, competitions, or feedback loops keep your users and community engaged?',
    maxChars: 500,
    order: 5,
  },
]

export const IDEAS_ATTRS = [
  {
    id: 'interfaces',
    label: 'Interfaces',
    acronym: 'I',
    group: 'IDEAS',
    color: '#60a5fa',
    bg: '#050d1a',
    border: '#1e40af',
    hint: 'Custom processes and platforms that bridge your SCALE external mechanisms with your internal operations. Interfaces are the filtering and matchmaking layers — they convert external abundance into internal value. Examples: an algorithm that matches crowd contributions to internal needs, or an API that connects external partners to your platform.',
    placeholder: 'What custom processes or platforms connect your external SCALE mechanisms to your internal operations?',
    maxChars: 500,
    order: 6,
  },
  {
    id: 'dashboards',
    label: 'Dashboards',
    acronym: 'D',
    group: 'IDEAS',
    color: '#3b82f6',
    bg: '#050d1a',
    border: '#1e40af',
    hint: 'Real-time, OKR-based metrics accessible to everyone in the organisation. ExOs track a small number of high-signal metrics in real time — not vanity metrics, but leading indicators of growth and health. What are the 3–5 metrics your ExO tracks in real time, and who has access to them?',
    placeholder: 'What are your 3–5 most important real-time metrics? Who sees them? How are they tracked?',
    maxChars: 500,
    order: 7,
  },
  {
    id: 'experimentation',
    label: 'Experimentation',
    acronym: 'E',
    group: 'IDEAS',
    color: '#60a5fa',
    bg: '#050d1a',
    border: '#1e40af',
    hint: 'A culture and process of constant, low-cost experimentation. ExOs embrace failure as data — they run many small experiments rather than big bets. Think A/B testing, minimum viable products, and rapid iteration. How does your ExO systematically test assumptions, iterate quickly, and learn from failure?',
    placeholder: 'How does your ExO run experiments? What is your process for testing assumptions, failing fast, and iterating?',
    maxChars: 500,
    order: 8,
  },
  {
    id: 'autonomy',
    label: 'Autonomy',
    acronym: 'A',
    group: 'IDEAS',
    color: '#3b82f6',
    bg: '#050d1a',
    border: '#1e40af',
    hint: 'Self-organising, multidisciplinary teams that operate with minimal management overhead. ExOs use flat hierarchies, holocracy, or pods — small teams with clear accountability and the freedom to execute. How is your organisation structured to enable fast, autonomous decision-making at every level?',
    placeholder: 'How are your teams structured? What is the decision-making model that allows speed and autonomy?',
    maxChars: 500,
    order: 9,
  },
  {
    id: 'social_technologies',
    label: 'Social Technologies',
    acronym: 'S',
    group: 'IDEAS',
    color: '#60a5fa',
    bg: '#050d1a',
    border: '#1e40af',
    hint: 'Use collaborative tools and social platforms to enable real-time communication, knowledge sharing, and co-creation inside the organisation. This creates a culture of radical transparency and rapid information flow. What internal social tools, platforms, or practices enable collaboration and transparency in your ExO?',
    placeholder: 'What internal tools, platforms, or practices enable collaboration, transparency, and fast knowledge sharing?',
    maxChars: 500,
    order: 10,
  },
]

export const ALL_ATTRS = [MTP_DEF, ...SCALE_ATTRS, ...IDEAS_ATTRS]

// ── Store ─────────────────────────────────────────────────────────
const emptyBlocks = () => Object.fromEntries(ALL_ATTRS.map(a => [a.id, { content: '' }]))

export const useStore = create((set, get) => ({
  // Meta
  teamName: '',
  projectName: '',
  mentorName: '',
  status: 'draft',
  submittedAt: null,
  lastSavedAt: null,
  setMeta: (meta) => set(meta),

  // Context from prior SIP Lite tools
  context: { problemStatement: '', hmwStatement: '', primaryStakeholder: '' },
  setContext: (ctx) => set(s => ({ context: { ...s.context, ...ctx } })),

  // Blocks
  blocks: emptyBlocks(),
  updateBlock: (id, value) => set(s => ({
    blocks: { ...s.blocks, [id]: { content: value } },
    lastSavedAt: new Date().toISOString(),
  })),

  // Derived
  getStatus: (id) => {
    const c = get().blocks[id]?.content?.trim() || ''
    if (c.length === 0) return 'empty'
    if (c.length >= 20) return 'complete'
    return 'partial'
  },
  getCompletionCount: () => {
    const blocks = get().blocks
    return ALL_ATTRS.filter(a => blocks[a.id]?.content?.trim().length >= 20).length
  },
  canSubmit: () => {
    const blocks = get().blocks
    // MTP + at least 3 SCALE + at least 3 IDEAS required
    const mtpOk = blocks['mtp']?.content?.trim().length >= 20
    const scaleOk = SCALE_ATTRS.filter(a => blocks[a.id]?.content?.trim().length >= 20).length >= 3
    const ideasOk = IDEAS_ATTRS.filter(a => blocks[a.id]?.content?.trim().length >= 20).length >= 3
    return mtpOk && scaleOk && ideasOk
  },

  submit: () => set({ status: 'submitted', submittedAt: new Date().toISOString() }),
  reset: () => set({
    teamName: '', projectName: '', mentorName: '',
    status: 'draft', submittedAt: null, lastSavedAt: null,
    blocks: emptyBlocks(),
    context: { problemStatement: '', hmwStatement: '', primaryStakeholder: '' },
  }),

  // UI
  activeAttr: null,
  showHints: true,
  showContext: true,
  activeTab: 'canvas', // 'canvas' | 'scale' | 'ideas'
  setActiveAttr: (id) => set({ activeAttr: id }),
  toggleHints: () => set(s => ({ showHints: !s.showHints })),
  toggleContext: () => set(s => ({ showContext: !s.showContext })),
  setTab: (tab) => set({ activeTab: tab }),
}))
