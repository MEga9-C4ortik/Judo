import styles from "./Card.module.css";

const beltColors = {
    Yellow: { bg: "#F4D03F", text: "#4a3c08" },
    Orange: { bg: "#E67E22", text: "#4a2808" },
    Green: { bg: "#58AA5C", text: "#1c3d1f" },
    Blue: { bg: "#3D7DCB", text: "#ffffff" },
    Brown: { bg: "#8B5A2B", text: "#ffffff" },
    Black: { bg: "#1C1C1C", text: "#ffffff" },
    "Not graded": { bg: "#E3DDD0", text: "#5c5346" },
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
                        style={{ background: belt.bg, color: belt.text }}
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