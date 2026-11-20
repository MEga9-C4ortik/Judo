import styles from './TechniqueItem.module.css';

function TechniqueItem({ technique }) {
    return (
        <div className={styles.TechniqueItem}>
            <h2>{technique.nameEN}</h2>
            <h4>{technique.nameJP}</h4>
            <p>{technique.category}</p>
            <p>{technique.beltLvl}</p>
        </div>
    );
}