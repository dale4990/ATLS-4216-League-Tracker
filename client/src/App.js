import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import { StyledInput, StyledButton } from './StyledComponents';

function App() {
  // states
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const[riotId, setRiotId] = useState("");
  const[tagline, setTagline] = useState("");
  const [error, setError] = useState(null);

  useEffect(() =>{
    Axios.get("http://localhost:5069/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const createUser = async () => {
    try {
        // Check if the username already exists
        const usernameExists = listOfUsers.some(user => user.username === username);
        if (usernameExists) {
            setError("Username already exists. Please choose a different username.");
            return;
        }

        // If the username is unique, proceed to create the user
        const response = await Axios.post("http://localhost:5069/createUser", {
            name: name, 
            username: username,
        });
        setListOfUsers([...listOfUsers, response.data]);
        setName("");
        setUsername("");
        setError(null);
    } catch (error) {
        setError(error.response.data.error);
    }
  }


  const deleteUser = async (userId) => {
    try {
      const response = await Axios.post("http://localhost:5069/deleteUser", {
        userId: userId, 
      });
      console.log("User deleted successfully:", response.data);
      setListOfUsers(listOfUsers.filter(user => user.userId !== userId));
    } catch (error){
      setError(error.response.data.error);
    }
  }

  const displayMatchHistory = async (riotId, tagline) => {
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
          return response.data; // Return only the data
      });

      // Wait for all requests to finish and retrieve their data
      const matchData = await Promise.all(matchDataPromises);

      // Display only the requested participant data
      console.log("Match data:");
      for (const data of matchData) {
          const participants = data.participants;
          for (const participant of participants) {
              console.log(`  Summoner Name: ${participant.summonerName}`);
              console.log(`  Champion Name/ID: ${participant.championName}`); // Assuming you have champion names
              console.log(`  Summoner Level: ${participant.summonerLevel}`);
              // ... 
          }
      }
      

        // Display the list of match data
        //console.log("Match data:\n" + matchIds.map(matchId => "- " + matchId).join("\n"));

        // Reset input fields and errors
        setRiotId("");
        setTagline("");
        setError(null);
    } catch (error) {
        setError(error.response.data.error);
    }
  }
 

  
  // Frontend design here
  return (
    <div className="App">
      {error && <div>Error: {error}</div>}
      <div className="displayUsers">
        {listOfUsers.map((user, index) => (
          <div key={index}>
            <h1>Hi {user.name}@{user.username}!</h1>
            <StyledButton onClick={() => deleteUser(user.userId)}> Delete User</StyledButton>
          </div>
        ))}
      </div>

      <div>
        <h1> Add Users Test </h1>
      </div>

      <div className="input-container">
        <StyledInput
          type="text"
          placeholder='Name'
          value={name}
          onChange={(event) => {
            setName(event.target.value)
          }}
        />
        <StyledInput
          type="text"
          placeholder='Username'
          value={username}
          onChange={(event) => {
            setUsername(event.target.value)
          }}
        />
        <StyledButton onClick={createUser}>Create User</StyledButton>
      </div>

      <div>
        <h1> Summoner Search </h1>
      </div>

      <div className="input-container">
        <StyledInput
          type="text"
          placeholder='Riot ID'
          value={riotId}
          onChange={(event) => {
            setRiotId(event.target.value)
          }}
        />
        <StyledInput
          type="text"
          placeholder='Tagline'
          value={tagline}
          onChange={(event) => {
            setTagline(event.target.value)
          }}
        />
        <StyledButton onClick={() => displayMatchHistory(riotId, tagline)}>Search</StyledButton>
      </div>
    </div>
  );
}

export default App;
