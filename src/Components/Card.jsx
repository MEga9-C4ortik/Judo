import styles from "./Card.module.css";

function Card({nameEN,nameJP,category,description,youtubeID}) {
    return (
        <div className={styles.card}>
            <img className={styles.img} src={`https://img.youtube.com/vi/${youtubeID}/maxresdefault.jpg`} />
            <div className={styles.body}>
                <span className={styles.name}>
                    <p> {nameEN} </p>
                    <p> {nameJP} </p>
                </span>
                <p className={styles.category}> {category}</p>
                <p className={styles.description}> {description}</p>
                <a className={styles.link} href={`https://www.youtube.com/watch?v=${youtubeID}`}> Youtube Link </a>
            </div>
        </div>
    )
}

export default Card;