import React from 'react';
import '../styles/champions.css';

const Champions = ({ champions }) => {
  return (
    <div>
      {Object.keys(champions).map((championKey) => {
        const champion = champions[championKey];
        return (
          <div key={champion.id} className="champion">
            <h2>{champion.name}</h2>
            <p>{champion.title}</p>
            {/* <img src={require(`./assets/img/${champion.image.full}`).default} alt={champion.name} /> */}
            <img src={`/splash/${champion.id}_0.jpg`} alt={champion.name} />
            <p>{champion.blurb}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Champions;