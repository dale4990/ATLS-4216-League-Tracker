import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ChampPage.css';

const ChampionPage = () => {
    const { championName } = useParams();
    const [championData, setChampionData] = useState(null);
    const splaaash = `/splash/${championName === "Wukong" ? "MonkeyKing" : championName}_0.jpg`;

    useEffect(() => {
        const fetchChampionData = async () => {
            try {
                const data = await import(`../assets/data/en_US/champion/${championName === "Wukong" ? "MonkeyKing" : championName}.json`);
                setChampionData(data.data[championName === "Wukong" ? "MonkeyKing" : championName]);
            } catch (error) {
                console.error('Error msg: ', error);
                setChampionData(null);
            }
        };
        fetchChampionData();
    }, [championName]);

    const backgroundStyle = {
        backgroundImage: `url(${splaaash})`
    };

    return (
      <div className='champion-page' style={backgroundStyle}>
        <div className="champion-content-container">
            <div className="champion-content">
                <h1>{championName.toUpperCase()}</h1>
                <div className='champion-title'>
                    <h2>{championData ? championData.title.toUpperCase() : 'Title unavailable, champion is too recent...'}</h2>
                </div>
                <div className="champion-lore">
                    <p>{championData ? championData.lore : 'Lore unavailable, champion is too recent...'}</p>
                </div>
            </div>
        </div>
      </div>
    );
};

export default ChampionPage;
