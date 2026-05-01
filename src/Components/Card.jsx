function Card({nameEN,nameJP,category,description,youtubeID}) {
    return (
        <div className="card">
            <img src={`https://img.youtube.com/vi/${youtubeID}/maxresdefault.jpg`} />
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