import React, { useEffect, useState } from 'react';
import '../../styles/Games.css';
import Game from './Game';
import { useParams } from 'react-router-dom';
import { getMatches, getMatchDatas, getRank } from '../../helper/Fetcher';

function Games({data}) {
    const { riotId, tagline } = useParams();

    const [games, setGames] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch matches
                const matches = await getMatches(riotId, tagline);

                // Fetch match data
                const matchData = await getMatchDatas(matches);

                const rankData = await getRank(riotId, tagline);

                // Process match data to generate games array
                const gamesArray = matchData.slice(0, 20).map((match, index) => (
                    <Game key={matches[index]} gameId={matches[index]} matchData={match} summoner={riotId} data={data} rankData={rankData}/>
                ));

                // Update games state
                setGames(gamesArray);

                console.log(riotId, tagline, gamesArray);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

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
