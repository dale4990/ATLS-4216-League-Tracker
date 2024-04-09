import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Display from '../Pages/Display';
import Games from '../Pages/games/Games';
import Home from '../Pages/Home';
import About from '../Pages/About';
import Champions from '../Pages/Champions'

function Routing() {
    return(
        <Router>
            <Routes>
            <Route 
                exact
                path="/"
                element={<Home /> }
            />
            <Route path="/about" element={<About />} />
            <Route path="/champions" element={<Champions/>}/>
            <Route 
                path="/display/:riotId/:tagline"
                element={<Games /> }
            />
            </Routes>
        </Router>
    )
}

export default Routing;