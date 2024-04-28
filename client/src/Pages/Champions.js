import React from 'react';
import '../styles/champions.css';

const Champions = ({ champions }) => {
  return (
    <div className="champions-container">
      {Object.keys(champions).map((championKey) => {
        const champion = champions[championKey];
        return (
          <a href={`/champions/${champion.id}`}>
            <div key={champion.id} className="champion-class">
              <img src={`/splash/${champion.id}_0.jpg`} className="champion-img" alt={champion.name} />
              <div className="champion-info">
                <h2 className="champion-name">{champion.name.toUpperCase()}</h2>
                <p className="champion-title">{champion.title.toUpperCase()}</p>
                {/* <p className="champion-lore">{champion.lore}</p> */}
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default Champions;
