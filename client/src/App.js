import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";

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
      const response = await Axios.post("http://localhost:5069/createUser", {
        name : name, 
        username: username,
      });
      setListOfUsers([...listOfUsers, response.data]);
      setName("");
      setUsername("");
    } catch (error) {
      setError(error.response.data.error);
    }
  }

  return (
    <div className="App">
      {error && <div>Error: {error}</div>}
      <div className="displayUsers">
        {listOfUsers.map((user, index) => (
          <div key={index}>
            <h1>Name : {user.name}</h1>
            <h1>Username: {user.username}</h1>
          </div>
        ))}
      </div>

      <div>
        <input 
          type="text" 
          placeholder='Name' 
          value={name}
          onChange={(event) => {
            setName(event.target.value)
          }}
        />
        <input 
          type="text" 
          placeholder='Username' 
          value={username}
          onChange={(event) => {
            setUsername(event.target.value)
          }}
        />
        <button onClick={createUser}> Create User</button>
      </div>
    </div>
  );
}

export default App;
