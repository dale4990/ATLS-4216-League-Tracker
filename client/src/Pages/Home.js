import '../styles/App.css';
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchMatchDataRequest, fetchMatchDataSuccess, fetchMatchDataFailure } from '../Redux/actions';
// import About from './About';

function Home() {
  return(
    <div className="App">
      <div className='app-name'>
        <h1> LOL.GG </h1>
      </div>
    </div>
  );
}

export default Home;