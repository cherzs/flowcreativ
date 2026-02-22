export const BUSINESS_CATEGORY_OPTIONS = [
  'Manufacturing',
  'Trading',
  'Service',
  'NGO',
] as const

export const INDUSTRY_OPTIONS = [
  'Manufacturing',
  'Distributor / Wholesaler',
  'Retail & E-commerce',
  'Service-Based Business',
  'NGO / Foundation',
  'Construction / Project-Based',
  'Professional Services',
] as const

export const COMPANY_SIZE_OPTIONS = [
  '1-10',
  '11-50',
  '51-200',
  '200+',
] as const

export const PAIN_POINT_OPTIONS = [
  'Inventory issues',
  'Manual approval',
  'Slow reporting',
  'Too many Excel files',
  'Data not integrated',
] as const

export type RecommendationLocale = 'id' | 'en'
export type BusinessCategory = (typeof BUSINESS_CATEGORY_OPTIONS)[number]
export type Industry = (typeof INDUSTRY_OPTIONS)[number]
export type CompanySize = (typeof COMPANY_SIZE_OPTIONS)[number]
export type PainPoint = (typeof PAIN_POINT_OPTIONS)[number]

export const INDUSTRY_OPTIONS_BY_CATEGORY: Record<BusinessCategory, Industry[]> = {
  Manufacturing: ['Manufacturing'],
  Trading: ['Distributor / Wholesaler', 'Retail & E-commerce'],
  Service: [
    'Service-Based Business',
    'Construction / Project-Based',
    'Professional Services',
  ],
  NGO: ['NGO / Foundation'],
}

export const BUSINESS_CATEGORY_LABELS: Record<
  RecommendationLocale,
  Record<BusinessCategory, string>
> = {
  en: {
    Manufacturing: 'Manufacturing',
    Trading: 'Trading',
    Service: 'Service',
    NGO: 'NGO',
  },
  id: {
    Manufacturing: 'Manufaktur',
    Trading: 'Perdagangan',
    Service: 'Jasa',
    NGO: 'NGO',
  },
}

export const INDUSTRY_LABELS: Record<
  RecommendationLocale,
  Record<Industry, string>
> = {
  en: {
    Manufacturing: 'Manufacturing',
    'Distributor / Wholesaler': 'Distributor / Wholesaler',
    'Retail & E-commerce': 'Retail & E-commerce',
    'Service-Based Business': 'Service-Based Business',
    'NGO / Foundation': 'NGO / Foundation',
    'Construction / Project-Based': 'Construction / Project-Based',
    'Professional Services': 'Professional Services',
  },
  id: {
    Manufacturing: 'Manufaktur',
    'Distributor / Wholesaler': 'Distributor / Grosir',
    'Retail & E-commerce': 'Ritel & E-commerce',
    'Service-Based Business': 'Bisnis Berbasis Jasa',
    'NGO / Foundation': 'NGO / Yayasan',
    'Construction / Project-Based': 'Konstruksi / Berbasis Proyek',
    'Professional Services': 'Jasa Profesional',
  },
}

export const PAIN_POINT_LABELS: Record<RecommendationLocale, Record<PainPoint, string>> = {
  en: {
    'Inventory issues': 'Inventory issues',
    'Manual approval': 'Manual approval',
    'Slow reporting': 'Slow reporting',
    'Too many Excel files': 'Too many Excel files',
    'Data not integrated': 'Data not integrated',
  },
  id: {
    'Inventory issues': 'Masalah inventori',
    'Manual approval': 'Approval manual',
    'Slow reporting': 'Pelaporan lambat',
    'Too many Excel files': 'Terlalu banyak file Excel',
    'Data not integrated': 'Data tidak terintegrasi',
  },
}

export type OdooRecommendation = {
  modules: string[]
  explanation: string
  priority: string[]
}

type RecommendationPreset = {
  modules: string[]
  explanation: Record<RecommendationLocale, string>
}

