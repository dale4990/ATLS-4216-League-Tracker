import '../styles/App.css';
import Axios from "axios";

export const getMatches = async(riotId, tagline) => {
    try {
      const findUserResponse = await Axios.post("http://localhost:5069/findRiotUser", {
          riotId: riotId,
          tagline: tagline,
      });

      const puuid = findUserResponse.data.puuid;

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

export const getRank = async(riotId, tagline) => {
    try {
        const findUserResponse = await Axios.post("http://localhost:5069/findRiotUser", {
            riotId: riotId,
            tagline: tagline,
        });

        const puuid = findUserResponse.data.puuid;

        const findIdResponse = await Axios.post("http://localhost:5069/findId", {
            puuid: puuid,
        });

        const id = findIdResponse.data.id;

        const findRankResponse = await Axios.post("http://localhost:5069/findRank", {
            id: id,
        });

        const rankData = findRankResponse.data;

        return rankData;
    } catch(error){
        console.log(error.response.data.error);
        return [];
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
        
        return matchData;
    } catch(error){
        console.log(error.response.data.error);
        return [];
    }
}