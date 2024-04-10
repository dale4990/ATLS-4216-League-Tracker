import React from 'react';
import '../styles/champions.css';

const Champions = ({ champions }) => {
  return (
    <div>
      {Object.keys(champions).map((championKey) => {
        const champion = champions[championKey];
        return (
          <div key={champion.id} className="championInfo">
            <div className="nameTitle">
            <h2>{champion.name}</h2>
            <p className="title">{champion.title}</p>
            </div>
            {/* <img src={require(`./assets/img/${champion.image.full}`).default} alt={champion.name} /> */}
            <img src={`/splash/${champion.id}_0.jpg`} className="img" alt={champion.name} />
            <p className="lore">{champion.lore}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Champions;