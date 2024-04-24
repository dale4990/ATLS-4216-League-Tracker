import React from 'react';
import { useParams } from 'react-router-dom';

const ModePage = () => {
    const { modeName } = useParams(); 

    if (modeName === "Summoner's Rift") {
      return (
        <div>
          <h1>{modeName}</h1>
        </div>
      );
    }
    else if (modeName === "ARAM") {
      return (
        <div>
          <h1>{modeName}</h1>
        </div>
      );
    }
    else if (modeName === "TFT") {
      return (
        <div>
          <h1>{modeName}</h1>
        </div>
      );
    }
    
};

export default ModePage;