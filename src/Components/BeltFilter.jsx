import { BELTS } from "../Data/belts.js";
import styles from './BeltFilter.module.css';

export default function BeltFilter({ beltIndex, onBeltChange, includeLower, onIncludeLowerChange, count, searching }) {
    const currentBelt = BELTS[beltIndex];
    const getState = (i) => {
        if (i === beltIndex) return 'selected';
        if (includeLower && i < beltIndex) return 'included';
        return 'off';
    };

    return (
        <section className={styles.filter} aria-label="Belt Level">
            <div className={styles.ribbon} role="group" aria-label="Belt">
                {BELTS.map((belt, i) => {
                    const state = getState(i);
                    return (
                        <button
                            key={belt.name ?? i}
                            type="button"
                            className={styles.belt}
                            data-belt={belt.name}
                            data-state={state}
                            aria-pressed={i === beltIndex}
                            aria-label={`${belt.name} belt`}
                            onClick={() => onBeltChange(i)}
                        >
                            <span className={styles.face}>{belt.kanji}</span>
                        </button>
                    );
                })}
            </div>

            <div className={styles.row}>
                <p className={styles.caption}>
                    <span className={styles.captionTitle}>
                        {currentBelt?.name ?? ''}{includeLower ? ' & lower' : ''}
                    </span>
                    <span className={styles.captionCount}>
                        {count} {searching ? 'results' : 'techniques'}
                    </span>
                </p>

                <label className={styles.toggle}>
                    <input
                        type="checkbox"
                        checked={includeLower}
                        onChange={ (e) => onIncludeLowerChange(e.target.checked)}
                    />
                    <span> Include lower belts</span>
                </label>
            </div>
        </section>
    );
}