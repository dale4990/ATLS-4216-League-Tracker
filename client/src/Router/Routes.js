import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Display from '../Pages/Display';
import Home from '../Pages/Home';
import About from '../Pages/About';

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
            <Route 
                path="/display/:riotId/:tagline"
                element={<Display /> }
            />
            </Routes>
        </Router>
    )
}

export default Routing;