import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ChampPage.css';

const ChampionPage = () => {
    const { championName } = useParams(); 
    console.log(championName);
  
    return (
      <div className='champion-page'>
        <h1>{championName}</h1>
      </div>
    );
};

export default ChampionPage;