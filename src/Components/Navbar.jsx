import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logo}>柔道</Link>

            <button
                className={styles.burger}
                onClick={() => setIsOpen(!isOpen) }
            >
                <span />
                <span />
                <span />
            </button>

            <ul className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
                <li><Link to="/" onClick={ () => setIsOpen(false)}>
                    Library</Link></li>
                <li><Link to="/about" onClick={ () => setIsOpen(false)}>
                    About</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar