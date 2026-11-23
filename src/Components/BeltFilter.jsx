import styles from './BeltFilter.module.css';

export default function BeltFilter({ beltLvl, onChange }) {
    return (
        <div className={styles.filter}>
            <label htmlFor="beltFilter" className={styles.label}>
                Filter by Belt Level:
            </label>
            <select
                id="beltFilter"
                value={beltLvl}
                onChange={onChange}
                className={styles.select}
            >
                <option value="">All Levels</option>
                <option value="white">White</option>
                <option value="yellow">Yellow</option>
                <option value="orange">Orange</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="purple">Purple</option>
                <option value="brown">Brown</option>
                <option value="black">Black</option>
            </select>
        </div>
    );
}