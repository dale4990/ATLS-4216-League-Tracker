import React from 'react';
import '../../styles/Games.css';

// Function to convert seconds to a string of the form "Xh Ym Zs"
function secondsToHMS(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 3600 % 60);
    let hDisplay = h > 0 ? h + (h === 1 ? "h " : "h ") : "";
    let mDisplay = m > 0 ? m + (m === 1 ? "m " : "m ") : "";
    let sDisplay = s > 0 ? s + (s === 1 ? "s" : "s") : "";
    return hDisplay + mDisplay + sDisplay;
}

// Function to convert timestamp in milliseconds to a string "X hours ago" or "X minutes ago" or "X days ago"
// For minutes, round down to the nearest minute
// If it reachest 60 minutes, round down to the nearest hour
// If it reaches 24 hours, round down to the nearest day
// If it reaches 1 day, return "a day ago"
// If it reaches 1 hour, return "an hour ago"
function timestampToAgo(timestamp) {
    let now = new Date();
    let then = new Date(timestamp);
    let diff = now - then;
    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let months = Math.floor(days / 30);

    if (months > 0) {
        return months === 1 ? "a month ago" : months + " months ago";
    }
    if (days > 0) {
        return days === 1 ? "a day ago" : days + " days ago";
    }
    if (hours > 0) {
        return hours === 1 ? "an hour ago" : hours + " hours ago";
    }
    if (minutes > 0) {
        return minutes === 1 ? "a minute ago" : minutes + " minutes ago";
    }
    return seconds === 1 ? "a second ago" : seconds + " seconds ago";
}

// Returns a list of items that the player has in their inventory
function getMyItems(isMe, win) {
    const { item0, item1, item2, item3, item4, item5, item6 } = isMe;
    const items = [item0, item1, item2, item3, item4, item5];

    // /item/{item}.png
    // If item is 0, return an empty item slot; item6 is className="trinket"
    const itemDivs = items.map(item => {
        if (item === 0) return <dd className="items" style={{backgroundColor: win ? '#2f436e' : '#703c47'}}></dd>;
        return <dd><div className="item" style={{position: 'relative'}}><img src={`/item/${item}.png`} width="22" height="22" alt="Who cares right now" /></div></dd>;
    });

    // Add trinket to the end of the list
    itemDivs.push(<dd><div className="trinket" style={{position: 'relative'}}><img src={`/item/${item6}.png`} width="22" height="22" alt="Trinket" /></div></dd>);

    return itemDivs;
}

function determineHighestKillType(doubleKills, tripleKills, quadraKills, pentaKills) {
    let highestKillType = '';

    if (pentaKills > 0) {
        highestKillType = 'Penta Kill';
    } else if (quadraKills > 0) {
        highestKillType = 'Quadra Kill';
    } else if (tripleKills > 0) {
        highestKillType = 'Triple Kill';
    } else if (doubleKills > 0) {
        highestKillType = 'Double Kill';
    }

    return highestKillType;
}

function calculateAverageRank(playerRanks) {
    const rankValues = {
      "iron 4": 0,
      "iron 3": 100,
      "iron 2": 200,
      "iron 1": 300,
      "bronze 4": 400,
      "bronze 3": 500,
      "bronze 2": 600,
      "bronze 1": 700,
      "silver 4": 800,
      "silver 3": 900,
      "silver 2": 1000,
      "silver 1": 1100, 
      "gold 4": 1200,
      "gold 3": 1300,
      "gold 2": 1400,
      "gold 1": 1500,
      "platinum 4": 1600,
      "platinum 3": 1700,
      "platinum 2": 1800,
      "platinum 1": 1900,
      "emerald 4": 2000,
      "emerald 3": 2100,
      "emerald 2": 2200,
      "emerald 1": 2300,
      "diamond 4": 2400,
      "diamond 3": 2500,
      "diamond 2": 2600,
      "diamond 1": 2700,
      "master 1": 2800,
      "grandmaster 1": 2900,
      "challenger 1": 3000
    };

    // Don't include unranked players in the average
    const filteredRanks = playerRanks.filter(rank => rank !== "unranked");

    if (filteredRanks.length === 0) return "unranked";
  
    const total = filteredRanks.reduce((acc, cur) => acc + rankValues[cur], 0);
    const average = total / filteredRanks.length;
    const roundedAverage = Math.round(average / 100) * 100;

    // Find the rank that corresponds to the rounded average
    const rankKeys = Object.keys(rankValues);
    const averageRank = rankKeys.find(rank => rankValues[rank] === roundedAverage);

    if (averageRank.includes("master") || averageRank.includes("grandmaster") || averageRank.includes("challenger")) {
      return averageRank.slice(0, -2);
    }

    return averageRank;
}

