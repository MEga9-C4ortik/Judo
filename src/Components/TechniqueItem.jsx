import styles from './TechniqueItem.module.css';

export default function TechniqueItem({ technique }) {
    return (
        <div className={styles.TechniqueItem}>
            <h2>{technique.nameEN}</h2>
            <h4>{technique.nameJP}</h4>
            <p>{technique.category}</p>
            <p>{technique.beltLvl}</p>

            <a className={styles.link} href={`https://www.youtube.com/watch?v=${technique.youtubeID}`} target="_blank" rel="noopener noreferrer" aria-label={`Youtube Link: ${technique.nameEN}`}>

            </a>
        </div>
    );
}