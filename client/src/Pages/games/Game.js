import React from 'react';
import '../../styles/Games.css';
import championData from '../../assets/data/en_US/champion.json';

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
function getMyItems(isMe) {
    const { item0, item1, item2, item3, item4, item5, item6 } = isMe;
    const items = [item0, item1, item2, item3, item4, item5];

    // /item/{item}.png
    // If item is 0, return an empty item slot; item6 is className="trinket"
    const itemDivs = items.map(item => {
        if (item === 0) return <dd class="item"></dd>;
        return <dd><div className="item" style={{position: 'relative'}}><img src={`/item/${item}.png`} width="22" height="22" alt="Who cares right now" /></div></dd>;
    });

    // Add trinket to the end of the list
    itemDivs.push(<dd><div className="trinket" style={{position: 'relative'}}><img src={`/item/${item6}.png`} width="22" height="22" alt="Trinket" /></div></dd>);

    return itemDivs;
}
<<<<<<< HEAD
function Game({gameId, matchData, summoner, data, rankData}) {
    const { champions: champDict, summoners: summDict, runes } = data;
=======
function Game({matchData, summoner, data}) {
    const { champions: champDict, summoners: summDict, runes, championImageMap } = data;
>>>>>>> 0c5bed66ced6073faa1be3bc3ff992a0bcc339bf
    const endOfGameResult = matchData.endOfGameResult;
    const gameMode = matchData.gameMode;
    const gameDuration = secondsToHMS(matchData.gameDuration);
    const remake = matchData.gameDuration < 210 ? true : false; 
    const timestampString = timestampToAgo(matchData.gameEndTimestamp);
    const rankTier = rankData.tier;
    const rankDivision = rankData.rank; 

    const isMe = matchData.participants.find(participant => participant.puuid === summoner);
    const { win, kills, deaths, assists, teamId, championLevel, championId, totalMinionsKilled} = isMe;
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
    const itemList = getMyItems(isMe);

<<<<<<< HEAD
    const championImageMap = parseChampionData();

    const winColor = remake ? "#1E2328" : (win ? "#28344e" : "#59343b");
    const gameColor = remake ? "#A09B8C" : (win ? "#5383e8" : "#e84057");
=======
    const winColor = win ? "#28344e" : "#59343b";
    const gameColor = win ? "#5383e8" : "#e84057";
>>>>>>> 0c5bed66ced6073faa1be3bc3ff992a0bcc339bf
    const buttonColor = win ? "#2f436e" : "#703c47";
    
    // Calculated states
    const kda = ((kills + assists) / deaths).toFixed(2) + ":1 KDA";
    const killParticipation = ((kills + assists) / matchData.participants.filter(participant => participant.teamId === teamId).reduce((acc, cur) => acc + cur.kills, 0) * 100).toFixed(0);
    const csm = (totalMinionsKilled / (matchData.gameDuration / 60)).toFixed(1).replace(/\.0$/, '');


    return(
        <div className="outer">
            <div className="deco" style={{ backgroundColor: gameColor }}></div>
            <div className="contents" style={{ backgroundColor: winColor }}>
                <div className="inner">
                    <div className="timestamp-details">
                        <div className="head-group">
                            <div className="game-type" style={{ color: gameColor }}>{gameMode}</div>
                            <div className="timestamp">
                                <div className style={{position: 'relative'}}>{timestampString}</div>
                            </div> {/* timestamp */}
                        </div> {/* head-group */}

                        <div className="divider"></div>

                        <div className="head-group">
                            <div className="result">{remake ? "Remake" : (win ? "Victory" : "Defeat")}</div>
                            <div className="duration">{gameDuration}</div>
                        </div> {/* head-group */}
                    </div> {/* timestamp-details */}

                    <div className="player-stats">
                        <div className="main">
                            <div className="info">
                                <div className="champion">
                                    <img src={`/champion/${myChampion.id}.png`} width="48" height="48" alt={myChampion.name} />
                                    <span className="champion-level">{championLevel}</span>
                                </div> {/* champion */}

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

                                <div className="kda-ratio">{kda}</div>
                            </div> {/* kda-stats */}

                            <div className="game-stats">
                                <div className="p-kill">
                                    <div className style={{position: 'relative'}}>P/Kill {killParticipation}%</div>
                                </div> {/* p-kill */}

                                <div className="cs">
                                    <div className style={{position: 'relative'}}>CS {totalMinionsKilled} ({csm})</div>
                                </div> {/* cs */}

                                <div className="avg-tier">
                                    <div className style={{position: 'relative'}}>{rankTier}</div> {/* Variable */}
                                </div> {/* avg-tier */}
                            </div> {/* game-stats */}
                        </div> {/* main */}

                        <div className="sub">
                            <dl className="items">
                                {itemList}
                            </dl> {/* items */}

                            <div className="game-tags__scroll-container">
                                <div className="game-tags">
                                    <div className="tag kill-tag">Triple Kill</div> {/* Variable */}
                                </div> {/* game-tags */}
                            </div> {/* game-tags__scroll-container */}
                        </div> {/* sub */}
                    </div> {/* player-stats */}

                    <div className="player-list">
                        {matchData.participants.map(participant => (
                            <div className="player" key={participant.summonerName}>
                                <div className="icon" style={{position: 'relative'}}>
                                    <img src={`/champion/${championImageMap[participant.championId]}`} style={{borderRadius: "3px", border: "none", height: "16px", width: "16px"}} alt={`"${participant.championName}"`} />
                                </div>
                                <div className="name">
                                    <div className="summoner-tooltip" style={{position: 'relative'}}>
                                        <div className="teammate-name teammate-align" style={{color: (participant.puuid === summoner ? "#FFFFFF" : "#9e9eb1")}}>
                                            <span className="team-name-font team-name-align">{(participant.summonerName.length === 0 ? "??????????" : participant.summonerName)}</span>
                                        </div> {/* teammate-name */}
                                    </div> {/* summoner-tooltip */}
                                </div> {/* name */}
                            </div> // player
                        ))}
                    </div> {/* player-list */}
                </div> {/* inner */}
            </div> {/* contents */}
            
            <div className="actions">
                <button className="button" background-color={buttonColor}>
                    <img src="/spell/SummonerCherryFlash.png" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" alt="Temp Button" />
                </button> {/* button */}
            </div> {/* actions */}
        </div>
    )
}

export default Game;