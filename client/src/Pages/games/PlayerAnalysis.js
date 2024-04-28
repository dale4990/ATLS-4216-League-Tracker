import React from 'react';
import '../../styles/PlayerStats.css';

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

function PlayerAnalysis ({matchData, data, summoner, result}) {

    const numFormatter = new Intl.NumberFormat('en-US');
    
    // For each participant, match their puuid to their championName
    const { champions, summoners: summDict, runes } = data;
    const participantChampions = {};
    matchData.participants.forEach(participant => {
        const champName = Object.keys(champions).find(key => champions[key].key == participant.championId);
        participantChampions[participant.puuid] = champName;
    });

    let maxDamageDealt = 0;
    let maxDamageTaken = 0;
    let totalKills = 0;
    let totalBlueKills = 0;
    let totalRedKills = 0;
    let totalGold = 0;
    let totalBlueGold = 0;
    let totalRedGold = 0;
    matchData.participants.forEach(participant => {
        if (participant.totalDamageDealtToChampions > maxDamageDealt) {
            maxDamageDealt = participant.totalDamageDealtToChampions;
        }

        if (participant.totalDamageTaken > maxDamageTaken) {
            maxDamageTaken = participant.totalDamageTaken;
        }

        totalKills += participant.kills;
        totalGold += participant.goldEarned;

        if (participant.teamId === 100) {
            totalBlueKills += participant.kills;
            totalBlueGold += participant.goldEarned;
        } else {
            totalRedKills += participant.kills;
            totalRedGold += participant.goldEarned;
        }
    });

    const myTeamBlue = matchData.participants.find(participant => participant.puuid === summoner).teamId === 100 ? true : false;

    const blueTeam = [];
    const redTeam = [];

    matchData.participants.forEach(participant => {
        if (participant.teamId === 100) {
            blueTeam.push(participant);
        } else {
            redTeam.push(participant);
        }
    });

    const getTeamLayout = (team, result, first) => {
        const textResult = result ? "Victory" : "Defeat";
        const isTeamBlue = team[0].teamId === 100;

        return (
            <table result={textResult} className={`player-container ${first ? "top-container" : "bottom-container"}`}>
                <colgroup>
                    <col width="44"></col>
                    <col width="18"></col>
                    <col width="18"></col>
                    <col></col>
                    <col width="68"></col>
                    <col width="98"></col>
                    <col width="120"></col>
                    <col width="48"></col>
                    <col width="56"></col>
                    <col width="175"></col>
                </colgroup>
                <thead>
                    <tr>
                        <th colSpan="4" className="result-th" style={{borderBottomColor: result ? "#2f436e" : "#703c47"}}>
                            <span class="result" style={{color: result ? "#5383e8" : "#e84057"}}>{textResult}</span>
                            {`(${isTeamBlue ? "Blue" : "Red"} Team)`}
                        </th>
                        <th style={{borderBottomColor: result ? "#2f436e" : "#703c47"}}>Multikill</th>
                        <th style={{borderBottomColor: result ? "#2f436e" : "#703c47"}}>KDA</th>
                        <th style={{borderBottomColor: result ? "#2f436e" : "#703c47"}}>Damage</th>
                        <th style={{borderBottomColor: result ? "#2f436e" : "#703c47"}}>Wards</th>
                        <th style={{borderBottomColor: result ? "#2f436e" : "#703c47"}}>CS</th>
                        <th style={{borderBottomColor: result ? "#2f436e" : "#703c47"}}>Item</th>
                    </tr>
                </thead>

                <tbody className={result ? "win" : "loss"}>
                    {team.map(player => {
                        const tdClass = result ? "win" : "loss";

                        const firstSpell = Object.entries(summDict).find(([key, spell]) => spell.key === player.summonerSpell1);
                        const secondSpell = Object.entries(summDict).find(([key, spell]) => spell.key === player.summonerSpell2);

                        const { primaryRune, secondaryStyle } = player.perks;

                        const kdaString = player.kda.toFixed(2).replace(/\.0$/, '') + ":1";
                        const kp = Math.round(player.killParticipation*100);

                        const getKdaStringColor = (kda) => {
                            if (kda < 3) return "#9e9eb1";
                            if (kda < 4) return "#00bba3";
                            if (kda < 5) return "#0093ff";
                            return "#ff8200";
                        };

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
                        const secondRune = secondaryStyle === 0 ? { icon: "./perk-images/black.png", name: "Blank" } : runes.find(tree => tree.id === secondaryStyle);

                        const cs = player.totalMinionsKilled + player.neutralMinionsKilled;
                        const csm = (cs / (matchData.gameDuration / 60)).toFixed(1).replace(/\.0$/, '');

                        const getItems = () => {
                            const items = [player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6];

                            let i = 0;
                            const itemDivs = items.map(item => {
                                if (item === 0) return <div className={i++ === 0 ? "first-item" : "item"}><div className="no-item"></div></div>;
                                return (
                                    <div className={i++ === 0 ? "first-item" : "item"}>
                                        <img src={`/item/${item}.png`} width="22" alt={item} />
                                    </div>
                                );
                            });

                            return itemDivs;
                        };

                        const highestKill = determineHighestKillType(player.doubleKills, player.tripleKills, player.quadraKills, player.pentaKills);


                        return (
                            <tr result={textResult} class={`overview-player overview-player--${result ? "WIN" : "LOSE"}${player.puuid === summoner ? " isme" : ""}`}>
                                <td className={`champion ${tdClass}`}>
                                    <a target="_blank" rel="noreferrer" href={`/champions/${participantChampions[player.puuid]}`}>
                                        <div style={{position: "relative"}}>
                                            <img src={`/champion/${participantChampions[player.puuid]}.png`} width="32" alt={participantChampions[player.puuid]} />
                                        </div>
                                    </a>
                                </td>

                                <td className={`spells ${tdClass}`}>
                                    <div className="top-spell" style={{position: "relative"}}>
                                        <img src={`/spell/${firstSpell[1].id}.png`} alt={firstSpell[1].name} />
                                    </div>
                                    <div className="bottom-spell" style={{position: "relative"}}>
                                        <img src={`/spell/${secondSpell[1].id}.png`} alt={secondSpell[1].name} />
                                    </div>
                                </td>

                                <td className={`runes ${tdClass}`}>
                                    <div className="top-rune" style={{position: "relative"}}>
                                        <img src={`/${firstRune.icon}`} alt={firstRune.name} />
                                    </div>
                                    <div className="bottom-rune" style={{position: "relative"}}>
                                        <img src={`/${secondRune.icon}`} alt={secondRune.name} />
                                    </div>
                                </td>

                                <td className={`name ${tdClass}`}>
                                    <div className="summoner-tooltip" style={{position: "relative"}}>
                                        <a target="_blank" rel="noreferrer" href={`/display/${player.riotIdGameName}/${player.riotIdTagline}`}>
                                            <div className="summoner-name">
                                                <span className="summoner-name-wrapper">{(player.riotIdGameName.length === 0 ? "??????????" : player.riotIdGameName)}</span>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="tier" style={{position: "relative"}}><div>{player.rank}</div></div>
                                </td>

                                <td className={`multikill-wrapper ${tdClass}`}>
                                    <div className="multikill">
                                        {highestKill !== "" ? <div className="multikill-bubble">{highestKill}</div> : null}
                                    </div>
                                </td>

                                <td className={`kda ${tdClass}`}>
                                    <div className="k-d-a">{`${player.kills}/${player.deaths}/${player.assists} (${kp}%)`}</div>
                                    <div className="ratio" style={{color: getKdaStringColor(player.kda)}}>{kdaString}</div>
                                </td>

                                <td className={`damage ${tdClass}`}>
                                    <div>
                                        <div style={{position: "relative"}}>
                                            <div className="dealt">{numFormatter.format(player.totalDamageDealtToChampions)}</div>
                                            <div className="progress"><div className="fill" style={{width: `${Math.round(player.totalDamageDealtToChampions / maxDamageDealt * 100)}%`}}></div></div>
                                        </div>
                                        <div style={{position: "relative"}}>
                                            <div className="taken">{numFormatter.format(player.totalDamageTaken)}</div>
                                            <div className="progress--taken"><div className="fill" style={{width: `${Math.round(player.totalDamageTaken / maxDamageTaken * 100)}%`}}></div></div>
                                        </div>
                                    </div>
                                </td>

                                <td className={`ward ${tdClass}`}>
                                    <div style={{position: "relative"}}>
                                        <div>{player.controlWardsPurchased}</div>
                                        <div>{`${player.wardsPlaced} / ${player.wardsKilled}`}</div>
                                    </div>
                                </td>

                                <td className={`cs ${tdClass}`}>
                                    <div>{cs}</div>
                                    <div>{`${csm}/m`}</div>
                                </td>

                                <td className={`items ${tdClass}`}>
                                    {getItems()}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        )
    }

    const getObjectiveSummary = (objectives, result) => {

        const color = result ? "#5383e8" : "#e84057";

        return (
            <div className={`objectives ${result ? "left-objectives" : "right-objectives"}`}>
                <ul>
                    <li className="team-item">
                        <div style={{position: "relative"}}>
                            <span className="obj-icon" style={{color: color, width: "16px", height: "16px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4L10 0L16 4L14 8L11 16L10 15H6L5 16L2 8L0 4L6 0L4 4L5 5H7L8 4L9 5H11L12 4ZM7 8C7 7.44695 7.4481 7 8 7C8.55284 7 9 7.44695 9 8C9 8.55211 8.55284 9 8 9C7.4481 9 7 8.55211 7 8ZM9 10C9 9.4481 9.44716 9 10 9C10.5528 9 11 9.4481 11 10C11 10.5519 10.5528 11 10 11C9.44716 11 9 10.5519 9 10ZM8 11C7.4481 11 7 11.4479 7 12C7 12.5531 7.4481 13 8 13C8.55284 13 9 12.5531 9 12C9 11.4479 8.55284 11 8 11ZM5 10C5 9.4481 5.44789 9 6 9C6.55211 9 7 9.4481 7 10C7 10.5519 6.55211 11 6 11C5.44789 11 5 10.5519 5 10Z" fill="currentColor"></path>
                                    <mask id="mask0_5762_288543" style={{maskType: "luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16" fill="currentColor">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4L10 0L16 4L14 8L11 16L10 15H6L5 16L2 8L0 4L6 0L4 4L5 5H7L8 4L9 5H11L12 4ZM7 8C7 7.44695 7.4481 7 8 7C8.55284 7 9 7.44695 9 8C9 8.55211 8.55284 9 8 9C7.4481 9 7 8.55211 7 8ZM9 10C9 9.4481 9.44716 9 10 9C10.5528 9 11 9.4481 11 10C11 10.5519 10.5528 11 10 11C9.44716 11 9 10.5519 9 10ZM8 11C7.4481 11 7 11.4479 7 12C7 12.5531 7.4481 13 8 13C8.55284 13 9 12.5531 9 12C9 11.4479 8.55284 11 8 11ZM5 10C5 9.4481 5.44789 9 6 9C6.55211 9 7 9.4481 7 10C7 10.5519 6.55211 11 6 11C5.44789 11 5 10.5519 5 10Z" fill="currentColor"></path>
                                    </mask>
                                    <g mask="url(#mask0_5762_288543)" fill="currentColor"></g>
                                </svg>
                            </span>
                            <span>{objectives.baron.kills}</span>
                        </div>
                    </li>

                    <li className="team-item">
                        <div style={{position: "relative"}}>
                            <span className="obj-icon" style={{color: color, width: "16px", height: "16px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0L6 4L3 1V5H0L3 8V11L7 16H9L13 11V8L16 5H13V1L10 4L8 0ZM9 10.9999L10 8.99993L12 7.99993L11 9.99993L9 10.9999ZM4 7.99993L5 9.99993L7 10.9999L6 8.99993L4 7.99993Z" fill="currentColor"></path>
                                    <mask id="mask0_5762_288546" style={{maskType: "luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16" fill="currentColor">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0L6 4L3 1V5H0L3 8V11L7 16H9L13 11V8L16 5H13V1L10 4L8 0ZM9 10.9999L10 8.99993L12 7.99993L11 9.99993L9 10.9999ZM4 7.99993L5 9.99993L7 10.9999L6 8.99993L4 7.99993Z" fill="currentColor"></path>
                                    </mask>
                                    <g mask="url(#mask0_5762_288546)" fill="currentColor"></g>
                                </svg>
                            </span>
                            <span>{objectives.dragon.kills}</span>
                        </div>
                    </li>

                    <li className="team-item">
                        <div style={{position: "relative"}}>
                            <span className="obj-icon" style={{color: color, width: "16px", height: "16px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.87931 12.3184H8.01691C11.0876 12.0307 11.1112 8.63778 11.1112 8.63778C11.134 5.80836 8.07153 6.04968 7.94776 6.06005C7.82468 6.04968 4.76224 5.80836 4.78506 8.63778C4.78506 8.63778 4.80788 12.0307 7.87931 12.3184ZM11.2377 1C11.2377 1 15.6775 3.57635 14.9874 8.84453C14.9874 8.84453 12.94 9.18956 12.8253 10.7308C12.8253 10.7308 11.9741 14.1127 8.06323 14.2503H7.92909C4.01824 14.1127 3.16706 10.7308 3.16706 10.7308C3.05228 9.18956 1.0042 8.84453 1.0042 8.84453C0.314127 3.57635 4.75463 1 4.75463 1C3.5356 4.58864 4.91574 5.25589 4.91574 5.25589C6.00547 4.45104 7.04127 4.16063 7.94776 4.13574V4.13159C7.95571 4.13159 7.96384 4.13211 7.97196 4.13262C7.98009 4.13314 7.98821 4.13366 7.99616 4.13366C8.0042 4.13366 8.01242 4.13313 8.02055 4.13261C8.02849 4.13209 8.03635 4.13159 8.04387 4.13159V4.13574C8.95106 4.16063 9.98616 4.45104 11.0766 5.25589C11.0766 5.25589 12.4567 4.58864 11.2377 1ZM6.95885 9.17476C6.95885 8.01382 7.42212 7.07344 7.99326 7.07344C8.5644 7.07344 9.02698 8.01382 9.02698 9.17476C9.02698 10.335 8.5644 11.2754 7.99326 11.2754C7.42212 11.2754 6.95885 10.335 6.95885 9.17476ZM14.2859 11.3866C14.2859 11.3866 13.5723 14.9524 13.2273 15.3438C13.2273 15.3438 14.7685 15.3666 16 12.9859C16 12.9859 15.5049 11.9391 14.2859 11.3866ZM2.77203 15.3434C2.77203 15.3434 1.23079 15.3662 0 12.9856C0 12.9856 0.494388 11.9387 1.71411 11.3862C1.71411 11.3862 2.427 14.9521 2.77203 15.3434Z" fill="currentColor"></path>
                                </svg>
                            </span>
                            <span>{objectives.riftHerald.kills}</span>
                        </div>
                    </li>

                    <li className="team-item">
                        <div style={{position: "relative"}}>
                            <span className="obj-icon" style={{color: color, width: "16px", height: "16px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99998 1L6.33333 2.42045C6.33333 2.42045 5.46216 3.2176 5.18153 3.2176H3.92809C3.00001 3.2176 1.66668 4.196 1.37128 5.89721C1.29668 6.32667 1.27273 7.18045 1.93119 8.06625L1 8.81245C1 8.81245 2.33331 9.52267 2.66665 10.9431C2.99998 12.3636 5.08806 13.7042 6.90051 14.0875L7.98099 14.969V15L7.99998 14.9845L8.01896 15V14.969L9.09944 14.0875C10.9119 13.7042 13 12.3636 13.3333 10.9431C13.6666 9.52267 15 8.81245 15 8.81245L14.0688 8.06625C14.7272 7.18045 14.7056 6.34035 14.6287 5.89721C14.3333 4.196 13 3.2176 12.0719 3.2176H10.8184C10.5378 3.2176 9.66667 2.42045 9.66667 2.42045L7.99998 1ZM8.1486 4.2451C8.06916 4.15686 7.93078 4.15686 7.85134 4.2451L5.43358 6.93049C5.35687 7.0157 5.36687 7.14765 5.45522 7.22073C5.72968 7.44776 6.27298 7.90668 6.46151 8.13439C6.67259 8.38935 5.14596 9.53934 4.59964 9.93794C4.50018 10.0105 4.48826 10.1542 4.57436 10.2422L6.41356 12.1222C6.49201 12.2024 6.62105 12.2024 6.69949 12.1222L7.857 10.9391C7.93545 10.8589 8.06449 10.8589 8.14293 10.9391L9.30045 12.1222C9.37889 12.2024 9.50793 12.2024 9.58637 12.1222L11.4256 10.2422C11.5117 10.1542 11.4998 10.0105 11.4003 9.93794C10.854 9.53934 9.32734 8.38935 9.53843 8.13439C9.72695 7.90668 10.2703 7.44776 10.5447 7.22073C10.6331 7.14765 10.6431 7.0157 10.5664 6.93049L8.1486 4.2451Z" fill="currentColor"></path>
                                </svg>
                            </span>
                            <span>{objectives.horde.kills}</span>
                        </div>
                    </li>

                    <li className="team-item">
                        <div style={{position: "relative"}}>
                            <span className="obj-icon" style={{color: color, width: "16px", height: "16px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4 4L8 0L11.9992 4L10.9982 5.0012L11 5H14L8 11L2 5H5L4 4ZM6.4 3.99963L8 2.4L9.6 3.99963L8 5.6L6.4 3.99963ZM8 12L12 8L10 16H6L4 8L8 12Z" fill="currentColor"></path>
                                    <mask id="mask0_5762_288549" style={{maskType: "luminance"}} maskUnits="userSpaceOnUse" x="2" y="0" width="12" height="16" fill="currentColor">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4 4L8 0L11.9992 4L10.9982 5.0012L11 5H14L8 11L2 5H5L4 4ZM6.4 3.99963L8 2.4L9.6 3.99963L8 5.6L6.4 3.99963ZM8 12L12 8L10 16H6L4 8L8 12Z" fill="currentColor"></path>
                                    </mask>
                                    <g mask="url(#mask0_5762_288549)" fill="currentColor"></g>
                                </svg>
                            </span>
                            <span>{objectives.tower.kills}</span>
                        </div>
                    </li>

                    <li className="team-item">
                        <div style={{position: "relative"}}>
                            <span className="obj-icon" style={{color: color, width: "16px", height: "16px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" fill="currentColor"></path>
                                    <rect x="8" y="4" width="5.65694" height="5.65694" transform="rotate(45 8 4)" fill="currentColor"></rect>
                                </svg>
                            </span>
                            <span>{objectives.inhibitor.kills}</span>
                        </div>
                    </li>
                </ul>
            </div>
        );
    };

    // Blue objectives is the team in matchData with teamId 100
    // Red objectives is the team in matchData with teamId 200
    const blueObjectives = matchData.teams.find(team => team.teamId === 100).objectives[0];
    const redObjectives = matchData.teams.find(team => team.teamId === 200).objectives[0];

    return (
        <div className="player-stats">
                {getTeamLayout(myTeamBlue ? blueTeam : redTeam, result, true)}
                <div className="summary">
                    {getObjectiveSummary(myTeamBlue ? blueObjectives : redObjectives, result)}
                    <div className="summary-graph">
                        <div>
                            <div className="graph">
                                <div className="title">Total Kills</div>
                                <div className="data data--left">{myTeamBlue ? totalBlueKills : totalRedKills}</div>
                                <div className="data data--right">{myTeamBlue ? totalRedKills : totalBlueKills}</div>
                                <div className={result ? "win" : "loss"} style={{flex: `1 1 ${Math.round((myTeamBlue ? totalBlueKills : totalRedKills) / totalKills * 100)}%`}}></div>
                                <div className={result ? "loss" : "win"} style={{flex: `1 1 ${Math.round((myTeamBlue ? totalRedKills : totalBlueKills) / totalKills * 100)}%`}}></div>
                            </div>
                        </div>

                        <div>
                            <div className="graph">
                                <div className="title">Total Gold</div>
                                <div className="data data--left">{numFormatter.format(myTeamBlue ? totalBlueGold : totalRedGold)}</div>
                                <div className="data data--right">{numFormatter.format(myTeamBlue ? totalRedGold : totalBlueGold)}</div>
                                <div className={result ? "win" : "loss"} style={{flex: `1 1 ${Math.round((myTeamBlue ? totalBlueGold : totalRedGold) / totalGold * 100)}%`}}></div>
                                <div className={result ? "loss" : "win"} style={{flex: `1 1 ${Math.round((myTeamBlue ? totalRedGold : totalBlueGold) / totalGold * 100)}%`}}></div>
                            </div>
                        </div>
                    </div>
                    {getObjectiveSummary(myTeamBlue ? redObjectives : blueObjectives, !result)}
                </div>
                {getTeamLayout(myTeamBlue ? redTeam : blueTeam, !result, false)}
        </div>
    );
};

const MemoizedPlayerAnalysis = React.memo(PlayerAnalysis, (prevProps, nextProps) => {
    return prevProps.matchData === nextProps.matchData;
});

export default MemoizedPlayerAnalysis;