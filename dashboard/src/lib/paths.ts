import path from 'path'

// Auto-detect lmpyog root: dashboard/ is one level inside lmpyog/
// Override via LMPYOG_ROOT env var if you move the dashboard folder
export const LMPYOG_ROOT = (() => {
  if (process.env.LMPYOG_ROOT) {
    return path.resolve(process.env.LMPYOG_ROOT)
  }
  return path.resolve(process.cwd(), '..')
})()

export const PATHS = {
  root: LMPYOG_ROOT,
  storyVault: path.join(LMPYOG_ROOT, 'research', 'story-vault'),
  primaryDocs: path.join(LMPYOG_ROOT, 'research', 'primary-docs'),
  weeklyBriefs: path.join(LMPYOG_ROOT, 'research', 'weekly-briefs'),
  scriptsDrafts: path.join(LMPYOG_ROOT, 'scripts', 'drafts'),
  scriptsFinal: path.join(LMPYOG_ROOT, 'scripts', 'final'),
  scriptsTemplates: path.join(LMPYOG_ROOT, 'scripts', 'templates'),
  skills: path.join(LMPYOG_ROOT, 'skills'),
  voiceSamples: path.join(LMPYOG_ROOT, 'reference', 'voice-samples'),
  claudeMd: path.join(LMPYOG_ROOT, '.claude', 'CLAUDE.md'),
  publishing: path.join(LMPYOG_ROOT, 'publishing'),
  anchorTemplate: path.join(LMPYOG_ROOT, 'scripts', 'templates', 'anchor-format.md'),
  stateDir: path.join(process.cwd(), '.state'),
  runsFile: path.join(process.cwd(), '.state', 'runs.json'),
} as const
