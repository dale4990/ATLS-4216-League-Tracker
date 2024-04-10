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