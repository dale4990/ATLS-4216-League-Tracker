import React, { useEffect, useState, useRef } from 'react';
import '../../styles/Games.css';
import MemoizedGame from './Game';
import { useParams } from 'react-router-dom';
import { getMatches, getMatchDatas, getPUUID } from '../../helper/Fetcher';

function Games({data}) {
    const { riotId, tagline } = useParams();

    const [games, setGames] = useState([]);

    const prevRiotId = useRef(null);
    const prevTagline = useRef(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch puuid
                const puuid = await getPUUID(riotId, tagline);

                // Fetch matches
                const matches = await getMatches(puuid, 0, 5);

                // Fetch match data
                const matchData = await getMatchDatas(matches);

                setGames(matchData.map((match, index) => (
                    <MemoizedGame key={matches[index]} matchData={match} summoner={puuid} data={data}/>
                )));

                console.log(riotId, tagline, games);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        // Check if riotId or tagline has changed
        if (riotId === prevRiotId.current && tagline === prevTagline.current) {
            return;
        }

        // Update prevRiotId and prevTagline
        prevRiotId.current = riotId;
        prevTagline.current = tagline;

        // Call fetchData whenever riotId or tagline changes
        fetchData();
    }, [riotId, tagline]);

    return (
        <div className="game-list">
            {games.length === 0 ? "Invalid Input or Loading" : games}
        </div>
    );
}

export default Games;
