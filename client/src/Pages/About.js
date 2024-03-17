import React from 'react';
import '../styles/About.css';

function About() {
  return (
    <div className="About">
      <div className="App-header">
        <p><a>Dorjee Zhang</a></p>
        <p><a>Daniel Lee</a></p>
        <p><a>Riley Mei</a></p>
      </div>
      <div className="dorjee">
            <div className="header1">Hi I'm Dorjee</div>
            <div className="container">
              <p>I am currently an undergrad sophomore at the University of Colorado at Boulder studying computer science. 
                In my free time, I like to play League of Legends, read, exercise, and hit the gym. I am currently reading "Mastery" by Robert Green, and 
                my next read is "The Obstacle is the Way" by Ryan Holiday. I'm Diamond 4 in League, and my current bench press is 190x5.
              </p>

            </div>
      </div>
      <div className="dan">
            <div className="header2">Hi I'm Daniel</div>
            <div className="container">
              <p>I am currently an undergrad senior at the University of Colorado at Boulder studying Electrical Engineering with a double
                 major in computer science. In my free time, I also like to play League of Legends, listen to music, create sick beatz and go bowling. 
                I will be graduating this May, and I will be so sad leaving Boulder.
              </p>
            </div>
      </div>
      <div className="riley">
            <div className="header3">Hi I'm Riley</div>
      </div>
      <div className="footer">
        Footer
      </div>
    </div>
  );
}

export default About;