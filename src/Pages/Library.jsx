import techniques from "../data/techniques.json";
import styles from "./Library.module.css"
import Card from "../Components/Card.jsx";

function Library() {
    return (
        <div className={styles.Library}>
            {techniques.map(technique =>
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