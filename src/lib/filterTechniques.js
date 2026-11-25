import {BELTS} from '../Data/belts.js'

export function normalize(value) {
    return String(value ?? '').toLowerCase().replace(/[\s-]/g, '');
}

export function filterTechniques(techniques, { query, category, beltIndex, includeLower }) {
    const q = normalize(query);
    return techniques.filter((technique) => {
        // ranking technique by belt, -1 means wrong/unexpected level of technique
        const rank = BELTS.findIndex((belt) => belt.name === technique.beltLvl);
        if (rank === -1) {
            return false;
        }

        // category is selected and doesnt match the technique category -> false
        if (category && technique.category !== category) {
            return false;
        }

        // if there is a text which doesnt match the technique name -> false
        // varation with belt filter higher than name priority
        if (q && !technique.nameEN?.includes(q)) {
            return false;
        }

        /* 
        // variation with name priotiy higher than belt filter
        if (q) {
            return technique.nameEN.includes(q);
        }       
        */

        // lower rank check with BELTS index(which is int)
        if (includeLower) {
            return rank <= beltIndex;
        }
        // final return if all previous checks are passed
        return rank === beltIndex;
    });
}