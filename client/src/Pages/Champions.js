import React from 'react';
import '../styles/champions.css';
import championData from './assets/data/en_US/champion.json'

const Champions = () => {
  // Assuming championData has a "data" property that contains all champions
  const champions = championData.data;

  return (
    <div>
      {Object.keys(champions).map((championKey) => {
        const champion = champions[championKey];
        return (
          <div key={champion.id} className="champion">
            <h2>{champion.name}</h2>
            <p>{champion.title}</p>
            <img src={require(`./assets/img/${champion.image.full}`).default} alt={champion.name} />

            {/* <img src={`/assets/images/${champion.image.full}`} alt={champion.name} /> */}
            <p>{champion.blurb}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Champions;