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

function Game({gameId, matchData, summoner}) {
    console.log(matchData);
    const gameMode = matchData.gameMode;
    const gameDuration = secondsToHMS(matchData.gameDuration);
    const timestampString = timestampToAgo(matchData.gameEndTimestamp);

    const isMe = matchData.participants.find(participant => participant.summonerName === summoner);
    const { win, kills, deaths, assists, totalMinionsKilled, teamId } = isMe;

    const winColor = win ? "#28344e" : "#59343b";
    const gameColor = win ? "#5383e8" : "#e84057";
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
                            <div className="result">{win ? "Victory" : "Defeat"}</div>
                            <div className="duration">{gameDuration}</div>
                        </div> {/* head-group */}
                    </div> {/* timestamp-details */}

                    <div className="player-stats">
                        <div className="main">
                            <div className="info">
                                <div className="champion">
                                    <img src="/champion/Xayah.png" width="48" height="48" alt="Xayah" /> {/* Variable */}
                                    <span className="champion-level">18</span> {/* Variable */}
                                </div> {/* champion */}

                                <div className="summ-runes-container">
                                    <div className="summ-runes">
                                        <div className="spell" style={{position: 'relative'}}>
                                            <img src="/spell/SummonerHaste.png" width="22" height="22" alt="Ghost" /> {/* Variable */}
                                        </div> {/* Variable */}

                                        <div className="spell" style={{position: 'relative'}}>
                                            <img src="/spell/SummonerCherryFlash.png" width="22" height="22" alt="Flash" /> {/* Variable */}
                                        </div> {/* Variable */}
                                    </div> {/* summ-runes */}

                                    <div className="summ-runes">
                                        <div className="rune rune-primary" style={{position: 'relative', backgroundColor: 'black', borderRadius: '50%'}}>
                                            <img src="/perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png" width="22" height="22" alt="Lethal Tempo" /> {/* Variable */}
                                        </div> {/* Variable */}

                                        <div className="rune" style={{position: 'relative'}}>
                                            <img src="/perk-images/Styles/7200_Domination.png" width="22" height="22" alt="Domination" /> {/* Variable */}
                                        </div> {/* Variable */}
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
                                    <div className style={{position: 'relative'}}>P/Kill {killParticipation}%</div> {/* Variable */}
                                </div> {/* p-kill */}

                                <div className="cs">
                                    <div className style={{position: 'relative'}}>CS {totalMinionsKilled} ({csm})</div> {/* Variable */}
                                </div> {/* cs */}

                                <div className="avg-tier">
                                    <div className style={{position: 'relative'}}>gold 1</div> {/* Variable */}
                                </div> {/* avg-tier */}
                            </div> {/* game-stats */}
                        </div> {/* main */}

                        <div className="sub">
                            <dl className="items">
                                <dd><div className="item" style={{position: 'relative'}}><img src="/item/6672.png" width="22" height="22" alt="Kraken Slayer" /></div></dd> {/* Variable */}
                                <dd><div className="item" style={{position: 'relative'}}><img src="/item/3006.png" width="22" height="22" alt="Berserker's Greaves" /></div></dd> {/* Variable */}
                                <dd><div className="item" style={{position: 'relative'}}><img src="/item/6675.png" width="22" height="22" alt="Navori Quickblades" /></div></dd> {/* Variable */}
                                <dd><div className="item" style={{position: 'relative'}}><img src="/item/3072.png" width="22" height="22" alt="Bloodthirster" /></div></dd> {/* Variable */}
                                <dd><div className="item" style={{position: 'relative'}}><img src="/item/6673.png" width="22" height="22" alt="Immortal Shieldbow" /></div></dd> {/* Variable */}
                                <dd><div className="item" style={{position: 'relative'}}><img src="/item/3035.png" width="22" height="22" alt="Last Whisper" /></div></dd> {/* Variable */}
                                <dd className="trinket"><div className="item" style={{position: 'relative'}}><img src="/item/2052.png" width="22" height="22" alt="Poro-Snax" /></div></dd> {/* Variable */}
                            </dl> {/* items */}

                            <div className="game-tags__scroll-container">
                                <div className="game-tags">
                                    <div className="tag kill-tag">Triple Kill</div> {/* Variable */}
                                </div> {/* game-tags */}
                            </div> {/* game-tags__scroll-container */}
                        </div> {/* sub */}
                    </div> {/* player-stats */}

                    <div className="player-list">
                        <div className="player">
                            <div className="icon" style={{position: 'relative'}}><img src="/champion/Khazix.png" width="16" height="16" alt="Khazix" /></div> {/* Variable */}
                            <div className="name">
                                <div className="summoner-tooltip" style={{position: 'relative'}}>
                                    <div className="teammate-name">
                                        <span className="team-name-font">Ancientz</span>
                                    </div> {/* teammate-name */}
                                </div> {/* summoner-tooltip */}
                            </div> {/* name */}
                        </div> {/* player */}

                        <div className="player">
                            <div className="icon" style={{position: 'relative'}}><img src="/champion/Nidalee.png" width="16" height="16" alt="Nidalee" /></div> {/* Variable */}
                            <div className="name">
                                <div className="summoner-tooltip" style={{position: 'relative'}}>
                                    <div className="teammate-name">
                                        <span className="team-name-font">photik95</span>
                                    </div> {/* teammate-name */}
                                </div> {/* summoner-tooltip */}
                            </div> {/* name */}
                        </div> {/* player */}

                        <div className="player">
                            <div className="icon" style={{position: 'relative'}}><img src="/champion/Vi.png" width="16" height="16" alt="Vi" /></div> {/* Variable */}
                            <div className="name">
                                <div className="summoner-tooltip" style={{position: 'relative'}}>
                                    <div className="teammate-name">
                                        <span className="team-name-font">Z Boogiepop</span>
                                    </div> {/* teammate-name */}
                                </div> {/* summoner-tooltip */}
                            </div> {/* name */}
                        </div> {/* player */}

                        <div className="player">
                            <div className="icon" style={{position: 'relative'}}><img src="/champion/Shaco.png" width="16" height="16" alt="Shaco" /></div> {/* Variable */}
                            <div className="name">
                                <div className="summoner-tooltip" style={{position: 'relative'}}>
                                    <div className="teammate-name">
                                        <span className="team-name-font">ultrasun261</span>
                                    </div> {/* teammate-name */}
                                </div> {/* summoner-tooltip */}
                            </div> {/* name */}
                        </div> {/* player */}

                        <div className="player">
                            <div className="icon" style={{position: 'relative'}}><img src="/champion/Xayah.png" width="16" height="16" alt="Xayah" /></div> {/* Variable */}
                            <div className="name">
                                <div className="summoner-tooltip" style={{position: 'relative'}}>
                                    <div className="teammate-name">
                                        <span className="team-name-font">Spasznee</span>
                                    </div> {/* teammate-name */}
                                </div> {/* summoner-tooltip */}
                            </div> {/* name */}
                        </div> {/* player */}

                        <div className="player">
                            <div className="icon" style={{position: 'relative'}}><img src="/champion/Zed.png" width="16" height="16" alt="Zed" /></div> {/* Variable */}
                            <div className="name">
                                <div className="summoner-tooltip" style={{position: 'relative'}}>
                                    <div className="teammate-name">
                                        <span className="team-name-font">thedorkster</span>
                                    </div> {/* teammate-name */}
                                </div> {/* summoner-tooltip */}
                            </div> {/* name */}
                        </div> {/* player */}

                        <div className="player">
                            <div className="icon" style={{position: 'relative'}}><img src="/champion/Katarina.png" width="16" height="16" alt="Katarina" /></div> {/* Variable */}
                            <div className="name">
                                <div className="summoner-tooltip" style={{position: 'relative'}}>
                                    <div className="teammate-name">
                                        <span className="team-name-font">Mushu</span>
                                    </div> {/* teammate-name */}
                                </div> {/* summoner-tooltip */}
                            </div> {/* name */}
                        </div> {/* player */}

                        <div className="player">
                            <div className="icon" style={{position: 'relative'}}><img src="/champion/Zoe.png" width="16" height="16" alt="Zoe" /></div> {/* Variable */}
                            <div className="name">
                                <div className="summoner-tooltip" style={{position: 'relative'}}>
                                    <div className="teammate-name">
                                        <span className="team-name-font">Metalax</span>
                                    </div> {/* teammate-name */}
                                </div> {/* summoner-tooltip */}
                            </div> {/* name */}
                        </div> {/* player */}

                        <div className="player">
                            <div className="icon" style={{position: 'relative'}}><img src="/champion/Varus.png" width="16" height="16" alt="Varus" /></div> {/* Variable */}
                            <div className="name">
                                <div className="summoner-tooltip" style={{position: 'relative'}}>
                                    <div className="teammate-name">
                                        <span className="team-name-font">oogablaga</span>
                                    </div> {/* teammate-name */}
                                </div> {/* summoner-tooltip */}
                            </div> {/* name */}
                        </div> {/* player */}

                        <div className="player">
                            <div className="icon" style={{position: 'relative'}}><img src="/champion/Naafiri.png" width="16" height="16" alt="Naafiri" /></div> {/* Variable */}
                            <div className="name">
                                <div className="summoner-tooltip" style={{position: 'relative'}}>
                                    <div className="teammate-name">
                                        <span className="team-name-font">kz2</span>
                                    </div> {/* teammate-name */}
                                </div> {/* summoner-tooltip */}
                            </div> {/* name */}
                        </div> {/* player */}
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