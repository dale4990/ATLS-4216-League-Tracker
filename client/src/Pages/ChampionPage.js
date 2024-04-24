import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ChampPage.css';

const ChampionPage = () => {
    const { championName } = useParams();
    const [championData, setChampionData] = useState(null);
    const splaaash = `/splash/${championName}_0.jpg`;

    useEffect(() => {
        const fetchChampionData = async () => {
            try {
                const data = await import(`../assets/data/en_US/champion/${championName}.json`);
                setChampionData(data.data[championName]);
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
        {/* <div className="overlay"></div> */}
        <div className="champion-content">
            <h1>{championName}</h1>
            <div className="champion-details">
                <div className="Modes">Summoners Rift</div>
                <div className="Modes">ARAM</div>
            </div>
            <div className="champion-lore">
                <p>{championData ? championData.lore : 'Lore unavailable, champion is too recent...'}</p>
            </div>
        </div>
      </div>
    );
};

export default ChampionPage;
