import React from 'react';
import '../styles/modes.css';
import sr from '../images/sr.jpeg';
import tft from '../images/tft.jpeg';
import aram from '../images/aram.jpeg';

function Modes() {
  return (
    <div className="modes-container">
      <h1>Modes</h1>
      <div className="mode-box">
        <img src={sr} alt="Summoners Rift" className="mode-image" />
        <div className="mode-header">Casual</div>
        <p>Classic League SR</p>
      </div>
      <div className="mode-box">
        <img src={tft} alt="Ranked Solo/Duo mode" className="mode-image" />
        <div className="mode-header">TFT</div>
        <p>Kchen's addicted to both porn and TFT</p>
      </div>
      <div className="mode-box">
        <img src={aram} alt="ARAM mode" className="mode-image" />
        <div className="mode-header">ARAM</div>
        <p>ARAM, Americans Randomly All Mid</p>
      </div>
    </div>
  );
}

export default Modes;
