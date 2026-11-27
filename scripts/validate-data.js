// Checks src/Data/techniques.json for mistakes the UI would otherwise hide silently.
// Errors fail the run (exit code 1); warnings are printed but do not.
import { readFileSync } from 'node:fs'
import process from 'node:process'

const FILE = new URL('../src/Data/techniques.json', import.meta.url)
const CATEGORIES = ['Nage-waza', 'Ne-waza']
const BELTS = ['Yellow', 'Orange', 'Green', 'Blue', 'Brown', 'Black', 'Not graded']
const TEXT_FIELDS = ['nameEN', 'nameJP', 'category', 'beltLvl', 'description', 'youtubeID']

// Same idea as normalize() in Library.jsx: names the search treats as equal count as duplicates.
const normalize = (s) => s.toLowerCase().replace(/[\s-]/g, '')

let techniques
try {
  techniques = JSON.parse(readFileSync(FILE, 'utf8'))
  if (!Array.isArray(techniques)) throw new Error('the top level must be an array')
} catch (e) {
  console.error(`Cannot read techniques.json: ${e.message}`)
  process.exit(1)
}

const errors = []
const warnings = []
const ids = new Map()
const names = new Map()
const videos = new Map()
const track = (map, key, label) => map.set(key, [...(map.get(key) ?? []), label])

techniques.forEach((t, i) => {
  if (typeof t !== 'object' || t === null) {
    errors.push(`#${i + 1}: not an object`)
    return
  }
  const label = `#${i + 1} ${t.nameEN ?? '(no nameEN)'}`

  if (Number.isInteger(t.id)) track(ids, t.id, label)
  else errors.push(`${label}: "id" must be an integer`)

  for (const field of TEXT_FIELDS) {
    const value = t[field]
    if (typeof value !== 'string' || value.trim() === '') {
      errors.push(`${label}: "${field}" is missing or empty`)
    } else if (value !== value.trim()) {
      errors.push(`${label}: "${field}" has leading or trailing spaces`)
    }
  }

  if (!CATEGORIES.includes(t.category)) errors.push(`${label}: unknown category "${t.category}"`)
  if (!BELTS.includes(t.beltLvl)) errors.push(`${label}: unknown beltLvl "${t.beltLvl}"`)
  if (typeof t.youtubeID === 'string' && !/^[\w-]{11}$/.test(t.youtubeID)) {
    errors.push(`${label}: "youtubeID" must be 11 characters of A-Z a-z 0-9 _ -`)
  }

  if (typeof t.nameEN === 'string' && t.nameEN.trim() !== '') track(names, normalize(t.nameEN), label)
  if (typeof t.youtubeID === 'string' && t.youtubeID.trim() !== '') track(videos, t.youtubeID, label)
})

function reportDuplicates(map, message, bucket) {
  for (const [key, labels] of map) {
    if (labels.length > 1) bucket.push(`${message} "${key}": ${labels.join(' | ')}`)
  }
}
reportDuplicates(ids, 'duplicate id', errors)
reportDuplicates(names, 'duplicate name (case, spaces and hyphens ignored)', errors)
reportDuplicates(videos, 'same video used more than once - one technique listed twice?', warnings)

warnings.forEach((w) => console.warn(`warning: ${w}`))
errors.forEach((e) => console.error(`error: ${e}`))
console.log(`${techniques.length} techniques checked: ${errors.length} error(s), ${warnings.length} warning(s)`)
process.exitCode = errors.length > 0 ? 1 : 0
