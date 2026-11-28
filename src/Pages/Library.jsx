import techniques from "../Data/techniques.json";
import styles from "./Library.module.css"
import BeltFilter from "../Components/BeltFilter.jsx";
import { BELTS } from "../Data/belts.js";
import { filterTechniques, normalize } from "../lib/filterTechniques.js";
import TechniqueItem from "../Components/TechniqueItem.jsx";
import {useState, useEffect} from "react";

function Library() {
    const [selectedCategory, setCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [beltIndex, setBeltIndex] = useState(() => {
        try {
            const saved = localStorage.getItem("beltInd");
            const parsed = saved ? JSON.parse(saved) : null;
            return typeof parsed === "number" && parsed >= 0 && parsed < BELTS.length
                ? parsed
                : 5;
        } catch (e) {
            console.log("Error-BeltIndex Local storage: " + e);
            return 5;
        }
    });
    const [includeLower, setIncludeLower] = useState(() => {
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
    const filtered = filterTechniques(techniques, {
        query: searchQuery,
        category: selectedCategory,
        beltIndex,
        includeLower,
    });

    const elsewhere = filtered.length === 0
        ? filterTechniques(techniques, {
            query: searchQuery,
            category: selectedCategory,
            beltIndex: BELTS.length - 1,
            includeLower: true,
        }).length
        : 0;

    const currentBeltName = BELTS[beltIndex]?.name ?? "All belts";
    const scope = `${currentBeltName}${includeLower ? " & lower" : ""}`;

    useEffect(() => {
        try {
            localStorage.setItem("beltInd", JSON.stringify(beltIndex));
        } catch (e) {
            console.log("Error-SetItem BeltIndex: " + e);
        }
    }, [beltIndex]);

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

                <input
                    className={styles.search}
                    type="text"
                    placeholder="Search technique..."
                    aria-label="Search techniques"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <BeltFilter
                beltIndex={beltIndex}
                onBeltChange={setBeltIndex}
                includeLower={includeLower}
                onIncludeLowerChange={setIncludeLower}
                count={filtered.length}
                searching={searching}
            />

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