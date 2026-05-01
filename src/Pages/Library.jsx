import techniques from "../data/techniques.json";
import Card from "../components/Card";

function Library() {
    return (
        techniques.map(technique =>
            <Card
                id={technique.id}
                image={technique.image}
                nameEN={technique.nameEN}
                nameJP={technique.nameJP}
                category={technique.category}
                description={technique.description}
                youtubeID={technique.youtubeId}
            />)
    );
}

export default Library;