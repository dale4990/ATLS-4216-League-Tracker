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

        const findMatchDataResponse = await Axios.post("http://localhost:5069/findMatchData", {
            puuid: puuid,
        });

        // Assuming findMatchDataResponse.data is an array of match IDs
        const matchIds = findMatchDataResponse.data;

        // Display the list of match data
        alert("Match data:\n" + matchIds.map(matchId => "- " + matchId).join("\n"));

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
