import '../styles/Display.css';
import { useSelector } from 'react-redux';

function Display() { 
  const summonerNames = useSelector(state => state.matchData.summonerNames);
  const championIds = useSelector(state => state.matchData.championIds);
  const error = useSelector(state => state.matchData.error);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!summonerNames || summonerNames.length < 10) {
    return <div>No data available</div>;
  }

  const leftColumn = summonerNames.slice(0, 5);
  const rightColumn = summonerNames.slice(5, 10);

  return (
    <div className="displaySummonerNames">
      <div className="columns">
        {/* Left Column */}
        <div className="column">
          <ul>
            {leftColumn.map((summonerName, index) => (
              <div key={index}>{summonerName}</div>
            ))}
          </ul>
        </div>
        {/* Right Column */}
        <div className="column">
          <ul>
            {rightColumn.map((summonerName, index) => (
              <div key={index}>{summonerName}</div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Display;
