import '../styles/App.css';
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchMatchDataRequest, fetchMatchDataSuccess, fetchMatchDataFailure } from '../Redux/actions';
import About from './About';

function Home() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [listOfUsers, setListOfUsers] = useState([]);
  // const [name, setName] = useState("");
  // const [username, setUsername] = useState("");
  const [riotId, setRiotId] = useState("");
  const [tagline, setTagline] = useState("");
  //const [sumNames, setSumNames] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() =>{
  //   Axios.get("http://localhost:5069/getUsers").then((response) => {
  //     setListOfUsers(response.data);
  //   });
  // }, []);

  // const createUser = async () => {
  //   try {
  //       // Check if the username already exists
  //       const usernameExists = listOfUsers.some(user => user.username === username);
  //       if (usernameExists) {
  //           setError("Username already exists. Please choose a different username.");
  //           return;
  //       }

  //       // If the username is unique, proceed to create the user
  //       const response = await Axios.post("http://localhost:5069/createUser", {
  //           name: name, 
  //           username: username,
  //       });
  //       setListOfUsers([...listOfUsers, response.data]);
  //       setName("");
  //       setUsername("");
  //       setError(null);
  //   } catch (error) {
  //       setError(error.response.data.error);
  //   }
  // }


  // const deleteUser = async (userId) => {
  //   try {
  //     const response = await Axios.post("http://localhost:5069/deleteUser", {
  //       userId: userId, 
  //     });
  //     console.log("User deleted successfully:", response.data);
  //     setListOfUsers(listOfUsers.filter(user => user.userId !== userId));
  //   } catch (error){
  //     setError(error.response.data.error);
  //   }
  // }

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
  
      // Extract summoner names from each match and update the state
      const summonerNames = matchData.reduce((acc, cur) => {
        return [
            ...acc,
            ...cur.participants.map((participant) => participant.summonerName),
        ];
      }, []);
      //setSumNames(summonerNames);
      
      // Display only the requested participant data
      console.log("Match data:");
      for (const data of matchData) {
          const participants = data.participants;
          for (const participant of participants) {
              console.log(`  Summoner Name: ${participant.summonerName}`);
              console.log(`  Champion Name/ID: ${participant.championId}`); 
              console.log(`  Summoner Level: ${participant.summonerLevel}`);
              // ... 
          }
      }
        setRiotId("");
        setTagline("");
        setError(null);
        return summonerNames;
    }
    catch(error){
        dispatch(fetchMatchDataFailure(error));
    }
  }

  const displayMatchHistory = (riotId, tagline) => {
    getMatchDatas(riotId, tagline)
      .then((sumNames) => {
        dispatch(fetchMatchDataSuccess(sumNames));
        navigate(`/display/${riotId}/${tagline}`);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };
  
  return(
    <div className="App">
      {error && <div>Error: {error}</div>}
      <div className="App-header">
        <ul className="left-links">
          <li><a href="google.com">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
        <ul className="right-links">
          <li><a href="google.com">Champions</a></li>
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
        <button className="StyledButton" onClick={() => displayMatchHistory(riotId, tagline)}>Search</button>
      </div> 
      {/* <div className="displaySummonerNames">
        <ul>
            {sumNames.map((sumName, index) => (
                <div key={index}>{sumName}</div>
            ))}
        </ul>
            </div>*/}
    </div>
  );
}

export default Home;