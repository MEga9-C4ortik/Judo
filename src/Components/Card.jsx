import styles from "./Card.module.css";

function Card({nameEN,nameJP,category,description,youtubeID}) {
    return (
        <div className={styles.card}>
            <img className={styles.img} src={`https://img.youtube.com/vi/${youtubeID}/maxresdefault.png`} />
            <div className={styles.body}>
                <div className={styles.name}>
                    <p> {nameEN} </p>
                    <p> {nameJP} </p>
                </div>
                <p className={styles.category}> {category}</p>
                <p className={styles.description}> {description}</p>
                <a className={styles.link} href={`https://www.youtube.com/watch?v=${youtubeID}`} target="_blank" rel="noopener noreferrer">
                    Youtube Link </a>
            </div>
        </div>
    )
}

export default Card;