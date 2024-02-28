import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import { StyledInput, StyledButton } from './StyledComponents';

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
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
    </div>
  );
}

export default App;
