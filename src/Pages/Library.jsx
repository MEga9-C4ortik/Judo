import techniques from "../Data/techniques.json";
import styles from "./Library.module.css"
import BeltFilter from "../Components/BeltFilter.jsx";
import {filterTechniques} from "../lib/filterTechniques.js";
import TechniqueItem from "../Components/TechniqueItem.jsx";
import {useState} from "react";

function Library() {
    const [selectedCategory, setCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [beltIndex, setBeltIndex] = useState(5);
    const [includeLower, setIncludeLower] = useState(true);

    const categories = [...new Set(techniques.map((t) => t.category))];
    const searching = Boolean(normalize(searchQuery));
    const filtered = filterTechniques(techniques, {
        query: searchQuery,
        category: selectedCategory,
        beltIndex,
        includeLower,
    });

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
                    :
                    <span className={styles.notFound}> Nothing found </span>
                }
            </div>
        </>
    );
}

export default Library;