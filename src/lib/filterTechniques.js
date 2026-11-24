import {BELTS} from '../Data/belts.js'

export function filterTechniques(techniques, { query, category, beltIndex, includeLower }) {
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
        if (query && !technique.nameEN?.includes(query)) {
            return false;
        }

        /* 
        // variation with name priotiy higher than belt filter
        if (query) {
            return technique.nameEN.includes(query);
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