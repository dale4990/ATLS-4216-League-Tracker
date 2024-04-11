import React from 'react';
import '../styles/About.css';
import rileyImage from '../images/riley.jpeg';
import dorjeeImage from '../images/dorj.jpeg';
import danImage from '../images/dan.jpeg';
import Home from './Home';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="About">
      <header className="About-header">
        <h1>The Team</h1>
      </header>
      <section className="Team">
        <div className="Team-member">
          <div className="pic">
            <a href="https://www.linkedin.com/in/dorjeezhang/" target="_blank">
              <img src={dorjeeImage} alt="DorjeeZ"/>
            </a>
            <div class="circle-container">
              <div class="circle">19</div>
            </div>
          </div>
          <h3>Dorjee Zhang</h3>
          <h4>CS(BS) + Sophomore + Frontend</h4>
          <p>Born in Honolulu Hawaii and a 13 year resident of Colorado, Dorjee spent his early days dabbling into games on his Nintendo 3DS. He would grow up to love Pokemon (Genesect and Greninja are his favorites) and Plants Vs. Zombies.
            He would get his first introduction to computer science during quarantine, when he came across the API for discord, an instant messaging social media platform. Dorjee would also begin playing League of Legends during the beginning
             of quarantine, resulting in a modern day addiction. In his free time, Dorjee enjoys reading stoic literature, going on walks, hitting the gym, and sleeping.
          </p>
          {/* <p><a href="https://www.linkedin.com/in/dorjeezhang/" target="_blank">Linkedin</a></p> */}
        </div>
        <div className="Team-member">
        <div className="pic">
            <a href="https://www.linkedin.com/in/daniel-juhwan-lee/" target="_blank">
              <img src={danImage} alt="DanielL"/>
            </a>
            <div class="circle-container">
              <div class="circle">22</div>
            </div>
          </div>
          <h3>Daniel Lee</h3>
          <h4>ECE(BS) + Senior + Full-Stack</h4>
          <p>Native born and raised in Colorado, Daniel has the native hiking blood in him. Spending his early days dabbling into SUPERCELL and .io games, Daniel would grow quite fond of video games. Once the quarantine days began, Daniel would 
            spend much of his time playing League of Legends, watching Clone Wars, and focusing on school. Daniel grew quite fond of computers, and, after entering college as an Electrical Engineer major, he decided to pick up a computer science 
            minor as well. Computer Systems (CSCI 2400) would bode his most difficult class. In his free time, Daniel enjoys playing League, making beats, and watching anime.
          </p>
          {/* <p><a href="https://www.linkedin.com/in/daniel-juhwan-lee/" target="_blank">Linkedin</a></p> */}
        </div>
        <div className="Team-member">
          <div className="pic">
              <a href="https://www.linkedin.com/in/riley-mei/" target="_blank">
                <img src={rileyImage} alt="RileyM"/>
              </a>
              <div class="circle-container">
                <div class="circle">20</div>
              </div>
          </div>
          <h3>Riley Mei</h3>
          <h4>CS(BA) + Junior + Frontend</h4>
          <p>Native born and raised in Colorado, Riley is a natural athlete who frequents volleyball courts, ski resorts, and rock of sorts. Riley would spend his early days playing Clash Royale and Clash of Clans, being immensly rushed with level 12 walls. 
            During quarantine, he would find enjoyment in Riot Games's VALORANT. He would quickly rise the ranks, finding himself going from Iron to Bronze to hardstuck silver, before getting boosted by some friends to Diamond. Riley would go to Summit Middle School, 
            then later on Fairview High School where he would find enjoyment in computer science.
          </p>
          {/* <p><a href="https://www.linkedin.com/in/riley-mei/" target="_blank">Linkedin</a></p> */}
        </div>
      </section>
      <div className="About-footer">
        © Zhang, Lee, Mei 2024
      </div>
    </div>
  );
}

export default About;