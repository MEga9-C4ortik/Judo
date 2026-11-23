import BELTS from '../Data/belts.js'

export function filterTechniques(techniques, { query, category, beltIndex, includeLower }) {
    techniques = techniques
        .filter((technique) => (technique.category == category || !category)
            || (includeLower && BELTS.indexOf(technique.beltLvl) <= beltIndex)
            || (!includeLower && BELTS.indexOf(technique.beltLvl) === beltIndex)
            || (technique => technique.nameEN === query))
        

    return techniques;
}