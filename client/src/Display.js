import './styles/Display.css';
//import { useState, useEffect } from "react";
import React from 'react';

function Display({ sumNames }) {
  return (
    <div className="displaySummonerNames">
        <ul>
            {sumNames.map((sumName, index) => (
                <div key={index}>{sumName}</div>
            ))}
        </ul>
    </div>
  );
}

export default Display;