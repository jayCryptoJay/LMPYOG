export type Pillar =
  | "Didn't Tell You"
  | 'Follow the Money'
  | 'Caught Lacking'
  | 'Rapid Fire'
  | 'Receipts'

export type StoryStatus = 'Raw' | 'Researching' | 'Scripted' | 'Filmed' | 'Published'

export type ScriptStatus = 'Draft' | 'Voice Checked' | 'Final'

export type DemonRisk = 'green' | 'yellow' | 'red'

export type ReceiptType = 'FARA' | 'Court' | 'FEC' | 'SEC' | 'FOIA' | '990' | 'USASpending' | 'Congress' | 'Other'

export interface Story {
  slug: string
  title: string
  pillar: Pillar
  heat: number
  status: StoryStatus
  sources: string[]
  angle: string
  demon_risk: DemonRisk
  created: string
  content: string
}

export interface Script {
  slug: string
  title: string
  story: string
  status: ScriptStatus
  word_count: number
  demon_risk: DemonRisk
  created: string
  content: string
  folder: 'drafts' | 'final' | 'templates'
}

export interface Receipt {
  slug: string
  filename: string
  type: ReceiptType
  claim: string
  verdict: string
  linked_stories: string[]
  source_url: string
  created: string
  content: string
}

export interface SkillRun {
  id: string
  skill: string
  input: string
  prompt: string
  timestamp: string
}

export interface Stats {
  storiesInVault: number
  scriptsInProgress: number
  readyToRecord: number
  publishedThisMonth: number
  weekNumber: number
  shippedThisWeek: number
}

export const PILLARS: Pillar[] = [
  "Didn't Tell You",
  'Follow the Money',
  'Caught Lacking',
  'Rapid Fire',
  'Receipts',
]

export const STORY_STATUSES: StoryStatus[] = ['Raw', 'Researching', 'Scripted', 'Filmed', 'Published']

export const SCRIPT_STATUSES: ScriptStatus[] = ['Draft', 'Voice Checked', 'Final']

export const DEMON_RISKS: DemonRisk[] = ['green', 'yellow', 'red']

export const RECEIPT_TYPES: ReceiptType[] = [
  'FARA', 'Court', 'FEC', 'SEC', 'FOIA', '990', 'USASpending', 'Congress', 'Other'
]

export const PILLAR_COLORS: Record<Pillar, string> = {
  "Didn't Tell You": 'bg-purple-950 text-purple-300 border border-purple-800/60',
  'Follow the Money': 'bg-emerald-950 text-emerald-300 border border-emerald-800/60',
  'Caught Lacking':   'bg-orange-950 text-orange-300 border border-orange-800/60',
  'Rapid Fire':       'bg-blue-950 text-blue-300 border border-blue-800/60',
  'Receipts':         'bg-yellow-950 text-yellow-300 border border-yellow-800/60',
}

export const STATUS_COLORS: Record<StoryStatus, string> = {
  Raw:         'bg-zinc-900 text-zinc-400 border border-zinc-700',
  Researching: 'bg-blue-950 text-blue-300 border border-blue-800/60',
  Scripted:    'bg-purple-950 text-purple-300 border border-purple-800/60',
  Filmed:      'bg-orange-950 text-orange-300 border border-orange-800/60',
  Published:   'bg-green-950 text-green-300 border border-green-800/60',
}

export const RISK_COLORS: Record<DemonRisk, string> = {
  green:  'bg-green-950 text-green-400 border border-green-800/60',
  yellow: 'bg-yellow-950 text-hazard border border-yellow-700/60',
  red:    'bg-red-950 text-red-400 border border-red-800/60',
}