const INDUSTRY_BASE: Record<Industry, RecommendationPreset> = {
  Manufacturing: {
    modules: ['Inventory', 'Manufacturing (MRP)', 'Purchase', 'Quality'],
    explanation: {
      en: 'Manufacturing teams need strong inventory control, production planning, and procurement workflow.',
      id: 'Tim manufaktur membutuhkan kontrol inventori yang kuat, perencanaan produksi, dan alur pengadaan yang rapi.',
    },
  },
  'Distributor / Wholesaler': {
    modules: ['Inventory', 'Purchase', 'Sales', 'Approvals'],
    explanation: {
      en: 'Distribution businesses benefit from synchronized purchasing, stock movement control, and approval governance.',
      id: 'Bisnis distribusi diuntungkan oleh sinkronisasi pembelian, kontrol pergerakan stok, dan tata kelola approval.',
    },
  },
  'Retail & E-commerce': {
    modules: ['Point of Sale', 'eCommerce', 'Inventory', 'Sales', 'Accounting'],
    explanation: {
      en: 'Retail and e-commerce operations run best when omnichannel sales, inventory, and finance are connected in one workflow.',
      id: 'Operasi ritel dan e-commerce berjalan optimal ketika penjualan omnichannel, inventori, dan keuangan terhubung dalam satu workflow.',
    },
  },
  'Service-Based Business': {
    modules: ['Project', 'Timesheets', 'Accounting', 'Helpdesk'],
    explanation: {
      en: 'Service businesses require project visibility, billable effort tracking, and clean invoicing flow.',
      id: 'Bisnis jasa membutuhkan visibilitas proyek, pelacakan jam billable, dan alur invoicing yang rapi.',
    },
  },
  'NGO / Foundation': {
    modules: ['Accounting', 'Project', 'Analytic Accounting'],
    explanation: {
      en: 'NGOs and foundations need transparent fund tracking, project visibility, and analytic reporting by program.',
      id: 'NGO dan yayasan membutuhkan pelacakan dana yang transparan, visibilitas proyek, dan pelaporan analitik per program.',
    },
  },
  'Construction / Project-Based': {
    modules: ['Project', 'Purchase', 'Inventory', 'Timesheets', 'Accounting'],
    explanation: {
      en: 'Project-based construction teams need tight control of purchasing, stock consumption, progress tracking, and cost accounting.',
      id: 'Tim konstruksi berbasis proyek membutuhkan kontrol ketat pada pembelian, konsumsi material, tracking progres, dan akuntansi biaya.',
    },
  },
  'Professional Services': {
    modules: ['Project', 'Timesheets', 'CRM', 'Accounting'],
    explanation: {
      en: 'Professional services firms need strong pipeline visibility, project planning, time tracking, and invoicing discipline.',
      id: 'Perusahaan jasa profesional membutuhkan visibilitas pipeline, perencanaan proyek, pelacakan waktu, dan disiplin invoicing.',
    },
  },
}

const PAIN_POINT_BOOSTER: Record<PainPoint, RecommendationPreset> = {
  'Inventory issues': {
    modules: ['Inventory', 'Purchase'],
    explanation: {
      en: 'Your pain point indicates weak stock control and replenishment process.',
      id: 'Pain point ini menunjukkan kontrol stok dan proses replenishment yang masih lemah.',
    },
  },
  'Manual approval': {
    modules: ['Approvals'],
    explanation: {
      en: 'Approval bottlenecks can be reduced with configurable digital workflows.',
      id: 'Bottleneck approval dapat dikurangi dengan workflow digital yang terkonfigurasi.',
    },
  },
  'Slow reporting': {
    modules: ['Accounting', 'Spreadsheet (BI)'],
    explanation: {
      en: 'Slow reporting usually means data is scattered and dashboarding is not automated.',
      id: 'Pelaporan yang lambat biasanya menandakan data tersebar dan dashboard belum terotomasi.',
    },
  },
  'Too many Excel files': {
    modules: ['Documents', 'Project'],
    explanation: {
      en: 'Excel-heavy operations are a strong signal that process centralization is needed.',
      id: 'Operasional yang sangat bergantung pada Excel adalah sinyal kuat bahwa sentralisasi proses dibutuhkan.',
    },
  },
  'Data not integrated': {
    modules: ['CRM', 'Sales', 'Inventory'],
    explanation: {
      en: 'Disconnected data should be solved by moving core sales and operations into one integrated system.',
      id: 'Data yang terpisah perlu diselesaikan dengan menyatukan proses penjualan dan operasional ke sistem terintegrasi.',
    },
  },
}

const COMBINATION_OVERRIDES: Partial<
  Record<Industry, Partial<Record<PainPoint, RecommendationPreset>>>
