import React from 'react';
import { useParams } from 'react-router-dom';

const ChampionPage = () => {
    const { championName } = useParams(); 
    console.log(championName);
  
    return (
      <div>
        <h1>Champion Page for {championName}</h1>
      </div>
    );
};

export default ChampionPage;