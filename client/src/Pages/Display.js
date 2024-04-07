import '../styles/Display.css';
import { useSelector } from 'react-redux';
import championData from '../assets/data/en_US/champion.json';
import runesReforged from '../assets/data/en_US/runesReforged.json';
import summonerData from '../assets/data/en_US/summoner.json';

function Display() { 
  const gameDuration = useSelector(state => state.matchData.gameDuration);
  const summonerNames = useSelector(state => state.matchData.summonerNames);
  const summonerLevel = useSelector(state => state.matchData.summonerLevel);
  const championIds = useSelector(state => state.matchData.championIds);
  const item0 = useSelector(state => state.matchData.item0);
  const item1 = useSelector(state => state.matchData.item1);
  const item2 = useSelector(state => state.matchData.item2);
  const item3 = useSelector(state => state.matchData.item3);
  const item4 = useSelector(state => state.matchData.item4);
  const item5 = useSelector(state => state.matchData.item5);
  const item6 = useSelector(state => state.matchData.item6);
  const kills = useSelector(state => state.matchData.kills);
  const deaths = useSelector(state => state.matchData.deaths);
  const assists = useSelector(state => state.matchData.assists);
  const primaryRune = useSelector(state => state.matchData.primaryRune);
  const secondaryStyle = useSelector(state => state.matchData.secondaryStyle);
  const summoner1Id = useSelector(state => state.matchData.summoner1Id);
  const summoner2Id = useSelector(state => state.matchData.summoner2Id);
  const totalDamageDealt = useSelector(state => state.matchData.totalDamageDealt);
  const totalDamageTaken = useSelector(state => state.matchData.totalDamageTaken);
  const totalMinionsKilled = useSelector(state => state.matchData.totalMinionsKilled);
  const win = useSelector(state => state.matchData.win);
  
  const error = useSelector(state => state.matchData.error);


  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!summonerNames || summonerNames.length < 10) {
    return <div>No data available</div>;
  }

  const leftColumn = summonerNames.slice(0,5);
  const rightColumn = summonerNames.slice(5,10);

  // Call the function to get the champion image map
  const championImageMap = parseChampionData();

  const summonerImageMap = parseSummonerData();



  // return (
  //   <div className="displaySummonerNames">
  //     <div className="columns">
  //       {/* Left Column */}
  //       <div className="column">
  //         <ul>
  //           {leftColumn.map((summonerName, index) => {
  //             return (
  //               <div key={index}>
  //                 <img src={`/champion/${championImageMap[championIds[index]]}`} alt={championIds[index]} />
  //                 <div className="image-container">
  //                   <img src={`/item/${item0[index]}.png`} />
  //                   <img src={`/item/${item1[index]}.png`} />
  //                   <img src={`/item/${item2[index]}.png`} />
  //                   <img src={`/item/${item3[index]}.png`} />
  //                   <img src={`/item/${item4[index]}.png`} />
  //                   <img src={`/item/${item5[index]}.png`} />
  //                   <img src={`/item/${item6[index]}.png`} />
  //                 </div>
  //                 <div className="image-container">
  //                   <img src={`/${mapRuneIdToIcon(primaryRune[index])}`} />
  //                   <img src={`/${mapStyleIdToIcon(secondaryStyle[index])}`} />
  //                 </div>
  //                 <div className="image-container">
  //                   <img src={`/spell/${summonerImageMap[summoner1Id[index]]}`} />
  //                   <img src={`/spell/${summonerImageMap[summoner2Id[index]]}`} />
  //                 </div>
                  
  //                 {summonerName}
  //                 <div> {kills[index]}/{deaths[index]}/{assists[index]}</div>
                  
  //               </div>
  //             );
  //           })}
  //         </ul>
  //       </div>
  //       {/* Right Column */}
  //       <div className="column">
  //         <ul>
  //           {rightColumn.map((summonerName, index) => {
  //             return (
  //               <div key={index}>
  //                 <img src={`/champImages/${championImageMap[championIds[index+5]]}`} alt={championIds[index+5]} />
  //                 <div className="image-container">
  //                   <img src={`/item/${item0[index+5]}.png`} />
  //                   <img src={`/item/${item1[index+5]}.png`} />
  //                   <img src={`/item/${item2[index+5]}.png`} />
  //                   <img src={`/item/${item3[index+5]}.png`} />
  //                   <img src={`/item/${item4[index+5]}.png`} />
  //                   <img src={`/item/${item5[index+5]}.png`} />
  //                   <img src={`/item/${item6[index+5]}.png`} />
  //                 </div>
  //                 <div className="image-container">
  //                   <img src={`/${mapRuneIdToIcon(primaryRune[index+5])}`} />
  //                   <img src={`/${mapStyleIdToIcon(secondaryStyle[index+5])}`} />
  //                 </div>
  //                 <div className="image-container">
  //                   <img src={`/spell/${summonerImageMap[summoner1Id[index+5]]}`} />
  //                   <img src={`/spell/${summonerImageMap[summoner2Id[index+5]]}`} />
  //                 </div>
  //                 {summonerName}
  //                 <div> {kills[index+5]}/{deaths[index+5]}/{assists[index+5]}</div>
  //               </div>
  //             );
  //           })}
  //         </ul>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className={`matchOverview`}>
      <div className= {win[0] ? 'team blue': 'team red'}>
        <h2>{win[0] ? 'Win' : 'Lose'}</h2>
        {leftColumn.map((summonerName, index) => (
          <div key={index} className="summoner">
            <div className="summoner-container">
              <img src={`/champion/${championImageMap[championIds[index]]}`} alt={championIds[index]} className="summoner-icon"/>
              <div className="image-container">
                <div className="rune-style-container">
                  <div className="black-circle"></div>
                  <img src={`/${mapRuneIdToIcon(primaryRune[index])}`} />
                  <img src={`/${mapStyleIdToIcon(secondaryStyle[index])}`} className='secondary-path'/>
                </div>
                <div className="summoner-spell-container">
                  <img src={`/spell/${summonerImageMap[summoner1Id[index]]}`} />
                  <img src={`/spell/${summonerImageMap[summoner2Id[index]]}`} />
                </div>
            </div>  
            </div>
            <div className="summoner-info">
              <div className="name">{summonerName}</div>
              <div className="name"> Level {summonerLevel[index]} </div>
            </div>
            <div className='kda-container'>
              <div> {kills[index]}/{deaths[index]}/{assists[index]}</div>
              <div className='kda'>{`${calculateKdaRatio(kills[index], deaths[index], assists[index])}:1`}</div>
            </div>
            <div className="stats-container">
              Dmg Dealt
              <div> {totalDamageDealt[index]} </div>
            </div>
            <div className="stats-container">
              Dmg Taken
              <div> {totalDamageTaken[index]} </div>
            </div>
            <div className="stats-container">
              CS/m
              <div> {calculateCSPerMin(totalMinionsKilled[index], gameDuration[0])} </div>
            </div>
            <div className="item-container">
              <img src={`/item/${item0[index]}.png`} />
              <img src={`/item/${item1[index]}.png`} />
              <img src={`/item/${item2[index]}.png`} />
              <img src={`/item/${item3[index]}.png`} />
              <img src={`/item/${item4[index]}.png`} />
              <img src={`/item/${item5[index]}.png`} />
              <img src={`/item/${item6[index]}.png`} />
            </div>
          </div>
        ))}
      </div>
      <div className={win[5] ? 'team blue': 'team red'}>
        <h2>{win[5] ? 'Win' : 'Lose'}</h2>
        {rightColumn.map((summonerName, index) => (
            <div key={index} className="summoner">
            <div className="summoner-container">
              <img src={`/champion/${championImageMap[championIds[index+5]]}`} alt={championIds[index+5]} className="summoner-icon"/>
              <div className="image-container">
                <div className="rune-style-container">
                  <div className="black-circle"></div>
                  <img src={`/${mapRuneIdToIcon(primaryRune[index+5])}`} />
                  <img src={`/${mapStyleIdToIcon(secondaryStyle[index+5])}`} className='secondary-path'/>
                </div>
                <div className="summoner-spell-container">
                  <img src={`/spell/${summonerImageMap[summoner1Id[index+5]]}`} />
                  <img src={`/spell/${summonerImageMap[summoner2Id[index+5]]}`} />
                </div>
            </div>  
            </div>
            <div className="summoner-info">
              <div className="name">{summonerName}</div>
              <div className="name"> Level {summonerLevel[index+5]} </div>
            </div>
            <div className='kda-container'>
              <div> {kills[index]}/{deaths[index]}/{assists[index+5]}</div>
              <div className='kda'>{`${calculateKdaRatio(kills[index+5], deaths[index+5], assists[index+5])}:1`}</div>
            </div>
            <div className="stats-container">
              Dmg Dealt
              <div> {totalDamageDealt[index+5]} </div>
            </div>
            <div className="stats-container">
              Dmg Taken
              <div> {totalDamageTaken[index+5]} </div>
            </div>
            <div className="stats-container">
              CS/m
              <div> {calculateCSPerMin(totalMinionsKilled[index+5], gameDuration[0])} </div>
            </div>
            <div className="item-container">
              <img src={`/item/${item0[index+5]}.png`} />
              <img src={`/item/${item1[index+5]}.png`} />
              <img src={`/item/${item2[index+5]}.png`} />
              <img src={`/item/${item3[index+5]}.png`} />
              <img src={`/item/${item4[index+5]}.png`} />
              <img src={`/item/${item5[index+5]}.png`} />
              <img src={`/item/${item6[index+5]}.png`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// Function to parse champion data and create a map linking champion keys to image filenames
const parseChampionData = () => {
  const championImageMap = {};
  const champions = championData.data;

  for (const championKey in champions) {
    if (Object.hasOwnProperty.call(champions, championKey)) {
      const champion = champions[championKey];
      const championId = champion.key;
      const championImage = champion.image.full;
      championImageMap[championId] = championImage;
    }
  }

  return championImageMap;
};

const parseSummonerData = () => {
  const summonerImageMap = {};
  const summoners = summonerData.data;

  for (const summonerKey in summoners) {
    if (Object.hasOwnProperty.call(summoners, summonerKey)) {
      const summoner = summoners[summonerKey];
      const summonerId = summoner.key;
      const summonerImage = summoner.image.full;
      summonerImageMap[summonerId] = summonerImage;
    }
  }

  return summonerImageMap;
};


const mapRuneIdToIcon = (runeId) => {
  for (const style of runesReforged) {
    for (const slot of style.slots) {
      for (const rune of slot.runes) {
        if (rune.id === runeId) {
          return rune.icon;
        }
      }
    }
  }
  return ""; 
};

const mapStyleIdToIcon = (styleId) => {
  for (const style of runesReforged) {
        if (style.id === styleId) {
          return style.icon;
        }
      }
  return ""; 
};

const calculateKdaRatio = (kills, deaths, assists) => {
  if (deaths === 0) {
      return ("Perfect"); 
  } else {
      return ((kills + assists) / deaths).toFixed(2);
  }
};

const formatGameDuration = (durationInSeconds) => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const calculateCSPerMin = (totalMinionsKilled, gameDurationInSeconds) => {
  const gameDurationInMinutes = Math.floor(gameDurationInSeconds / 60);
  return (totalMinionsKilled / gameDurationInMinutes).toFixed(1) + ` (${totalMinionsKilled})`;
};

export default Display;