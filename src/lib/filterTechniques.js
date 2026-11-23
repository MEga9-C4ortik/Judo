export function filterTechniques(techniques, { query, category, beltIndex, includeLower }) {
    techniques = techniques
        .filter(technique => technique.category == category || !category)
        .filter(technique =>
            (includeLower && technique.beltLvl <= beltIndex)
            || (!includeLower && technique.beltLvl === beltIndex)
        )
        .filter(technique => technique.nameEN === query);

    return techniques;
}