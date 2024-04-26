import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ModePage.css';
import srMap from '../images/srMap.png';
import aramMap from '../images/aramMap.png';

const ModePage = () => {
    const { modeName } = useParams(); 

    if (modeName === "Summoner's Rift") {
      return (
        <div id="mode-page">
          <div>
            <h1>{modeName}</h1>
          </div>
          <div>
            <img src={srMap} alt="Summoners Rift Map" className="mode-map" />
          </div>
          <h2 className="mode-subtitle-1">
            Quickplay
          </h2>
          <h3 className="mode-description">
            Players select two positions (or one unique per player for parties of 5), a champion for each, and their gameplay and cosmetics loadouts before queueing.
            The champion selection screen is entirely absent from this queue. Successfully passing the 'Ready' check immediately starts the game.
          </h3>
          <h2 className="mode-subtitle-2">
            Draft Pick
          </h2>
          <h3 className="mode-description">
            Pick order is determined on both teams and one team is randomly designated to have the first pick.
            <br></br>
            Declaration Phase [15s]: Preparatory grace period. Players can declare their pick intent to their team.
            <br></br>
            Ban Phase [30s]: All players simultaneously execute a ban. Allied ban intent selections and locks are shown immediately, opponents' bans are not revealed.
            <br></br>
            Ban Reveal [5s]: Bans are revealed to all teams. It is possible for teams to ban the same champion.
            <br></br>
            Pick Phase [30s for 6 turns]: One team is allowed to make the first pick, then teams alternate and pick two at a time until every player has locked in their pick.
            <br></br>
            Finalization Phase [30s]: Preparatory grace period, before the game begins. There is an opportunity to initiate champion trades.
          </h3>
        </div>
      );
    }
    else if (modeName === "ARAM") {
      return (
        <div>
          <div>
            <h1>{modeName}</h1>
          </div>
          <div>
            <img src={aramMap} alt="ARAM Map" className="mode-map" />
          </div>
          <div>
            <h2 className="mode-subtitle-1">
              All Random All Mid
            </h2>
            <h3 className="mode-description">
            ARAM, abbreviation of All Random, All Mid, is a game mode in League of Legends in a 5v5 format on the Howling Abyss icon Howling Abyss, 
            where the objective is to destroy the opposing team's Nexus. The game includes an Reroll All random draft type, and a game that takes place only on one long lane 
            (specifically referencing its resemblance to Summoner's Rift icon Summoner's Rift's middle lane).
            In ARAM, players are given random champions from the available champion pool and are able to trade or reroll their picks.
            </h3>
          </div>
        </div>
      );
    }
    else if (modeName === "TFT") {
      return (
        <div>
          <div>
            <h1>{modeName}</h1>
          </div>
          <div>
            <img src={srMap} alt="Summoners Rift" className="mode-map" />
          </div>
          <p className="mode-description">
            TeamFight Tactics is a team-based strategy where 5 players pick their 5 on their team and the other 5 players pick their 5 on their opponents.
          </p>
        </div>
      );
    }
    
};

export default ModePage;