import React from 'react';
import '../../styles/PlayerStats.css';

function PlayerAnalysis ({matchData, data, summoner, result}) {

    console.log(matchData);

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
    matchData.participants.forEach(participant => {
        if (participant.totalDamageDealtToChampions > maxDamageDealt) {
            maxDamageDealt = participant.totalDamageDealtToChampions;
        }

        if (participant.totalDamageTaken > maxDamageTaken) {
            maxDamageTaken = participant.totalDamageTaken;
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
                        <th style={{borderBottomColor: result ? "#2f436e" : "#703c47"}}></th>
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

                                <td className={`op-score-wrapper ${tdClass}`}></td>

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

    

    return (
        <div className="player-stats">
                {getTeamLayout(myTeamBlue ? blueTeam : redTeam, result, true)}
                {getTeamLayout(myTeamBlue ? redTeam : blueTeam, !result, false)}
        </div>
    );
};

const MemoizedPlayerAnalysis = React.memo(PlayerAnalysis, (prevProps, nextProps) => {
    return prevProps.matchData === nextProps.matchData;
});

export default MemoizedPlayerAnalysis;