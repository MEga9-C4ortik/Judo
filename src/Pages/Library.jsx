import techniques from "../Data/techniques.json";
import styles from "./Library.module.css"
import Card from "../Components/Card.jsx";
import {useState} from "react";

function Library() {
    const [selectedCategory, setCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [belt, setBelt] = useState(6);
    const categories = [...new Set(techniques.map(t => t.category))];

    const normalize = (str) =>
        str.toLowerCase().replace(/[\s\-]/g, "");

    const beltNames = ["Yellow", "Orange", "Green", "Blue", "Brown", "Black"];

    const diffChg = (beltStr) => {
        switch (beltStr) {
            case "Yellow": return 1;
            case "Orange": return 2;
            case "Green": return 3;
            case "Blue": return 4;
            case "Brown": return 5;
            case "Black": return 6;
        }
    }

    const filtered = techniques
        .filter(t => !selectedCategory || t.category === selectedCategory)
        .filter(t => normalize(t.nameEN).includes(normalize(searchQuery)))
        .filter(t => diffChg(t.difficulty) <= belt)
    ;

    return (
        <>
            <div className={styles.controls}>
                <div className={styles.filters}>
                    <button className={selectedCategory === "" ? styles.active : styles.btn}
                            onClick={() => setCategory("")}>
                        All
                    </button>

                    {categories.map(t =>
                        <button className={selectedCategory === t ? styles.active : styles.btn}
                                key={t}
                                onClick={() => setCategory(t)}>
                            {t}
                        </button>
                    )}
                </div>

                <input
                    className={styles.search}
                    type="text"
                    placeholder="Search technique..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>

            <div className={styles.beltFilter}>
                <div className={styles.beltFilterHeader}>
                    <span className={styles.beltFilterLabel}>Show techniques up to</span>
                    <span className={styles.beltFilterValue}>{beltNames[belt - 1]}</span>
                </div>
                <input className={styles.beltSlider}
                       type="range"
                       min={1}
                       max={6}
                       value={belt}
                       onChange={e => setBelt(e.target.value)}
                       aria-label="Filter by belt level"
                />
            </div>

            <div className={styles.Library}>
                {(filtered.length > 0) ?
                    filtered.map(technique =>
                        <Card
                            key={technique.id}
                            nameEN={technique.nameEN}
                            nameJP={technique.nameJP}
                            category={technique.category}
                            difficulty={technique.difficulty}
                            description={technique.description}
                            youtubeID={technique.youtubeID}
                        />) :
                    <span className={styles.notFound}> Nothing found </span>}
            </div>
        </>
    );
}

export default Library;