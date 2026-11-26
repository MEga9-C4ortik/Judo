// Differential test for the technique filter.
// The expected results are computed here in the most naive way, straight from the data,
// and compared with what src/lib/filterTechniques.js returns.
// Run it with: npm run check:filter   (red until src/belts.js and src/lib/filterTechniques.js exist)
import { readFileSync } from 'node:fs'
import process from 'node:process'

const techniques = JSON.parse(readFileSync(new URL('../src/Data/techniques.json', import.meta.url), 'utf8'))

const ORDER = ['Yellow', 'Orange', 'Green', 'Blue', 'Brown', 'Black']
const norm = (s) => s.toLowerCase().replace(/[\s-]/g, '')
const rank = (t) => ORDER.indexOf(t.beltLvl) // -1 = not one of the six belts: hidden everywhere
const visible = techniques.filter((t) => rank(t) !== -1)
const hidden = techniques.filter((t) => rank(t) === -1)
const categories = [...new Set(techniques.map((t) => t.category))]
const key = (list) => list.map((t) => t.id).sort((a, b) => a - b).join(',')
const compare = (got, want) => (key(got) === key(want) ? true : `got ${got.length}, expected ${want.length}`)
const byName = (q) => visible.filter((t) => norm(t.nameEN).includes(norm(q)))

async function main() {
  let BELTS, filterTechniques
  try {
    const belts = await import('../src/Data/belts.js')
    const lib = await import('../src/lib/filterTechniques.js')
    BELTS = belts.BELTS
    filterTechniques = lib.filterTechniques
    if (typeof filterTechniques !== 'function') throw new Error('filterTechniques is not exported as a function')
  } catch (e) {
    console.error(`Cannot run yet: ${e.message}`)
    console.error('Create src/belts.js (export const BELTS) and src/lib/filterTechniques.js (export function filterTechniques).')
    process.exitCode = 1
    return
  }

  const f = (opts) => filterTechniques(techniques, { query: '', category: '', beltIndex: 5, includeLower: true, ...opts })
  const tests = []
  const test = (name, fn) => tests.push([name, fn])

  test('BELTS lists Yellow..Black in order, each with a kanji', () =>
    Array.isArray(BELTS) && BELTS.length === 6 &&
    BELTS.every((b, i) => b.name === ORDER[i] && typeof b.kanji === 'string' && b.kanji.length > 0))

  ORDER.forEach((name, i) => {
    test(`${name}: only this belt`, () => compare(f({ beltIndex: i, includeLower: false }), visible.filter((t) => rank(t) === i)))
    test(`${name}: this belt and lower`, () => compare(f({ beltIndex: i, includeLower: true }), visible.filter((t) => rank(t) <= i)))
  })

  test('techniques outside the six belts are never shown', () => {
    const r = compare(f({}), visible)
    if (r !== true) return r
    return hidden.every((h) => compare(f({ query: h.nameEN }), byName(h.nameEN)) === true && f({ query: h.nameEN }).every((t) => rank(t) !== -1))
  })

  ;['kata', 'goshi', 'gatame', 'O-GOSHI'].forEach((q) => {
    test(`search "${q}" is applied together with the belt rules`, () =>
      [[0, false], [2, false], [2, true], [5, true]].every(([beltIndex, includeLower]) =>
        compare(f({ query: q, beltIndex, includeLower }), byName(q).filter((t) => (includeLower ? rank(t) <= beltIndex : rank(t) === beltIndex))) === true))
  })

  test('search is case-, space- and hyphen-insensitive', () => {
    const a = f({ query: ' o goshi ' }), b = f({ query: 'O-GOSHI' }), c = f({ query: 'ogoshi' })
    return a.length > 0 && compare(a, b) === true && compare(b, c) === true
  })

  test('a blank query (spaces/hyphens only) means no search', () =>
    compare(f({ query: ' - ', beltIndex: 2, includeLower: false }), visible.filter((t) => rank(t) === 2)))

  categories.forEach((cat) => {
    test(`category "${cat}" with belt Green only`, () => compare(f({ category: cat, beltIndex: 2, includeLower: false }), visible.filter((t) => rank(t) === 2 && t.category === cat)))
    test(`category "${cat}" also applies while searching "gatame"`, () => compare(f({ category: cat, query: 'gatame' }), byName('gatame').filter((t) => t.category === cat)))
  })

  test('input is not changed and the original order is kept', () => {
    const before = key(techniques) + ':' + techniques.length
    const got = f({})
    const idx = got.map((t) => techniques.indexOf(t))
    return before === key(techniques) + ':' + techniques.length && idx.every((v, k) => v !== -1 && (k === 0 || v > idx[k - 1]))
  })

  let failed = 0
  for (const [name, fn] of tests) {
    let r
    try { r = fn() } catch (e) { r = `threw: ${e.message}` }
    if (r !== true) failed++
    console.log(`${r === true ? 'PASS' : 'FAIL'}  ${name}${r === true ? '' : '  -> ' + r}`)
  }
  console.log(`\n${tests.length - failed}/${tests.length} passed`)
  process.exitCode = failed > 0 ? 1 : 0
}

main()
