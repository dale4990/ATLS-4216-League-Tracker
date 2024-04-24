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

    return (
      <div className='champion-page'>
        <h1>Champion Page for {championData?.name || championName}</h1>
        <img src={splaaash} className="champion-img" alt={`${championName} Splash Art`} />
        <p>{championData ? championData.lore : 'Loading lore...'}</p>
      </div>
    );
};

export default ChampionPage;
