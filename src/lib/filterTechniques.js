import {BELTS} from '../Data/belts.js'

export function filterTechniques(techniques, { query, category, beltIndex, includeLower }) {
    return techniques.filter((technique) => {
        // ranking technique by belt, -1 means wrong level of technique
        const rank = BELTS.findIndex((belt) => belt.name === technique.beltLvl);
        if (rank === -1) {
            return false;
        }

        // category is selected and doesnt match the technique category
        if (category && technique.category !== category) {
            return false;
        }

        // if there is a text -> return
        if (query) {
            return technique.nameEN.includes(query);
        }

        // lower rank check with BELTS index
        if (includeLower) {
            return rank <= beltIndex;
        }
        return rank === beltIndex;
    });
}