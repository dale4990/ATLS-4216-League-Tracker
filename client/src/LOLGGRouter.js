import {Routes, Route} from 'react-router-dom';
import Games from './Pages/games/Games';
import Home from './Pages/Home';
import About from './Pages/About';
import Champions from './Pages/Champions'
import Navbar from './Navbar';

const championDict = require('./assets/data/en_US/champion.json');
const champions = championDict.data; // dictionary of champions
const summonerDict = require('./assets/data/en_US/summoner.json');
const summoners = summonerDict.data; // dictionary of summoner spells
const runesDict = require('./assets/data/en_US/runesReforged.json'); // array of runes

// Pack them together
export const data = {
    champions: champions,
    summoners: summoners,
    runes: runesDict
};

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
                    <Route path="/display/:riotId/:tagline" element={<Games data={data} />} />
                </Routes>
            </div>
        </>
    )
}

export default LOLGGRouter;