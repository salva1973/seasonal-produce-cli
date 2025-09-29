import {
  getData,
  monthIndexFromInput,
  monthName,
  detectSeason,
  t,
} from './seasonal-data.js'

const HELP = `
Seasonal Produce — Bologna (Northern Italy)

Usage:
  seasonal-produce                     # current month (Europe/Rome)
  seasonal-produce --season SUMMER
  seasonal-produce --month august
  seasonal-produce --month 9

Options:
  -m, --month <name|number>   Month (EN/IT name or 1-12)
  -s, --season <name>         Season: winter, spring, summer, autumn
  -f, --format <fmt>          Output: table (default) | json
  -l, --lang <it|en>          Language (default it)
  --source <default|regional> Dataset (default=default)
  -h, --help                  Show help
`

export async function main() {
  const argv = process.argv.slice(2)
  if (argv.includes('-h') || argv.includes('--help')) {
    console.log(HELP)
    return
  }

  const fmt = pickOption(argv, ['-f', '--format']) || 'table'
  const lang = (pickOption(argv, ['-l', '--lang']) || 'it').toLowerCase()
  const source = (pickOption(argv, ['--source']) || 'default').toLowerCase()
  const seasonOpt = (pickOption(argv, ['-s', '--season']) || '').toLowerCase()
  const monthOptRaw = pickOption(argv, ['-m', '--month'])

  const now = new Date()
  const tzNow = new Date(
    now.toLocaleString('en-GB', { timeZone: 'Europe/Rome' })
  )

  const monthIdx = monthIndexFromInput(monthOptRaw ?? tzNow.getMonth())
  const season = seasonOpt || detectSeason(monthIdx)

  const data = getData(source)

  if (seasonOpt && !['winter', 'spring', 'summer', 'autumn'].includes(season)) {
    console.error('Unknown season. Use: winter, spring, summer, autumn')
    process.exit(2)
  }

  if (fmt !== 'json' && fmt !== 'table') {
    console.error('Invalid format. Use: table | json')
    process.exit(2)
  }

  if (!['it', 'en'].includes(lang)) {
    console.error('Invalid language. Use: it | en')
    process.exit(2)
  }

  const langKey = lang === 'en' ? 'en' : 'it'

  if (monthOptRaw != null) {
    const monthData = data.months[monthIdx]
    const fruits = monthData.fruits[langKey]
    const vegetables = monthData.vegetables[langKey]
    output({
      scope: `${t('MONTH', lang)}: ${monthName(monthIdx, lang)} — ${t(
        'LOCATION',
        lang
      )}`,
      fruits,
      vegetables,
      format: fmt,
      lang,
      source,
    })
    return
  }

  const seasonMonths = monthsForSeason(season)
  const acc = { fruits: new Set(), vegetables: new Set() }
  for (const mi of seasonMonths) {
    for (const f of data.months[mi].fruits[langKey]) acc.fruits.add(f)
    for (const v of data.months[mi].vegetables[langKey]) acc.vegetables.add(v)
  }
  output({
    scope: `${t('SEASON', lang)}: ${seasonLabel(season, lang)} — ${seasonMonths
      .map((i) => monthName(i, lang))
      .join(', ')} — ${t('LOCATION', lang)}`,
    fruits: [...acc.fruits].sort((a, b) => a.localeCompare(b, lang)),
    vegetables: [...acc.vegetables].sort((a, b) => a.localeCompare(b, lang)),
    format: fmt,
    lang,
    source,
  })
}

function pickOption(argv, names) {
  const i = argv.findIndex((a) => names.includes(a))
  if (i === -1) return undefined
  return argv[i + 1]
}

function monthsForSeason(season) {
  switch (season) {
    case 'winter':
      return [11, 0, 1] // Dec, Jan, Feb
    case 'spring':
      return [2, 3, 4] // Mar, Apr, May
    case 'summer':
      return [5, 6, 7] // Jun, Jul, Aug
    case 'autumn':
      return [8, 9, 10] // Sep, Oct, Nov
    default:
      return [new Date().getMonth()]
  }
}

function seasonLabel(s, lang) {
  const map = {
    winter: 'WINTER',
    spring: 'SPRING',
    summer: 'SUMMER',
    autumn: 'AUTUMN',
  }
  return t(map[s] || s, lang)
}

function output({ scope, fruits, vegetables, format, lang, source }) {
  if (format === 'json') {
    console.log(
      JSON.stringify(
        { scope, location: t('LOCATION', lang), source, fruits, vegetables },
        null,
        2
      )
    )
    return
  }

  console.log(`
${scope}
`)
  const lines = []
  const left = [t('FRUIT', lang)].concat(fruits)
  const right = [t('VEGETABLES', lang)].concat(vegetables)
  const colW = 28
  const rows = Math.max(left.length, right.length)

  const sep = '-'.repeat(colW) + '+' + '-'.repeat(colW + 2)
  console.log(sep)
  for (let i = 0; i < rows; i++) {
    const l = left[i] || ''
    const r = right[i] || ''
    console.log(pad(l, colW) + ' | ' + pad(r, colW))
    if (i === 0) console.log(sep)
  }
  console.log(sep)
}

function pad(s, w) {
  const t = s.toString()
  return t + ' '.repeat(Math.max(0, w - t.length))
}
