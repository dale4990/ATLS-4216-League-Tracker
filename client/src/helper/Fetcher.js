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

const getRank = async(puuid, summonerId) => {
    try {
        // Try finding the user in the database
        const response = await Axios.get(`http://localhost:5069/getRiotUser/${puuid}`);
        const user = response.data;
        if (user.rank) return user.rank;
        return "unranked";
    } catch(error){
        // If the user is not found, we will continue to fetch the rank from the Riot API
        try {
            // Since we could not find a pre-stored rank, we will fetch it from the Riot API
            const rankResponse = await Axios.post("http://localhost:5069/findRank", {
                id: summonerId,
            });

            const romanToInt = {
                "I": 1,
                "II": 2,
                "III": 3,
                "IV": 4,
            };

            const rankData = rankResponse.data;
    
            const rankDict = rankData.length === 0 ? {} : rankData[0];
            const rank = rankData.length === 0 ? "unranked" : rankDict.tier.toLowerCase() + " " + romanToInt[rankDict.rank];
    
            // Post the rank to the database
            await Axios.post("http://localhost:5069/updateRiotUser", {
                puuid: puuid,
                rank: rank,
            });
            
            return rank;
        } catch(error) {
            console.log(error.response.data.error);
            return "unranked";
        }
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

        // For each participant in each match, add the rank to the participant object
        for (const match of matchData) {
            for (const participant of match.participants) {
                participant.rank = await getRank(participant.puuid, participant.summonerId);
            }
        }
        
        return matchData;
    } catch(error){
        console.log(error.response.data.error);
        return [];
    }
}