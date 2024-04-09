import '../styles/App.css';
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchMatchDataRequest, fetchMatchDataSuccess, fetchMatchDataFailure } from '../Redux/actions';
// import About from './About';

function Home() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [riotId, setRiotId] = useState("");
  const [tagline, setTagline] = useState("");
  const [error, setError] = useState(null);

  const getMatchDatas = async(riotId, tagline) => {
    dispatch(fetchMatchDataRequest());
    try {
      const findUserResponse = await Axios.post("http://localhost:5069/findRiotUser", {
          riotId: riotId,
          tagline: tagline,
      });

      const puuid = findUserResponse.data.puuid;

      const findMatchesResponse = await Axios.post("http://localhost:5069/findMatches", {
          puuid: puuid,
      });

      const matchIds = findMatchesResponse.data;

      // Iterate over match IDs and fetch data concurrently for better performance
      const matchDataPromises = matchIds.map(async (matchId) => {
        const response = await Axios.post("http://localhost:5069/findMatchData", {
            matchId,
        });
        return response.data; 
      });

      // Wait for all requests to finish and retrieve their data
      const matchData = await Promise.all(matchDataPromises);
    
      const gameDurations = [];
      matchData.forEach(data => {
        const duration = data.gameDuration;
        gameDurations.push(duration);
      });


      // Extract summoner names from each match and update the state
      const summonerNames = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.summonerName),
        ];
      }, []);

      const summonerLevel = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.summonerLevel),
        ];
      }, []);

      // Extract champion IDs from each match and update the state
      const championIds = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.championId),
        ];
      }, []);

      // Extract items0-6 from each match and update the state 
      const items0 = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.item0),
        ];
      }, []);
      const items1 = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.item1),
        ];
      }, []);
      const items2 = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.item2),
        ];
      }, []);
      const items3 = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.item3),
        ];
      }, []);
      const items4 = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.item4),
        ];
      }, []);
      const items5 = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.item5),
        ];
      }, []);
      const items6 = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.item6),
        ];
      }, []);

      // Extact K/D/A from each match and update the state
      const kills = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.kills),
        ];
      }, []);
      const deaths = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.deaths),
        ];
      }, []);
      const assists = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.assists),
        ];
      }, []);
      const primaryRune = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.perks.primaryRune),
        ];
      }, []);
      const secondaryStyle = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.perks.secondaryStyle),
        ];
      }, []);
      const summoner1Id = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.summonerSpell1),
        ];
      }, []);
      const summoner2Id = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.summonerSpell2),
        ];
      }, []);
      const totalDamageDealtToChampions = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.totalDamageDealtToChampions),
        ];
      }, []);
      const totalDamageTaken = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.totalDamageTaken),
        ];
      }, []);
      const totalMinionsKilled = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.totalMinionsKilled),
        ];
      }, []);
      const wins = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.win),
        ];
      }, []);



      //setSumNames(summonerNames);

      // Dispatch success action with all sets of data
      dispatch(fetchMatchDataSuccess(
        gameDurations, summonerNames, summonerLevel, championIds, 
        items0, items1, items2, items3, items4, items5, items6, 
        kills, deaths, assists, primaryRune, secondaryStyle, summoner1Id, summoner2Id,
        totalDamageDealtToChampions, totalDamageTaken, totalMinionsKilled, wins)
      );
      
      // Display only the requested participant data
      console.log("Match data:");
      for (const data of matchData) {
          const participants = data.participants;
          for (const participant of participants) {
              console.log(`  Summoner Name: ${participant.summonerName}`);
              console.log(`  Champion Name/ID: ${participant.championId}`); 
              console.log(`  Summoner Level: ${participant.summonerLevel}`);
              console.log(`  item0: ${participant.item0}`);
              console.log(`  item1: ${participant.item1}`);
              console.log(`  item2: ${participant.item2}`);
              console.log(`  item3: ${participant.item3}`);
              console.log(`  item4: ${participant.item4}`);
              console.log(`  item5: ${participant.item5}`);
              console.log(`  item6: ${participant.item6}`);
              console.log(`  kills: ${participant.kills}`);
              console.log(`  deaths: ${participant.deaths}`);
              console.log(`  assists: ${participant.assists}`);
              console.log(`  primaryRune: ${participant.perks.primaryRune}`);
              console.log(`  secondaryStyle: ${participant.perks.secondaryStyle}`);
              console.log(`  totalDamageDealtToChampions: ${participant.totalDamageDealtToChampions}`);
              console.log(`  win: ${participant.win}`);

              // ... 
          }
      }
        setRiotId("");
        setTagline("");
        setError(null);

        // Navigate to display route with riotId and tagline
        navigate(`/display/${riotId}/${tagline}`);
        // return summonerNames;
    }
    catch(error){
        setError(error.response.data.error);
        dispatch(fetchMatchDataFailure(error));
    }
  }

  const storeId = (riotId, tagline) => {
    //
  }
  
  return(
    <div className="App">
      {error && <div>Error: {error}</div>}
      <div className="App-header">
        <ul className="left-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
        <ul className="right-links">
          <li><a href="/champions">Champions</a></li>
          <li><a href="google.com">Modes</a></li>
        </ul>
      </div>

      <div className='App-name'>
        <h1> LOL.GG </h1>
      </div>
      <div className="input-container">
        <input
          className='StyledInput'
          type="text"
          placeholder='Riot ID'
          value={riotId}
          onChange={(event) => {
            setRiotId(event.target.value)
          }}
        />
        <input
          className='StyledInput'
          type="text"
          placeholder='Tagline'
          value={tagline}
          onChange={(event) => {
            setTagline(event.target.value)
          }}
        />
        <button className="StyledButton" onClick={() => storeId(riotId, tagline)}>Search</button>
      </div> 
    </div>
  );
}

export default Home;