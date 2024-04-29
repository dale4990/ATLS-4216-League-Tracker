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

export const getMatches = async(puuid) => {
    try {
      const findMatchesResponse = await Axios.post("http://localhost:5069/findMatches", {
          puuid: puuid,
      });

      const matchIds = findMatchesResponse.data;

      return matchIds;

    } catch(error){
        console.log(error.response.data.error);
        return [];
    }
}

const getRank = async (puuid, riotId, tagline, summonerId) => {
    try {
        // Try finding the user in the database
        const response = await Axios.get(`http://localhost:5069/getRiotUser/${puuid}`);
        const user = response.data;
        if (user.rank) return user.rank;
        throw new Error("User rank not found in database.");
    } catch (error) {
        // If the user is not found, we will continue to fetch the rank from the Riot API
        try {
            // Fetch rank data from the Riot API
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

            // Find the entry for "RANKED_SOLO_5x5" queue type
            const soloQueueRank = rankData.find(rank => rank.queueType === "RANKED_SOLO_5x5");

            if (soloQueueRank) {
                const rank = soloQueueRank.tier.toLowerCase() + " " + romanToInt[soloQueueRank.rank];
 
                await Axios.post("http://localhost:5069/updateRiotUser", {
                    puuid: puuid,
                    riotId: riotId,
                    tagline: tagline,
                    rank: rank,
                });
                return rank;
            }

            // If solo queue rank is not found, pick the first entry and construct the rank string
            if (rankData.length > 0) {
                const firstRank = rankData[0];
                const rank = firstRank.tier.toLowerCase() + " " + romanToInt[firstRank.rank];
                await Axios.post("http://localhost:5069/updateRiotUser", {
                    puuid: puuid,
                    riotId: riotId,
                    tagline: tagline,
                    rank: rank,
                });
                return rank;
            }

            return "unranked";
        } catch (error) {
            if (error.response) console.log(error.response.data.error);
            return "unranked";
        }
    }
}

export const getMatchDatas = async(matchIds, start, amount) => {
    try {
        const matchDataPromises = matchIds.slice(start, start+amount).map(async (matchId) => {
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
                participant.rank = await getRank(participant.puuid, participant.riotIdGameName, participant.riotIdTagline, participant.summonerId);
            }
        }
        
        return matchData;
    } catch(error){
        console.log(error.response.data.error);
        return [];
    }
}