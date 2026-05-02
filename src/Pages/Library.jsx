import technique from "../data/techniques.json";
import Card from "../components/Card";

function Library() {
    return (
        <div>
            techniques.map(technique =>
            <Card
                key={technique.id}
                nameEN={technique.nameEN}
                nameJP={technique.nameJP}
                category={technique.category}
                description={technique.description}
                youtubeID={technique.youtubeID}
            />)
        </div>
    );
}

export default Library;