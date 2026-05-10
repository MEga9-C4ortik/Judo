import techniques from "../Data/techniques.json";
import styles from "./Library.module.css"
import Card from "../Components/Card.jsx";
import {useState} from "react";

function Library() {
    const [selectedCategory, setCategory] = useState("");
    const categories = [...new Set(techniques.map(t => t.category))];

    const filtered = techniques
        .filter(t => !selectedCategory || t.category === selectedCategory);

    return (
        <>
            <div className={styles.controls}>
                <div className={styles.filters}>
                    <button className={selectedCategory ? styles.active : styles.btn}
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
            </div>
            <div className={styles.Library}>
                {filtered.map(technique =>
                    <Card
                        key={technique.id}
                        nameEN={technique.nameEN}
                        nameJP={technique.nameJP}
                        category={technique.category}
                        description={technique.description}
                        youtubeID={technique.youtubeID}
                    />)}
            </div>
        </>
    );
}

export default Library;