import styles from './TechniqueItem.module.css';

export default function TechniqueItem({ technique }) {
    return (
        <li className={styles.item}>
            <details className={styles.details}> 
                <summary className={styles.header}>
                    <span className={styles.dot} 
                        data-belt={technique.beltLvl} 
                        aria-label="true">
                    </span>

                    <span className={styles.text}>
                        <span className={styles.nameEN}> 
                            {technique.nameEN} 
                        </span>

                        <span className={styles.nameJP} lang="ja"> 
                            {technique.nameJP} 
                        </span>
                    </span>
                    <svg className={styles.chevron} 
                        viewBox="0 0 20 20" 
                        aria-hidden="true"
                    >
                        <path 
                            d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <svg 
                        viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z" fill="currentColor" />
                    </svg>
                </summary> 
            </details>
        
            <p>{technique.category}</p>
            <p>{technique.beltLvl}</p>

            <a className={styles.link}
                href={
                    `https://www.youtube.com/watch?v=${technique.youtubeID}`}
                target="_blank" rel="noopener noreferrer"
                aria-label={`Youtube Link: ${technique.nameEN}`}
            >

            </a>
        </li>
    );
}