import React from 'react';
import '../../styles/Games.css';
import Game from './Game';
import { useParams } from 'react-router-dom';
import { getMatches, getMatchDatas } from '../../helper/Fetcher';
import { useEffect, useState } from "react";

function Games() {
    const { riotId, tagline } = useParams();

    const [matches, setMatches] = useState([]);
    const [matchData, setMatchData] = useState([]);

    // This should be the real implementation. When in games, we should be in url /display/:riotId/:tagline
    const games = () => {
        let games = [];
        // push up to 20 games
        const gameNum = Math.min(20, matchData.length);
        for (let i = 0; i < gameNum; i++) {
            let match = matchData[i];
            let gameId = matches[i];
            games.push(<Game key={gameId} gameId={gameId} matchData={match} summoner={riotId} />);
        }
        return games;
    }

    useEffect(() => {
        async function fetchGames() {
            const matches = await getMatches(riotId, tagline);
            setMatches(matches);
        }
        fetchGames();
    } , [riotId, tagline]);

    useEffect(() => {
        async function fetchMatchData() {
            const matchData = await getMatchDatas(matches);
            setMatchData(matchData);
        }
        fetchMatchData();
    }, [matches]);

    return (
        <div className="game-list">
            {matchData.length === 0 ? "Invalid Input or Loading" : games()} 
        </div>
    )
}

export default Games;