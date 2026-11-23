import styles from './BeltFilter.module.css';

export default function BeltFilter({ beltLvl, onChange }) {
    return (
        <section className={styles.filter} aria-label="Belt Level">
            <div className={styles.ribbon} role="group" aria-label="Belt">
                <button type="button" data-belt={name} data-state={}
                        aria-pressed={i === beltIndex} aria-label=`{name} belt`
                        disabled={searching}  onClick={() => onBeltChange(i)}
                >
                    <span className={styles.face}>{kanji}</span>
                </button>
            </div>

            <div className={styles.row}>
                <p className={styles.caption}>

                </p>

                <label className={styles.toggle}>
                    <input type={"checkbox"} checked={includeLower} disabled={searching}></input>
                    <span> Include other belts</span>
                </label>
            </div>
        </section>
    );
}