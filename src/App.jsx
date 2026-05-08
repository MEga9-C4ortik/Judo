import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Library from './Pages/Library'
import About from './Pages/About'

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Library />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </>
    )
}

export default App;