// Seasonal data tailored for Emilia-Romagna / Bologna plain (Northern Italy).
// Sources: consolidated seasonal norms for Italy; adapted for local availability.
// Names are in Italian to match local markets.

export function getData() {
  return { months }
}

export function monthIndexFromInput(input) {
  if (typeof input === 'number') {
    // already 0-11
    return Math.max(0, Math.min(11, input))
  }
  if (input == null) return new Date().getMonth()
  const raw = String(input).trim().toLowerCase()
  const num = Number(raw)
  if (!Number.isNaN(num)) {
    const idx = (num - 1) | 0
    if (idx >= 0 && idx <= 11) return idx
  }
  const m = MONTHS_MAP.get(raw)
  if (m != null) return m
  console.error('Unrecognized month:', input)
  process.exit(2)
}

export function monthNameIt(idx) {
  return MONTHS_IT[idx]
}

export function detectSeason(monthIdx) {
  if ([11, 0, 1].includes(monthIdx)) return 'winter'
  if ([2, 3, 4].includes(monthIdx)) return 'spring'
  if ([5, 6, 7].includes(monthIdx)) return 'summer'
  if ([8, 9, 10].includes(monthIdx)) return 'autumn'
  return ''
}

const MONTHS_IT = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
]

const MONTHS_MAP = new Map([
  // English
  ['january', 0],
  ['february', 1],
  ['march', 2],
  ['april', 3],
  ['may', 4],
  ['june', 5],
  ['july', 6],
  ['august', 7],
  ['september', 8],
  ['october', 9],
  ['november', 10],
  ['december', 11],
  // Italian
  ['gennaio', 0],
  ['febbraio', 1],
  ['marzo', 2],
  ['aprile', 3],
  ['maggio', 4],
  ['giugno', 5],
  ['luglio', 6],
  ['agosto', 7],
  ['settembre', 8],
  ['ottobre', 9],
  ['novembre', 10],
  ['dicembre', 11],
  // Abbreviations
  ['jan', 0],
  ['feb', 1],
  ['mar', 2],
  ['apr', 3],
  ['may', 4],
  ['jun', 5],
  ['jul', 6],
  ['aug', 7],
  ['sep', 8],
  ['sept', 8],
  ['oct', 9],
  ['nov', 10],
  ['dec', 11],
  ['gen', 0],
  ['feb', 1],
  ['mar', 2],
  ['apr', 3],
  ['mag', 4],
  ['giu', 5],
  ['lug', 6],
  ['ago', 7],
  ['set', 8],
  ['ott', 9],
  ['nov', 10],
  ['dic', 11],
])

// Month-by-month lists (not exhaustive, but locally realistic)
const months = [
  // Gennaio
  {
    fruits: [
      'arance',
      'mandarini',
      'clementine',
      'pompelmi',
      'kiwi',
      'mele',
      'pere',
    ],
    vegetables: [
      'cavoli',
      'cavolfiore',
      'broccoli',
      'finocchi',
      'porri',
      'bietole',
      'spinaci',
      'radicchio',
      'carote',
      'patate',
    ],
  },
  // Febbraio
  {
    fruits: ['arance', 'mandarini', 'kiwi', 'mele', 'pere', 'limoni'],
    vegetables: [
      'cavoli',
      'cavolfiore',
      'broccoli',
      'finocchi',
      'porri',
      'radicchio',
      'bietole',
      'carote',
      'patate',
    ],
  },
  // Marzo
  {
    fruits: ['kiwi', 'mele tardive', 'pere tardive', 'limoni'],
    vegetables: [
      'asparagi',
      'carciofi',
      'spinaci',
      'bietole',
      'lattuga',
      'ravanelli',
      'piselli',
      'cavolfiore tardivo',
      'porri',
    ],
  },
  // Aprile
  {
    fruits: ['fragole', 'limoni'],
    vegetables: [
      'asparagi',
      'carciofi',
      'fave',
      'piselli',
      'spinaci',
      'lattuga',
      'cipollotti',
      'bietole',
    ],
  },
  // Maggio
  {
    fruits: ['fragole', 'ciliegie', 'nespole'],
    vegetables: [
      'asparagi',
      'zucchine',
      'fave',
      'piselli',
      'lattuga',
      'spinaci',
      'basilico',
      'carote',
      'patate novelle',
    ],
  },
  // Giugno
  {
    fruits: ['ciliegie', 'albicocche', 'pesche', 'fragole tardive', 'meloni'],
    vegetables: [
      'zucchine',
      'fagiolini',
      'pomodori',
      'melanzane',
      'peperoni',
      'cetrioli',
      'insalate',
      'bietole',
    ],
  },
  // Luglio
  {
    fruits: ['pesche', 'albicocche', 'susine', 'meloni', 'angurie', 'more'],
    vegetables: [
      'pomodori',
      'zucchine',
      'melanzane',
      'peperoni',
      'fagiolini',
      'cetrioli',
      'insalate',
      'basilico',
    ],
  },
  // Agosto
  {
    fruits: ['pesche', 'susine', 'fichi', 'angurie', 'meloni', 'uva precoce'],
    vegetables: [
      'pomodori',
      'melanzane',
      'peperoni',
      'zucchine',
      'fagiolini',
      'bietole',
      'insalate',
    ],
  },
  // Settembre
  {
    fruits: [
      'uva',
      'fichi',
      'mele nuove',
      'pere nuove',
      'susine tardive',
      'more tardive',
    ],
    vegetables: [
      'pomodori',
      'zucchine tardive',
      'peperoni',
      'melanzane',
      'zucca',
      'bietole',
      'insalate',
      'fagiolini',
    ],
  },
  // Ottobre
  {
    fruits: ['uva tardiva', 'mele', 'pere', 'cachi', 'melograni', 'castagne'],
    vegetables: [
      'zucca',
      'cavoli',
      'cavolfiore',
      'broccoli',
      'radicchio precoce',
      'porri',
      'bietole',
      'carote',
      'patate',
    ],
  },
  // Novembre
  {
    fruits: [
      'mele',
      'pere',
      'kiwi',
      'cachi',
      'melograni',
      'castagne',
      'agrumi iniziali',
    ],
    vegetables: [
      'cavoli',
      'cavolfiore',
      'broccoli',
      'finocchi',
      'radicchio',
      'porri',
      'bietole',
      'carote',
      'patate',
      'zucca',
    ],
  },
  // Dicembre
  {
    fruits: [
      'arance',
      'mandarini',
      'clementine',
      'pompelmi',
      'kiwi',
      'mele',
      'pere',
      'melograni tardivi',
    ],
    vegetables: [
      'cavoli',
      'cavolfiore',
      'broccoli',
      'finocchi',
      'radicchio',
      'porri',
      'bietole',
      'carote',
      'patate',
    ],
  },
]
