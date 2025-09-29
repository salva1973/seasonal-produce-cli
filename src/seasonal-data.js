import fs from 'node:fs'
import path from 'node:path'

// Loads bilingual seasonal data from JSON files.
// Default dataset = our curated Bologna/Northern Italy list (as provided earlier).
// Alt dataset = a regional/institutional-flavored variant derived from public calendars.

export function getData(source = 'default') {
  const file =
    source === 'regional'
      ? path.resolve(
          new URL('./', import.meta.url).pathname,
          '../data/seasonal-regional.json'
        )
      : path.resolve(
          new URL('./', import.meta.url).pathname,
          '../data/seasonal-default.json'
        )
  const raw = fs.readFileSync(file, 'utf8')
  const data = JSON.parse(raw)
  return data
}

export function monthIndexFromInput(input) {
  if (typeof input === 'number') {
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

export function monthName(idx, lang = 'it') {
  return (lang === 'en' ? MONTHS_EN : MONTHS_IT)[idx]
}

export function detectSeason(monthIdx) {
  if ([11, 0, 1].includes(monthIdx)) return 'winter'
  if ([2, 3, 4].includes(monthIdx)) return 'spring'
  if ([5, 6, 7].includes(monthIdx)) return 'summer'
  if ([8, 9, 10].includes(monthIdx)) return 'autumn'
  return ''
}

export function t(key, lang = 'it') {
  const map = {
    FRUIT: { it: 'FRUTTA', en: 'FRUIT' },
    VEGETABLES: { it: 'VERDURA', en: 'VEGETABLES' },
    SEASON: { it: 'Stagione', en: 'Season' },
    MONTH: { it: 'Mese', en: 'Month' },
    LOCATION: {
      it: 'Bologna (Italia Settentrionale)',
      en: 'Bologna (Northern Italy)',
    },
    WINTER: { it: 'Inverno', en: 'Winter' },
    SPRING: { it: 'Primavera', en: 'Spring' },
    SUMMER: { it: 'Estate', en: 'Summer' },
    AUTUMN: { it: 'Autunno', en: 'Autumn' },
  }
  return (map[key] && map[key][lang]) || key
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

const MONTHS_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
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
  // Abbreviations EN
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
  // Abbreviations IT
  ['gen', 0],
  ['mag', 4],
  ['giu', 5],
  ['lug', 6],
  ['ago', 7],
  ['set', 8],
  ['ott', 9],
  ['nov', 10],
  ['dic', 11],
])