> = {
  Manufacturing: {
    'Inventory issues': {
      modules: ['Inventory', 'Manufacturing (MRP)', 'Purchase'],
      explanation: {
        en: 'Manufacturing inventory issues are best handled by linking stock, production planning, and purchasing.',
        id: 'Masalah inventori pada manufaktur paling efektif ditangani dengan menghubungkan stok, perencanaan produksi, dan pembelian.',
      },
    },
  },
  'Distributor / Wholesaler': {
    'Manual approval': {
      modules: ['Purchase', 'Approvals', 'Inventory'],
      explanation: {
        en: 'Distributor approval delays are commonly fixed by combining purchase workflow with approval rules.',
        id: 'Keterlambatan approval pada distributor umumnya terselesaikan dengan menggabungkan workflow pembelian dan aturan approval.',
      },
    },
  },
  'Retail & E-commerce': {
    'Inventory issues': {
      modules: ['Point of Sale', 'Inventory', 'Purchase'],
      explanation: {
        en: 'Retail stock issues are reduced when POS transactions and inventory valuation update in real time.',
        id: 'Masalah stok retail berkurang saat transaksi POS dan valuasi inventori ter-update secara real time.',
      },
    },
  },
  'Service-Based Business': {
    'Too many Excel files': {
      modules: ['Project', 'Accounting', 'Documents'],
      explanation: {
        en: 'For service teams with heavy Excel usage, project and accounting centralization gives quick wins.',
        id: 'Untuk tim jasa yang sangat bergantung pada Excel, sentralisasi project dan accounting memberi quick wins.',
      },
    },
  },
  'Construction / Project-Based': {
    'Data not integrated': {
      modules: ['Project', 'Purchase', 'Inventory', 'Accounting'],
      explanation: {
        en: 'Project-based operations should connect procurement, inventory usage, and project costing in one integrated flow.',
        id: 'Operasional berbasis proyek sebaiknya menghubungkan pengadaan, penggunaan material, dan costing proyek dalam satu alur terintegrasi.',
      },
    },
  },
  'Professional Services': {
    'Slow reporting': {
      modules: ['Timesheets', 'Project', 'Accounting'],
      explanation: {
        en: 'Professional services reporting improves when time entries, project progress, and financial data are captured in one system.',
        id: 'Pelaporan jasa profesional meningkat ketika time entry, progres proyek, dan data keuangan dicatat dalam satu sistem.',
      },
    },
  },
}

const SIZE_NOTE: Record<RecommendationLocale, Record<CompanySize, string>> = {
  en: {
    '1-10':
      'For your size, start with a lean rollout to keep adoption fast and training effort light.',
    '11-50':
      'For your size, implement in two phases: core operations first, then reporting and optimization.',
    '51-200':
      'For your size, plan by department and assign internal champions for smoother cross-team adoption.',
    '200+':
      'For enterprise scale, include governance, formal change management, and staged deployment by business unit.',
  },
  id: {
    '1-10':
      'Untuk skala ini, mulai dari rollout yang lean agar adopsi lebih cepat dan kebutuhan training tetap ringan.',
    '11-50':
      'Untuk skala ini, implementasi terbaik dilakukan dalam dua fase: proses inti dulu, lalu reporting dan optimasi.',
    '51-200':
      'Untuk skala ini, rencanakan per departemen dan tunjuk champion internal agar adopsi lintas tim lebih mulus.',
    '200+':
      'Untuk skala enterprise, sertakan governance, change management formal, dan deployment bertahap per unit bisnis.',
  },
}

const PRIORITY_LIMIT: Record<CompanySize, number> = {
  '1-10': 2,
  '11-50': 3,
  '51-200': 4,
  '200+': 4,
}

function mergeModules(primary: string[], secondary: string[]): string[] {
  const merged = [...primary]
  for (const module of secondary) {
    if (!merged.includes(module)) {
      merged.push(module)
    }
  }
  return merged
}

export function isIndustryInCategory(
  category: BusinessCategory,
  industry: Industry,
): boolean {
  return INDUSTRY_OPTIONS_BY_CATEGORY[category].includes(industry)
}

function withSizeContext(
  recommendation: {
    modules: string[]
    explanation: string
  },
  size: CompanySize,
  locale: RecommendationLocale,
): OdooRecommendation {
  let modules = [...recommendation.modules]

  if (size === '200+' && !modules.includes('Approvals')) {
    modules = mergeModules(modules, ['Approvals'])
  }

  return {
    modules,
    explanation: `${recommendation.explanation} ${SIZE_NOTE[locale][size]}`,
    priority: modules.slice(0, PRIORITY_LIMIT[size]),
  }
}

export function getOdooRecommendation(
  industry: Industry,
  size: CompanySize,
  painPoint: PainPoint,
  locale: RecommendationLocale = 'en',
): OdooRecommendation {
  if (industry === 'NGO / Foundation') {
    return withSizeContext(
      {
        modules: INDUSTRY_BASE['NGO / Foundation'].modules,
        explanation: INDUSTRY_BASE['NGO / Foundation'].explanation[locale],
      },
      size,
      locale,
    )
  }

  const override = COMBINATION_OVERRIDES[industry]?.[painPoint]
  const base = override ?? INDUSTRY_BASE[industry]
  const painPointBooster = PAIN_POINT_BOOSTER[painPoint]

  const modules = mergeModules(base.modules, painPointBooster.modules)
  const explanation = override
    ? base.explanation[locale]
    : `${base.explanation[locale]} ${painPointBooster.explanation[locale]}`

  return withSizeContext({ modules, explanation }, size, locale)
}
