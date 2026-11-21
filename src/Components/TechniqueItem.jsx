import styles from './TechniqueItem.module.css';

export default function TechniqueItem({nameEN, nameJP, category, beltLvl, description, youtubeID}) {
    return (
        <div className={styles.TechniqueItem}>
            <h2>{nameEN}</h2>
            <h4>{nameJP}</h4>
            <p>{category}</p>
            <p>{beltLvl}</p>

            <a className={styles.link} href={`https://www.youtube.com/watch?v=${youtubeID}`} target="_blank" rel="noopener noreferrer" aria-label={`Youtube Link: ${nameEN}`}>

            </a>
        </div>
    );
}