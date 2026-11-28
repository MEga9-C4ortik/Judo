import {useState, useEffect} from "react";
import techniques from "../Data/techniques.json";
import { BELTS } from "../Data/belts.js";
import styles from "./Library.module.css"
import BeltFilter from "../Components/BeltFilter.jsx";
import TechniqueItem from "../Components/TechniqueItem.jsx";
import { filterTechniques, normalize } from "../lib/filterTechniques.js";

function Library() {
    const [selectedCategory, setCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [beltIndex, setBeltIndex] = useState(() => {
        //Storing beltIndex in localStorage
        try {
            const saved = localStorage.getItem("beltInd");
            const parsed = saved ? JSON.parse(saved) : null;
            //range of beltIndex 0-5 (yellow-black)
            return typeof parsed === "number" && parsed >= 0 && parsed < BELTS.length
                ? parsed
                : 5;
        } catch (e) {
            console.log("Error-BeltIndex Local storage: " + e);
            return 5;
        }
    });
    const [includeLower, setIncludeLower] = useState(() => {
        //storing include lower flag (def: true)
        try{
            const saved = localStorage.getItem("includeLower");
            const parsed = saved ? JSON.parse(saved) : null;
            return typeof parsed === "boolean"
                ? parsed
                : true;
        } catch (e) {
            console.log("Error-IncludeLower local storage: " + e);
            return true;
        }
    });

    const categories = [...new Set(techniques.map((t) => t.category))];
    const searching = Boolean(normalize(searchQuery));
    //uses ../lib/filterTechnique to filter all data from techniques.json
    const filtered = filterTechniques(techniques, {
        query: searchQuery,
        category: selectedCategory,
        beltIndex,
        includeLower,
    });

    //check if there are items among all belts with current search query
    const elsewhere = filtered.length === 0
        ? filterTechniques(techniques, {
            query: searchQuery,
            category: selectedCategory,
            beltIndex: BELTS.length - 1,
            includeLower: true,
        }).length
        : 0;

    //labels below belt filter
    const currentBeltName = BELTS[beltIndex]?.name ?? "All belts";
    const scope = `${currentBeltName}${includeLower ? " & lower" : ""}`;

    //useEffect to catch any changes to beltIndex
    useEffect(() => {
        try {
            localStorage.setItem("beltInd", JSON.stringify(beltIndex));
        } catch (e) {
            console.log("Error-SetItem BeltIndex: " + e);
        }
    }, [beltIndex]);

    //useEffect for include lower flag
    useEffect(() => {
        try {
            localStorage.setItem("includeLower", JSON.stringify(includeLower));
        } catch (e) {
            console.log("Error-SetItem IncludeLower: " + e);
        }
    }, [includeLower]);

    return (
        <>
            <div className={styles.controls}>
                <div className={styles.filters}>
                    <button
                        className={selectedCategory === "" ? styles.active : styles.btn}
                        aria-pressed={selectedCategory === ""}
                        onClick={() => setCategory("")}
                    >
                        All
                    </button>

                    {categories.map(t =>
                        <button
                            className={selectedCategory === t ? styles.active : styles.btn}
                            key={t}
                            aria-pressed={selectedCategory === t}
                            onClick={() => setCategory(t)}
                        >
                            {t}
                        </button>
                    )}
                </div>

                {/* query */}
                <input
                    className={styles.search}
                    type="text"
                    placeholder="Search technique..."
                    aria-label="Search techniques"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Belt filter aka buttons for belts */}
            <BeltFilter
                beltIndex={beltIndex}
                onBeltChange={setBeltIndex}
                includeLower={includeLower}
                onIncludeLowerChange={setIncludeLower}
                count={filtered.length}
                searching={searching}
            />


            {/* main content aka library with technique items */}
            <div className={styles.Library}>
                {(filtered.length > 0) ?
                    <ul className={styles.list} role="list">
                        {filtered.map(technique =>
                            <TechniqueItem
                                key={technique.id}
                                technique={technique}
                            />
                        )}
                    </ul>
                    : <div className={styles.emptyResults} role="status">
                        <p className={styles.notFound}>
                            Nothing found in {scope}{searching ? ` for “${searchQuery.trim()}”` : ""}
                        </p>
                        {/* using other techniques that found in other belts*/}
                        {elsewhere > 0 && (
                            <button
                                type="button"
                                className={styles.btn}
                                onClick={() => {
                                    setBeltIndex(BELTS.length - 1);
                                    setIncludeLower(true);
                                }}
                            >
                                Show {elsewhere} in all belts
                            </button>
                        )}
                    </div>
                }
            </div>
        </>
    );
}

export default Library;