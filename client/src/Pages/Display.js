import '../styles/Display.css';
import { useSelector } from 'react-redux';

function Display() { 
  const matchData = useSelector(state => state.matchData.matchData);
  const error = useSelector(state => state.matchData.error);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!matchData || matchData.length < 10) {
    return <div>No data available</div>;
  }

  const leftColumn = matchData.slice(0, 5);
  const rightColumn = matchData.slice(5, 10);

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
