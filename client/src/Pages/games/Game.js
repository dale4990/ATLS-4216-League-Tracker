import React from 'react';
import '../../styles/Games.css';
import { useSelector } from 'react-redux';

function Game() {
    const wins = useSelector(state => state.matchData.win);
    const win = wins[3];
    const winColor = win ? "#28344e" : "#59343b";
    const gameColor = win ? "#5383e8" : "#e84057";
    const buttonColor = win ? "#2f436e" : "#703c47";
    const decoColor = gameColor;
    const kills = useSelector(state => state.matchData.kills);
    const kill = kills[3];
    const deaths = useSelector(state => state.matchData.deaths);
    const death = deaths[3];
    const assists = useSelector(state => state.matchData.assists);
    const assist = assists[3];
    // stores kda ratio as a string "X.XX:1 KDA"
    const kda = ((kill + assist) / death).toFixed(2) + ":1 KDA";

    return(
        <div className="outer">
            <div className="deco" style={{ color: decoColor }}></div>
            <div className="contents" background-color={winColor}>
                <div className="inner">
                    <div className="timestamp-details">
                        <div className="head-group">
                            <div className="game-type" style={{ color: gameColor }}>ARAM</div> {/* Variable */}
                            <div className="timestamp">
                                <div className style={{position: 'relative'}}>19 hours ago</div> {/* Variable */}
                            </div> {/* timestamp */}
                        </div> {/* head-group */}

                        <div className="divider"></div>

                        <div className="head-group">
                            <div className="result">{win ? "Victory" : "Defeat"}</div>
                            <div className="duration">19m 15s</div> {/* Variable */}
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
                                    <span>{kill}</span>
                                    /
                                    <span className="d">{death}</span>
                                    /
                                    <span>{assist}</span>
                                </div> {/* kda */}

                                <div className="kda-ratio">{kda}</div>
                            </div> {/* kda-stats */}

                            <div className="game-stats">
                                <div className="p-kill">
                                    <div className style={{position: 'relative'}}>P/Kill 69%</div> {/* Variable */}
                                </div> {/* p-kill */}

                                <div className="cs">
                                    <div className style={{position: 'relative'}}>CS 69 (6.9)</div> {/* Variable */}
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