function Game({matchData, summoner, data}) {
    const { champions: champDict, summoners: summDict, runes, championImageMap } = data;
    const gameMode = matchData.gameMode;
    const gameDuration = secondsToHMS(matchData.gameDuration);
    const timestampString = timestampToAgo(matchData.gameEndTimestamp);

    const isMe = matchData.participants.find(participant => participant.puuid === summoner);
    const { win, kills, deaths, assists, championLevel, championId, totalMinionsKilled, neutralMinionsKilled, kda, killParticipation, controlWardsPurchased,
    doubleKills, tripleKills, quadraKills, pentaKills} = isMe;
    const remake = matchData.gameDuration < 209 ? true : false;    
    const averageRanks = matchData.participants.map(participant => participant.rank);
    const averageRank = calculateAverageRank(averageRanks);

    const myChampionEntry = Object.entries(champDict).find(([key, champion]) => champion.key === championId);
    const myChampion = myChampionEntry ? myChampionEntry[1] : null;

    const getMySummRunes = () => {
        const { summonerSpell1, summonerSpell2, perks } = isMe;
        const { primaryRune, secondaryStyle } = perks;
        
        const firstSpell = Object.entries(summDict).find(([key, spell]) => spell.key === summonerSpell1);
        const secondSpell = Object.entries(summDict).find(([key, spell]) => spell.key === summonerSpell2);

        const firstSpellDiv = <div className="spell" style={{position: 'relative'}}><img src={`/spell/${firstSpell[1].id}.png`} width="22" height="22" alt={firstSpell[1].name} /></div>;
        const secondSpellDiv = <div className="spell" style={{position: 'relative'}}><img src={`/spell/${secondSpell[1].id}.png`} width="22" height="22" alt={secondSpell[1].name} /></div>;
        
        // runes is an array instead of a dictionary; it holds an array of rune trees, each of which has another array stored in the "slots" key, which holds rows of runes
        // The firstRune will be found by iterating through each nested array and finding the first rune that matches the ID of the first rune in the primary tree
        // The secondRune will be found by iterating only through the outer array and finding the first rune that matches the ID of the first rune in the secondary tree
        const findFirstRune = () => {
            for (const tree of runes) {
                for (const slot of tree.slots) {
                    const runes = slot.runes;
                    const rune = runes.find(rune => rune.id === primaryRune);
                    if (rune) return rune;
                }
            }
        }
        const firstRune = findFirstRune();
        const secondRune = runes.find(tree => tree.id === secondaryStyle);

        const firstRuneDiv = <div className="rune rune-primary" style={{position: 'relative', backgroundColor: 'black', borderRadius: '50%'}}><img src={`/${firstRune.icon}`} width="22" height="22" alt={firstRune.name} /></div>;
        const secondRuneDiv = <div className="rune" style={{position: 'relative'}}><img src={`/${secondRune.icon}`} width="22" height="22" alt={secondRune.name} /></div>;

        return [ [firstSpellDiv, secondSpellDiv], [firstRuneDiv, secondRuneDiv] ];
    }
    
    const [ mySpells, myRunes ] = getMySummRunes();
    const itemList = getMyItems(isMe, win);

    const winColor = remake ? "#1E2328" : (win ? "#28344e" : "#59343b");
    const gameColor = remake ? "#bebebe" : (win ? "#5383e8" : "#e84057");
    const buttonColor = gameColor;
    const actionsColor = remake ? "#3C3C41" : (win ? "#2f436e" : "#703c47");
    
    // Calculated states
    const kdaString = kda.toFixed(2).replace(/\.0$/, '') + ":1 KDA";
    const kp = Math.round(killParticipation*100);
    const cs = totalMinionsKilled + neutralMinionsKilled;
    const csm = (cs / (matchData.gameDuration / 60)).toFixed(1).replace(/\.0$/, '');


    return(
        <div className="outer" >
            <div className="deco" style={{ backgroundColor: gameColor }}></div>
            <div className="contents" style={{ backgroundColor: winColor }}>
                <div className="inner" >
                    <div className="timestamp-details">
                        <div className="head-group" >
                            <div className="game-type" style={{ color: gameColor }}>{gameMode}</div>
                            <div className="timestamp">
                                <div className style={{position: 'relative'}}>{timestampString}</div>
                            </div> {/* timestamp */}
                        </div> {/* head-group */}

                        <div className= "divider" style={{backgroundColor: win ? '#2f436e' : '#703c47'}}></div>

                        <div className="head-group">
                            <div className="result">{remake ? "Remake" : (win ? "Victory" : "Defeat")}</div>
                            <div className="duration">{gameDuration}</div>
                        </div> {/* head-group */}
                    </div> {/* timestamp-details */}

                    <div className="player-stats">
                        <div className="main">
                            <div className="info">
                                <a target="_blank" rel="noreferrer" className="champion" href="/champions">
                                    <img src={`/champion/${myChampion.id}.png`} width="48" height="48" alt={myChampion.name} />
                                    <span className="champion-level">{championLevel}</span>
                                </a> {/* champion */}

                                <div className="summ-runes-container">
                                    <div className="summ-runes">
                                        {mySpells}
                                    </div> {/* summ-runes */}

                                    <div className="summ-runes">
                                        {myRunes}
                                    </div> {/* summ-runes */}
                                </div> {/* summ-runes-container */}
                            </div> {/* info */}

                            <div className="kda-stats">
                                <div className="kda">
                                    <span>{kills}</span>
                                    /
                                    <span className="d">{deaths}</span>
                                    /
                                    <span>{assists}</span>
                                </div> {/* kda */}

                                <div className="kda-ratio">{kdaString}</div>
                            </div> {/* kda-stats */}

                            <div className="game-stats" style={{borderColor: win ? '#2f436e' : '#703c47'}}>
                                <div className="p-kill">
                                    <div className style={{position: 'relative'}}>P/Kill {kp}%</div>
                                </div> {/* p-kill */}

                                <div className="ward">Control Ward {controlWardsPurchased}</div>

                                <div className="cs">
                                    <div className style={{position: 'relative'}}>CS {cs} ({csm})</div>
                                </div> {/* cs */}

                                <div className="avg-tier">
                                    <div className style={{position: 'relative'}}>{averageRank}</div>
                                </div> {/* avg-tier */}
                            </div> {/* game-stats */}
                        </div> {/* main */}

                        <div className="sub" >
                            <dl className="items">
                                {itemList}
                            </dl> {/* items */}

                            <div className="game-tags__scroll-container">
                                <div className="game-tags" >
                                {determineHighestKillType(doubleKills, tripleKills, quadraKills, pentaKills) !== '' ? (
                                    <div className="tag kill-tag">{ determineHighestKillType(doubleKills, tripleKills, quadraKills, pentaKills)}</div>
                                ) : null}
                                </div> {/* game-tags */}
                            </div> {/* game-tags__scroll-container */}
                        </div> {/* sub */}
                    </div> {/* player-stats */}

                    <div className="player-list">
                        {matchData.participants.map(participant => (
                            <div className="player">
                                <div className="icon" style={{position: 'relative'}}>
                                    <img src={`/champion/${championImageMap[participant.championId]}`} style={{borderRadius: "3px", border: "none", height: "16px", width: "16px"}} alt={`"${participant.championName}"`} />
                                </div>
                                <div className="name">
                                    <div className="summoner-tooltip" style={{position: 'relative'}}>
                                        <a target="_blank" rel="noopener noreferrer" href={`/display/${participant.riotIdGameName}/${participant.riotIdTagline}`}>
                                            <div className="teammate-name teammate-align" style={{color: (participant.puuid === summoner ? "#FFFFFF" : "#9e9eb1")}}>
                                                <span className="team-name-font team-name-align">{(participant.riotIdGameName.length === 0 ? "??????????" : participant.riotIdGameName)}</span>
                                            </div> {/* teammate-name */}
                                        </a> {/* teammate-link */}
                                    </div> {/* summoner-tooltip */}
                                </div> {/* name */}
                            </div> // player
                        ))}
                    </div> {/* player-list */}
                </div> {/* inner */}
            </div> {/* contents */}
            
            <div className="actions">
                <div></div>
                
                <button className="button" style={{backgroundColor: actionsColor}}>
                    <span className="svg-icon svg-icon--arrow-down button-display" style={{color: buttonColor, width: "24px", height: "24px"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <g fill="currentColor" fillRule="evenodd">
                                <g fill="currentColor" fillRule="nonzero">
                                    <g fill="currentColor">
                                        <path d="M12 13.2L16.5 9 18 10.4 12 16 6 10.4 7.5 9z" transform="translate(-64 -228) translate(64 228)" fill="currentColor"></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </span>
                </button> {/* button */}
            </div> {/* actions */}
        </div>
    )
}

// Memoize the Game component to prevent unnecessary re-renders
const MemoizedGame = React.memo(Game, (prevProps, nextProps) => {
    // Compare the props to determine if re-render is needed
    // Return true if props are equal, false otherwise
    return (
        prevProps.matchData === nextProps.matchData &&
        prevProps.summoner === nextProps.summoner
    );
});

export default MemoizedGame;