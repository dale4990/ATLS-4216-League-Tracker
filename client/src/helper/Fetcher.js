import '../styles/App.css';
import Axios from "axios";

export const getPUUID = async(riotId, tagline) => {
    try {
        const response = await Axios.post("http://localhost:5069/findRiotUser", {
            riotId: riotId,
            tagline: tagline,
        });

        return response.data.puuid;
    } catch(error){
        console.log(error.response.data.error);
        return "";
    }
}

export const getMatches = async(puuid, start, amount) => {
    try {
      const findMatchesResponse = await Axios.post("http://localhost:5069/findMatches", {
          puuid: puuid,
      });

      const matchIds = findMatchesResponse.data;

      return matchIds.slice(start, start + amount);

    } catch(error){
        console.log(error.response.data.error);
        return [];
    }
}

const getRank = async(puuid) => {
    try {
        const summonerId = await Axios.post("http://localhost:5069/findSummoner", {
            puuid: puuid,
        });

        const rankResponse = await Axios.post("http://localhost:5069/findRank", {
            id: summonerId.data.id,
        });

        const rankData = rankResponse.data;

        if (rankData.length === 0) {
            return {};
        }

        return rankData[0];

    } catch(error){
        console.log(error.response.data.error);
        return {};
    }
}

export const getMatchDatas = async(matchIds) => {
    try {
        const matchDataPromises = matchIds.map(async (matchId) => {
            const response = await Axios.post("http://localhost:5069/findMatchData", {
                matchId,
            });
            return response.data; 
        });

        // Wait for all requests to finish and retrieve their data
        const matchData = await Promise.all(matchDataPromises);

        const romanToInt = {
            "I": 1,
            "II": 2,
            "III": 3,
            "IV": 4,
        };

        // For each participant in each match, add the rank to the participant object
        for (const match of matchData) {
            for (const participant of match.participants) {
                const rankData = await getRank(participant.puuid);
                participant.rank = rankData.rank ? romanToInt[rankData.rank] : undefined;
                participant.tier = rankData.tier ? rankData.tier.toLowerCase() : undefined;
            }
        }
        
        return matchData;
    } catch(error){
        console.log(error.response.data.error);
        return [];
    }
}