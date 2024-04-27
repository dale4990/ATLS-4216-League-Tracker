import React, {useState} from 'react';
import '../../styles/gameStats.css';
import MemoizedTeamAnalysis from './TeamAnalysis';
import MemoizedPlayerAnalysis from './PlayerAnalysis';

function GameStats ({matchData, summoner, data, result}) {
    const [selection, setSelection] = useState(true);

    const isMe = matchData.participants.find(participant => participant.puuid === summoner);

    return (
        <div className="game-stats">
            <ul>
                <li className={selection ? "selected-container" : "unselected-container"}>
                    <button onClick={() => setSelection(true)}>Overview</button>
                </li>
                <li className={selection ? "unselected-container" : "selected-container"}>
                    <button onClick={() => setSelection(false)}>Team Analysis</button>
                </li>
            </ul>

            {selection ? <MemoizedPlayerAnalysis matchData={matchData} data={data} summoner={summoner} result={result}/> : <MemoizedTeamAnalysis matchData={matchData} data={data} />}
        </div>
    );
};

export default GameStats;