import React from 'react';
import '../../styles/gameStats.css';
import { PieChart, Pie, Cell } from 'recharts';

function TeamAnalysis ({matchData, data}) {

    const numFormatter = new Intl.NumberFormat('en-US');

    const { champions } = data;

    // For all participants, calculate and add their CS
    matchData.participants.forEach(participant => {
        let cs = participant.totalMinionsKilled + participant.neutralMinionsKilled;
        participant.cs = cs;
    });

    // Store a list of participants that are on the winning team and losing team
    const winningTeam = [];
    const losingTeam = [];

    // For each participant in the matchData, check if they are on the winning team or losing team
    matchData.participants.forEach(participant => {
        if (participant.win) {
            winningTeam.push(participant);
        } else {
            losingTeam.push(participant);
        }
    });

    const statsWin = {};
    const statsLose = {};

    // For each partcipant add their champion to their respective team
    winningTeam.forEach(player => {
        const champName = Object.keys(champions).find(key => champions[key].key == player.championId);
        
        statsWin[player.puuid] = {champion: champName};
    });

    losingTeam.forEach(player => {
        const champName = Object.keys(champions).find(key => champions[key].key == player.championId);

        statsLose[player.puuid] = {champion: champName};
    });

    const getChart = (stat1, stat2) => {
        const COLORS = ['#5383e8', '#e84057'];

        return (
            <PieChart width={90} height={90}>
                <Pie data={[{name: "Winning Team", value: stat1, stroke: "none"}, {name: "Losing Team", value: stat2, stroke: "none"}]} dataKey="value" cx="50%" cy="50%" innerRadius={30} outerRadius={40} startAngle={90} endAngle={450} isAnimationActive={false}>
                    {
                        [{name: "Winning Team", value: stat1}, {name: "Losing Team", value: stat2}].map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                    }
                </Pie>
            </PieChart>
        );
    }

    const getStatContainer = (statName, title) => {
        // Create a dictionary pointing from the championId to the number of kills for both teams
        // Keep track of the maximum and a total count
        let totalWin = 0;
        let totalLose = 0;
        let max = 0;

        winningTeam.forEach(player => {
            statsWin[player.puuid][statName] = player[statName];

            totalWin += player[statName];
            max = Math.max(max, player[statName]);
        });

        losingTeam.forEach(player => {
            statsLose[player.puuid][statName] = player[statName];

            totalLose += player[statName];
            max = Math.max(max, player[statName]);
        });


        return (
            <li className="stats-container">
                <div>
                    <h4>{title}</h4>
                    <div className="table">
                        <div className="team">
                            <ul>
                                {/* For each winning player in championKillsWin create an li tag */}
                                {Object.entries(statsWin).map(([key, value]) => {
                                    return (
                                        <li>
                                            <div className="icon">
                                                <img src={`/champion/${value.champion}.png`} alt={value.champion} />
                                            </div>
                                            <div className="progress">
                                                {/* width will be kills / max kills rounded to the nearest percent */}
                                                <div className="bar" style={{backgroundColor:"#5383e8", width:`${Math.round(value[statName] / max * 100)}%`}}></div>
                                                <span style={{color:"#fff"}}>{numFormatter.format(value[statName])}</span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className="graph">
                            <div>
                                <div className="recharts-wrapper" style={{position: "relative", cursor: "default", width: "90px", height: "90px"}}>
                                    {getChart(totalWin, totalLose)}
                                </div>
                                <div className="value">
                                    <div className="win" style={{color: "#5383e8"}}>
                                        {numFormatter.format(totalWin)}
                                        <div className="split-line"></div>
                                    </div>
                                    <div className="lose" style={{color: "#e84057"}}>
                                        {numFormatter.format(totalLose)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="team">
                            <ul>
                                {/* For each losing player in championKillsLose create an li tag */}
                                {Object.entries(statsLose).map(([key, value]) => {
                                    return (
                                        <li>
                                            <div className="icon">
                                                <img src={`/champion/${value.champion}.png`} alt={value.champion} />
                                            </div>
                                            <div className="progress">
                                                {/* width will be kills / max kills rounded to the nearest percent */}
                                                <div className="bar" style={{backgroundColor:"#e84057", width:`${Math.round(value[statName] / max * 100)}%`}}></div>
                                                <span style={{color:"#fff"}}>{numFormatter.format(value[statName])}</span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </li>
        );
    };

    return (
        <div className="team-stats">
            <div className="legend">
                <ul>
                    <li>
                        <div className="team-key" style={{backgroundColor: "#5383e8"}}></div>
                        <span style={{color:"#fff"}}>Winning Team</span>
                    </li>
                    <li>
                        <div className="team-key" style={{backgroundColor: "#e84057"}}></div>
                        <span style={{color:"#fff"}}>Losing Team</span>
                    </li>
                </ul>
            </div>

            <ul>
                {getStatContainer("kills", "Champion Kill")}
                {getStatContainer("goldEarned", "Gold Earned")}
                {getStatContainer("totalDamageDealtToChampions", "Damage Dealt")}
                {getStatContainer("wardsPlaced", "Wards Placed")}
                {getStatContainer("totalDamageTaken", "Damage Taken")}
                {getStatContainer("cs", "CS")}
            </ul>
        </div>
    );
};

const MemoizedTeamAnalysis = React.memo(TeamAnalysis, (prevProps, nextProps) => {
    return prevProps.matchData === nextProps.matchData;
});

export default MemoizedTeamAnalysis;