import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]); // state for Users
  const [name, setName] = useState(""); // state for name
  const [username, setUsername] = useState(""); // state for username


  useEffect(() =>{
    Axios.get("http://localhost:5069/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const createUser = () => {
    Axios.post("http://localhost:5069/createUser", {
      name : name, 
      username: username,
    }).then((response) => {
      setListOfUsers([...listOfUsers, {
        name: name,
        username: username,
      }]); // add user to end of listOfUsers list
    })
  }

  return (
    <div className="App">
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
          onChange={(event) => {
            setName(event.target.value)
          }}
        />
        <input 
          type="text" 
          placeholder='Username' 
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
