import {
  getData,
  monthIndexFromInput,
  monthNameIt,
  detectSeason,
} from './seasonal-data.js'

const HELP = `\nSeasonal Produce — Bologna (Northern Italy)\n\nUsage:\n  seasonal-produce                # current month (Europe/Rome)\n  seasonal-produce --season SUMMER\n  seasonal-produce --month august\n  seasonal-produce --month 9      # September\n\nOptions:\n  -m, --month <name|number>   Month (name in EN/IT or 1-12)\n  -s, --season <name>         Season: winter, spring, summer, autumn\n  -f, --format <fmt>          Output: table (default) | json\n  -h, --help                  Show help\n`

export async function main() {
  const argv = process.argv.slice(2)
  if (argv.includes('-h') || argv.includes('--help')) {
    console.log(HELP)
    return
  }

  const fmt = pickOption(argv, ['-f', '--format']) || 'table'
  const seasonOpt = (pickOption(argv, ['-s', '--season']) || '').toLowerCase()
  const monthOptRaw = pickOption(argv, ['-m', '--month'])

  const now = new Date()
  const tzNow = new Date(
    now.toLocaleString('en-GB', { timeZone: 'Europe/Rome' })
  )

  const monthIdx = monthIndexFromInput(monthOptRaw ?? tzNow.getMonth())
  const season = seasonOpt || detectSeason(monthIdx)

  const data = getData()

  if (seasonOpt && !['winter', 'spring', 'summer', 'autumn'].includes(season)) {
    console.error('Unknown season. Use: winter, spring, summer, autumn')
    process.exit(2)
  }

  if (fmt !== 'json' && fmt !== 'table') {
    console.error('Invalid format. Use: table | json')
    process.exit(2)
  }

  // If user provided a month explicitly, show that month. Otherwise show all months for the season.
  if (monthOptRaw != null) {
    const monthData = data.months[monthIdx]
    output({
      scope: `Month: ${monthNameIt(monthIdx)} — Bologna (Northern Italy)`,
      fruits: monthData.fruits,
      vegetables: monthData.vegetables,
      format: fmt,
    })
    return
  }

  // Show the season overview (3 months)
  const seasonMonths = monthsForSeason(season)
  const acc = { fruits: new Set(), vegetables: new Set() }
  for (const mi of seasonMonths) {
    for (const f of data.months[mi].fruits) acc.fruits.add(f)
    for (const v of data.months[mi].vegetables) acc.vegetables.add(v)
  }
  output({
    scope: `Season: ${capitalize(season)} — ${seasonMonths
      .map(monthNameIt)
      .join(', ')} — Bologna (Northern Italy)`,
    fruits: [...acc.fruits].sort((a, b) => a.localeCompare(b, 'it')),
    vegetables: [...acc.vegetables].sort((a, b) => a.localeCompare(b, 'it')),
    format: fmt,
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

function output({ scope, fruits, vegetables, format }) {
  if (format === 'json') {
    console.log(
      JSON.stringify(
        { scope, location: 'Bologna, Northern Italy', fruits, vegetables },
        null,
        2
      )
    )
    return
  }

  console.log(`\n${scope}\n`)
  const lines = []
  const maxLen = Math.max(fruits.length, vegetables.length)
  const left = ['FRUTTA'].concat(fruits)
  const right = ['VERDURA'].concat(vegetables)
  const colW = 28
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    const l = left[i] || ''
    const r = right[i] || ''
    lines.push(pad(l, colW) + ' | ' + pad(r, colW))
  }
  const sep = '-'.repeat(colW) + '+' + '-'.repeat(colW + 2)
  console.log(sep)
  for (let i = 0; i < lines.length; i++) {
    console.log(lines[i])
    if (i === 0) console.log(sep)
  }
  console.log(sep)
}

function pad(s, w) {
  const t = s.toString()
  return t + ' '.repeat(Math.max(0, w - t.length))
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
