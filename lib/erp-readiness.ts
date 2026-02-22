export const EMPLOYEE_OPTIONS = ['1-10', '11-50', '51-200', '200+'] as const

export const CURRENT_SYSTEM_OPTIONS = [
  'Manual spreadsheets',
  'Standalone apps',
  'Partially integrated ERP',
  'Integrated ERP',
] as const

export const CHALLENGE_OPTIONS = [
  'Inventory visibility gaps',
  'Manual approval delays',
  'Slow reporting cycle',
  'Too many Excel files',
  'Data not integrated',
] as const

export const DEPARTMENT_OPTIONS = ['1-2', '3-5', '6-10', '10+'] as const

export type ReadinessLocale = 'id' | 'en'
export type EmployeeRange = (typeof EMPLOYEE_OPTIONS)[number]
export type CurrentSystem = (typeof CURRENT_SYSTEM_OPTIONS)[number]
export type ERPChallenge = (typeof CHALLENGE_OPTIONS)[number]
export type DepartmentRange = (typeof DEPARTMENT_OPTIONS)[number]

export type ERPReadinessInput = {
  employees: EmployeeRange
  currentSystem: CurrentSystem
  challenges: ERPChallenge[]
  departments: DepartmentRange
}

export type ERPReadinessResult = {
  score: number
  level: 'Low' | 'Moderate' | 'High'
  summary: string
}

export const CURRENT_SYSTEM_LABELS: Record<
  ReadinessLocale,
  Record<CurrentSystem, string>
> = {
  en: {
    'Manual spreadsheets': 'Manual spreadsheets',
    'Standalone apps': 'Standalone apps',
    'Partially integrated ERP': 'Partially integrated ERP',
    'Integrated ERP': 'Integrated ERP',
  },
  id: {
    'Manual spreadsheets': 'Spreadsheet manual',
    'Standalone apps': 'Aplikasi terpisah',
    'Partially integrated ERP': 'ERP terintegrasi sebagian',
    'Integrated ERP': 'ERP terintegrasi penuh',
  },
}

export const CHALLENGE_LABELS: Record<ReadinessLocale, Record<ERPChallenge, string>> = {
  en: {
    'Inventory visibility gaps': 'Inventory visibility gaps',
    'Manual approval delays': 'Manual approval delays',
    'Slow reporting cycle': 'Slow reporting cycle',
    'Too many Excel files': 'Too many Excel files',
    'Data not integrated': 'Data not integrated',
  },
  id: {
    'Inventory visibility gaps': 'Visibilitas inventori kurang',
    'Manual approval delays': 'Approval manual lambat',
    'Slow reporting cycle': 'Siklus reporting lambat',
    'Too many Excel files': 'Terlalu banyak file Excel',
    'Data not integrated': 'Data tidak terintegrasi',
  },
}

const EMPLOYEE_SCORE: Record<EmployeeRange, number> = {
  '1-10': 8,
  '11-50': 12,
  '51-200': 16,
  '200+': 20,
}

const SYSTEM_SCORE: Record<CurrentSystem, number> = {
  'Manual spreadsheets': 8,
  'Standalone apps': 16,
  'Partially integrated ERP': 26,
  'Integrated ERP': 35,
}

const DEPARTMENT_SCORE: Record<DepartmentRange, number> = {
  '1-2': 8,
  '3-5': 12,
  '6-10': 16,
  '10+': 20,
}

const CHALLENGE_SCORE: Record<ERPChallenge, number> = {
  'Inventory visibility gaps': 5,
  'Manual approval delays': 5,
  'Slow reporting cycle': 4,
  'Too many Excel files': 5,
  'Data not integrated': 8,
}

function getLevel(score: number): ERPReadinessResult['level'] {
  if (score >= 70) return 'High'
  if (score >= 40) return 'Moderate'
  return 'Low'
}

function buildSummary(
  level: ERPReadinessResult['level'],
  highlightedChallenges: ERPChallenge[],
  locale: ReadinessLocale,
): string {
  const labels = CHALLENGE_LABELS[locale]
  const localizedChallenges = highlightedChallenges.map(
    (challenge) => labels[challenge],
  )

  const challengeText =
    localizedChallenges.length > 0
      ? locale === 'id'
        ? `Sinyal isu prioritas meliputi ${localizedChallenges.join(', ')}.`
        : `Priority issue signals include ${localizedChallenges.join(', ')}.`
      : locale === 'id'
        ? 'Belum ada tantangan dominan yang dipilih.'
        : 'No dominant challenge was selected.'

  if (level === 'High') {
    return locale === 'id'
      ? `Organisasi Anda menunjukkan readiness ERP yang kuat dan siap masuk ke perencanaan implementasi terstruktur. ${challengeText} Fokus tahap berikutnya pada governance rollout bertahap dan pelacakan KPI.`
      : `Your organization shows strong ERP readiness and can move into structured implementation planning. ${challengeText} Focus next on phased rollout governance and KPI tracking.`
  }

  if (level === 'Moderate') {
    return locale === 'id'
      ? `Organisasi Anda sudah memiliki fondasi yang cukup untuk adopsi ERP, namun alignment proses masih perlu diperkuat sebelum rollout penuh. ${challengeText} Mulai dari modul inti dengan rencana change management yang terkontrol.`
      : `Your organization has a workable foundation for ERP adoption, but process alignment still needs improvement before full rollout. ${challengeText} Start with core modules and a controlled change-management plan.`
  }

  return locale === 'id'
    ? `Organisasi Anda berada pada tahap awal readiness ERP. ${challengeText} Mulailah dengan standardisasi proses, pemetaan ownership, dan pembersihan data sebelum implementasi.`
    : `Your organization is at an early ERP readiness stage. ${challengeText} Begin with process standardization, ownership mapping, and data cleanup before implementation.`
}

export function calculateReadinessScore(
  data: ERPReadinessInput,
  locale: ReadinessLocale = 'en',
): ERPReadinessResult {
  const employeeScore = EMPLOYEE_SCORE[data.employees]
  const systemScore = SYSTEM_SCORE[data.currentSystem]
  const departmentScore = DEPARTMENT_SCORE[data.departments]

  const uniqueChallenges = Array.from(new Set(data.challenges))
  const challengeRaw = uniqueChallenges.reduce((total, challenge) => {
    return total + CHALLENGE_SCORE[challenge]
  }, 0)
  const challengeScore = Math.min(25, challengeRaw)

  const score = Math.max(
    0,
    Math.min(100, employeeScore + systemScore + departmentScore + challengeScore),
  )
  const level = getLevel(score)
  const highlightedChallenges = uniqueChallenges.slice(0, 2)
  const summary = buildSummary(level, highlightedChallenges, locale)

  return {
    score,
    level,
    summary,
  }
}
