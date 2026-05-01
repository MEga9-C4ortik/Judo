function Card(id,nameEN,nameJP,category,description,youtubeID) {
    return (
        <div className="card">
            <img className="image" src={`/images/${id}`}> </img>
            <div className="body">
                <span className="name">
                    <p> {nameEN} </p>
                    <p> {nameJP} </p>
                </span>
                <p className="category"> {category}</p>
                <p className="description"> {description}</p>
                <a className="link"> {youtubeID} </a>
            </div>
        </div>
    )
}

export default Card;