import React from 'react';
import '../styles/modes.css';
import sr from '../images/sr.jpeg';
import tft from '../images/tft.jpeg';
import aram from '../images/aram.jpeg';

function Modes() {
  return (
    <div className="modes">
      <div>
        <h1>Modes</h1>
      </div>
      <div className='modes-container'>
        <a href={`/modes/Summoner's Rift`}>
          <div className="mode-box">
              <img src={sr} alt="Summoners Rift" className="mode-image" />
              <div className="mode-header">CLASSIC</div>
              <p>Summoner's Rift</p>
          </div>
        </a>
        <a href={`/modes/ARAM`}>
          <div className="mode-box">
            <img src={aram} alt="ARAM mode" className="mode-image" />
            <div className="mode-header">ARAM</div>
            <p>All Random All Mid</p>
          </div>
        </a>
        <a href={`/modes/TFT`}>
          <div className="mode-box">
            <img src={tft} alt="TFT mode" className="mode-image" />
            <div className="mode-header">TFT</div>
            <p>TeamFight Tactics</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Modes;
