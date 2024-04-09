import {Routes, Route} from 'react-router-dom';
import Games from './Pages/games/Games';
import Home from './Pages/Home';
import About from './Pages/About';
import Champions from './Pages/Champions'
import Navbar from './Navbar';

function LOLGGRouter() {
    return (
        <>
            <div style={{zIndex: 0, position: 'relative'}}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/champions" element={<Champions />} />
                    <Route path="/modes" element={<></>} />
                    <Route path="/display/:riotId/:tagline" element={<Games />} />
                </Routes>
            </div>
        </>
    )
}

export default LOLGGRouter;