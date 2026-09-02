import styles from "./Card.module.css";

const beltColors = {
    Yellow:      { bg: "rgba(244,208,63,0.18)",  border: "rgba(244,208,63,0.6)",  text: "#6b5410" },
    Orange:      { bg: "rgba(230,126,34,0.12)",  border: "rgba(230,126,34,0.5)", text: "#8a4a12" },
    Green:       { bg: "rgba(88,170,92,0.12)",   border: "rgba(88,170,92,0.5)",  text: "#2d6b31" },
    Blue:        { bg: "rgba(61,125,203,0.12)",  border: "rgba(61,125,203,0.5)", text: "#2c5c96" },
    Brown:       { bg: "rgba(139,90,43,0.12)",   border: "rgba(139,90,43,0.5)",  text: "#6b4520" },
    Black:       { bg: "rgba(28,28,28,0.08)",    border: "rgba(28,28,28,0.5)",    text: "#1C1C1C" },
    "Not graded":{ bg: "rgba(107,94,82,0.10)",   border: "rgba(107,94,82,0.5)",  text: "#6b5e52" },
};

function Card({nameEN, nameJP, category, difficulty, description, youtubeID}) {
    const belt = beltColors[difficulty] || beltColors["Not graded"];

    return (
        <div className={styles.card}>
            <img className={styles.img} src={`https://img.youtube.com/vi/${youtubeID}/maxresdefault.jpg`} alt={nameEN} />
            <div className={styles.body}>
                <div className={styles.name}>
                    <p> {nameEN} </p>
                    <p> {nameJP} </p>
                </div>
                <div className={styles.badges}>
                    <p className={styles.category}> Category: {category}</p>
                    <p
                        className={styles.difficulty}
                        style={{
                            background: belt.bg,
                            borderColor: belt.border,
                            color: belt.text,
                        }}
                    >
                        {difficulty}
                    </p>
                </div>
                <p className={styles.description}> {description}</p>
                <a className={styles.link} href={`https://www.youtube.com/watch?v=${youtubeID}`} target="_blank" rel="noopener noreferrer">
                    Youtube Link </a>
            </div>
        </div>
    )
}

export default Card;