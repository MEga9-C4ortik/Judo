import techniques from "../Data/techniques.json";
import styles from "./Library.module.css"
import Card from "../Components/Card.jsx";
import {useState} from "react";

function Library() {
    const [selectedCategory, setCategory] = useState("");

    const filtered = techniques
        .filter(t => !selectedCategory || t.category === selectedCategory);

    return (
        <div className={styles.Library}>
            <button onClick={() => setCategory("")}>All</button>
            <button onClick={() => setCategory("Nage-waza")}> Nage-waza </button>
            <button onClick={() => setCategory("Ne-waza")}> Ne-waza </button>

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
    );
}

export default Library;