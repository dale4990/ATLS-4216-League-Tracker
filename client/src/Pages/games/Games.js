import React, { useEffect, useState, useRef } from 'react';
import '../../styles/Games.css';
import MemoizedGame from './Game';
import { useParams } from 'react-router-dom';
import { getMatches, getMatchDatas, getPUUID } from '../../helper/Fetcher';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadMore = styled.button`
    background-color: #C89B3C;
    border: none;
    color: #F0E6D2;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-top: 0px;
    cursor: pointer;
    padding: 15px 20px;
    border-radius: 5px;
    width: 740px;
`;

function Games({data}) {
    const { riotId, tagline } = useParams();

    const [puuidRef, setPuuid] = useState('');
    const [games, setGames] = useState([]);
    const [matches, setMatches] = useState([]);
    const [index, setIndex] = useState(0);

    const prevRiotId = useRef(null);
    const prevTagline = useRef(null);

    useEffect(() => {
        async function initialFetch() {
            try {
                // Fetch puuid
                const puuid = await getPUUID(riotId, tagline);
    
                // Fetch matches
                const matchIDs = await getMatches(puuid);
    
                // Fetch match data
                const matchData = await getMatchDatas(matchIDs, 0, 5);
    
                const newGames = matchData.map((match, index) => {
                    return <MemoizedGame key={matchIDs[index]} matchData={match} summoner={puuid} data={data} />;
                });
    
                setIndex(5);
                setPuuid(puuid);
                setGames([newGames]);
                setMatches(matchIDs);
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
        initialFetch();
        // eslint-disable-next-line
    }, [riotId, tagline]);

    async function loadMoreGames() {
        try {
            // Fetch match data
            const matchData = await getMatchDatas(matches, index, 5);
            return matchData.map((match, index) => {
                return <MemoizedGame key={matches[index]} matchData={match} summoner={puuidRef} data={data} />;
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const loadMore = () => {
        loadMoreGames().then((newGames) => {
            setGames([...games, newGames]);
            setIndex(index + 5);
        });
    }

    return (
        <div className="game-list">
            {/* {games.length === 0 ? "Invalid Input or Loading" : games} */}
            {/* We have changed games to be a 2d array */}
            {games.length === 0 ? <FontAwesomeIcon icon={faSpinner} size="2x" spin /> : games.map((game, index) => {
                return game.length === 0 ? <FontAwesomeIcon icon={faSpinner} spin /> : game.map((game, index) => {
                    return game;
                });
            })}
            {/* Option to load more */}
            { games.length !== 0 && matches.length > games.length*5 ? <LoadMore onClick={loadMore}>Load More</LoadMore> : null}
        </div>
    );
}

export default Games;
