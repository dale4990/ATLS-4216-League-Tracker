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
      <div className="App-header">
        <p><Link to="/">Home</Link></p>
        <p><a>Dorjee Zhang</a></p>
        <p><a>Daniel Lee</a></p>
        <p><a>Riley Mei</a></p>
      </div>
      <div className="dorjee">
            <div className="header">Hi I'm Dorjee!</div>
            <div className="container">
              <p>I am currently an undergrad sophomore at the University of Colorado at Boulder studying computer science. 
                In my free time, I like to play League, read, exercise, and hit the gym. I am currently reading "Mastery" by Robert Green, and 
                my next read is "The Obstacle is the Way" by Ryan Holiday.
              </p>
              <img src={dorjeeImage} alt ="DorjeePic" className="images"/>
            </div>
      </div>
      <div className="dan">
            <div className="header">Hi I'm Daniel!</div>
            <div className="container">
              <img src={danImage} alt="DanPic" className = "images"/>
              <p>I am currently an undergrad senior at the University of Colorado at Boulder studying Electrical Engineering with a double
                 major in computer science. In my free time, I also like to play League of Legends, listen to music, create sick beatz and go bowling. 
                I will be graduating this May, and I will be so sad leaving Boulder.
              </p>
            </div>
      </div>
      <div className="riley">
            <div className="header">Hi I'm Riley!</div>
            <div className="container">
              <p>I am currently an undergrad junior at the University of Colorado at Boulder studying Computer Science with a minor in Chinese language. 
                In my free time, I like to play Valorant, climb, play volleyball, and hit the gym. I am trash at Valorant and frequently get carried by Dorjee, and currently have
                a vertical in the low thirties.
              </p>
              <img src={rileyImage} alt="RileyPic" className = "images"/>
            </div>
      </div>
      <div className="footer">
        Footer
      </div>
    </div>
  );
}

export default About;