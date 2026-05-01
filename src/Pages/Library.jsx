import techniques from "./techniques.json";
import Card from "./components/Card";

function Library() {
    return (
        techniques.map(technique =>
            <Card
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