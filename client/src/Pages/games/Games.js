import React from 'react';
import '../../styles/Games.css';
import Game from './Game';
import { useSelector } from 'react-redux';

function Games() {
    // For now we can just use placeholder to test, start with 20 Game.js components
    const gamesDefualt = () => {
        let games = [];
        for (let i = 0; i < 20; i++) {
            games.push(<Game key={i} />);
        }
        return games;
    }

    // This should be the real implementation. When in games, we should be in url /display/:riotId/:tagline
    const games = () => {
        // Get the riotId and tagline from the url
        const riotId = useSelector(state => state.riotId);
        const tagline = useSelector(state => state.tagline);

        console.log(riotId, "#", tagline);

        return 1; // Placeholder
    }

    games();

    return (
        <div className="game-list">
            {gamesDefualt()} 
        </div>
    )
}

export default Games;