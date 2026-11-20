import styles from "./Card.module.css";

const beltColors = {
    Yellow: {
        bg: "var(--belts-yellow-bg)",
        border: "var(--belts-yellow-border)",
        text: "var(--belts-yellow-text)"
    },
    Orange: {
        bg: "var(--belts-orange-bg)",
        border: "var(--belts-orange-border)",
        text: "var(--belts-orange-text)"
    },
    Green: {
        bg: "var(--belts-green-bg)",
        border: "var(--belts-green-border)",
        text: "var(--belts-green-text)"
    },
    Blue: {
        bg: "var(--belts-blue-bg)",
        border: "var(--belts-blue-border)",
        text: "var(--belts-blue-text)"
    },
    Brown: {
        bg: "var(--belts-brown-bg)",
        border: "var(--belts-brown-border)",
        text: "var(--belts-brown-text)"
    },
    Black: {
        bg: "var(--belts-black-bg)",
        border: "var(--belts-black-border)",
        text: "var(--belts-black-text)"
    },
    "Not graded": {
        bg: "var(--belts-not-graded-bg)",
        border: "var(--belts-not-graded-border)",
        text: "var(--belts-not-graded-text)"
    },
};

function Card({nameEN, nameJP, category, beltLvl, description, youtubeID}) {
    const belt = beltColors[beltLvl] || beltColors["Not graded"];

    return (
        <div className={styles.card}>
            <img className={styles.img} src={`https://img.youtube.com/vi/${youtubeID}/maxresdefault.jpg`} alt={nameEN} loading="lazy" decoding="async" />
            <div className={styles.body}>
                <div className={styles.name}>
                    <p> {nameEN} </p>
                    <p> {nameJP} </p>
                </div>
                <div className={styles.badges}>
                    <p className={styles.category}> Category: {category}</p>
                    <p
                        className={styles.beltLvl}
                        style={{
                            background: belt.bg,
                            borderColor: belt.border,
                            color: belt.text,
                        }}
                    >
                        {beltLvl}
                    </p>
                </div>
                <p className={styles.description}> {description}</p>
                <a className={styles.link} href={`https://www.youtube.com/watch?v=${youtubeID}`} target="_blank" rel="noopener noreferrer" aria-label={`Youtube Link: ${nameEN}`}>
                    Youtube Link </a>
            </div>
        </div>
    )
}

export default Card;