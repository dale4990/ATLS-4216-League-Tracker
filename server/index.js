const Express = require("express");
const mongoose = require("mongoose");
const axios = require('axios');
const cors = require("cors");
const UserModel =  require('./models/Users');
const RiotUser =  require('./models/RiotUsers');
const MatchData = require('./models/Match');

mongoose.connect("mongodb+srv://admin:fA3zmaeCoNxg3BsI@cluster0.m54yfvr.mongodb.net/valorantdb?retryWrites=true&w=majority&appName=Cluster0");

const app = Express();
app.use(Express.json());
app.use(cors());

// Function to generate a random 7-digit number
function generateRandomUserId() {
    return Math.floor(1000000 + Math.random() * 9000000);
}

// GET request to show all users
app.get("/getUsers", (req, res) => {
    UserModel.find({})
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            console.error("Error retrieving users:", error);
            res.status(500).json({ error: "An error occurred while retrieving users." });
        });
});

// POST request to create a user
app.post("/createUser", async (req, res) =>{
    const { name, username } = req.body;
    try {
        let newUserId;
        let existingUser;
        
        // Generate a random 7-digit userId and check if it already exists
        do {
            newUserId = generateRandomUserId();
            existingUser = await UserModel.findOne({ userId: newUserId });
        } while (existingUser);

        // Create a new user with the generated userId
        const newUser = new UserModel({ userId: newUserId, name, username });
        await newUser.save();

        res.json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "An error occurred while creating the user." });
    }
});

// POST request to delete a user
app.post("/deleteUser", async (req, res) => {
    const userId = req.body.userId;
    try {
        const deletedUser = await UserModel.findOneAndDelete({ userId: userId });
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found." });
        }
        res.json({ message: "User deleted successfully.", deletedUser });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "An error occurred while deleting the user." });
    }
});

// POST request to find Riot user
app.post("/findRiotUser", async (req, res) => {
    const { riotId, tagline } = req.body;
    
    try {
        // Check if the Riot user already exists in the database
        const existingRiotUser = await RiotUser.findOne({ riotId, tagline });

        if (existingRiotUser) {
            // If the user exists in the database, use their information directly
            res.json({ puuid: existingRiotUser.puuid, riotId, tagline });
            return;
        }

        // If the user does not exist in the database, make the API call to Riot
        const apiKey = "RGAPI-bf515fa8-79e7-45d5-8b05-12121e6c8326"; 
        const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${riotId}/${tagline}?api_key=${apiKey}`; // can customize region via dropdown later
        
        const response = await axios.get(url);
        
        const { puuid, gameName, tagLine } = response.data; 
        // Create a new RiotUser instance
        const newRiotUser = new RiotUser({
            puuid,
            riotId: gameName, 
            tagline: tagLine 
        });
        
        await newRiotUser.save();
        
        res.json({ puuid, riotId: gameName, tagline: tagLine }); 
    } catch (error) {
        if (error.response && error.response.data) {
            console.error("Error:", error.response.data);
        } else {
            console.error("Error:", error);
        }
        res.status(500).json({ error: "Failed to find Riot user" });
    }
});

// POST request to find match data by puuid
app.post("/findMatches", async (req, res) => {
    const { puuid } = req.body;
    const apiKey = "RGAPI-bf515fa8-79e7-45d5-8b05-12121e6c8326"; 
    const url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${apiKey}`; // can customize region via dropdown later
    
    try {
        const response = await axios.get(url);
        
        const matchIds = response.data;
        
        res.json(matchIds);
    } catch (error) {
        console.error("Error:", error.response.data);
        res.status(500).json({ error: "Failed to fetch matches" });
    }
});

// POST request to find summoner ID by puuid
app.post("/findId", async (req, res) => {
    const { puuid } = req.body;
    const apiKey = "RGAPI-bf515fa8-79e7-45d5-8b05-12121e6c8326";
    const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apiKey}`;

    try {
        const response = await axios.get(url);

        const summonerId = response.data;

        res.json(summonerId);
    } catch (error) {
        console.error("Error:", error.response.data);
        res.status(500).json({ error: "Failed to fetch summoner IDs" });
    }
});

// POST request to find a summoner by UID
app.post("/findSummoner", async (req, res) => {
    const { puuid } = req.body;
    const apiKey = "RGAPI-bf515fa8-79e7-45d5-8b05-12121e6c8326";
    const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apiKey}`;

    try {
        const response = await axios.get(url);

        const summonerData = response.data;

        res.json(summonerData);
    } catch (error) {
        console.error("Error:", error.response.data);
        res.status(500).json({ error: "Failed to fetch summoner data" });
    }
});

// POST request to find summoner Rank by summonerId
app.post("/findRank", async (req, res) => {
    const { id } = req.body;
    const apiKey = "RGAPI-bf515fa8-79e7-45d5-8b05-12121e6c8326";
    const url = `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${apiKey}`;

    try {
        const response = await axios.get(url);

        const rankData = response.data;

        res.json(rankData);
    }catch (error) {
        console.error("Error:", error.response.data);
        res.status(500).json({ error: "Failed to fetch ranked data" });
    }
});

// POST request to find individual match data based on matchId
app.post("/findMatchData", async (req, res) => {
    const { matchId } = req.body;

    try {
        const existingMatch = await MatchData.findOne({ matchId }); 

        if (existingMatch) {
            const { info, rankData } = existingMatch;
            const endOfGameResult = info.endOfGameResult;
            const gameDuration = info.gameDuration;
            const gameMode = info.gameMode;
            const gameEndTimestamp = info.gameEndTimestamp;
            // Extract and return specific participant data
            const participants = existingMatch.info.participants.map((participant) => ({
                summonerName: participant.summonerName,
                puuid: participant.puuid,
                riotIdGameName: participant.riotIdGameName,
                riotIdTagline: participant.riotIdTagline,
                profileIcon: participant.profileIcon,
                championId: participant.championId.toString(),
                championLevel: participant.championLevel,
                summonerLevel: participant.summonerLevel,
                kills: participant.kills,
                deaths: participant.deaths,
                assists: participant.assists,
                championLevel: participant.champLevel,
                itemsPurchased: participant.itemsPurchased,
                item0: participant.item0,
                item1: participant.item1,
                item2: participant.item2,
                item3: participant.item3,
                item4: participant.item4,
                item5: participant.item5,
                item6: participant.item6,
                summonerSpell1: participant.summoner1Id.toString(),
                summonerSpell2: participant.summoner2Id.toString(),
                goldEarned: participant.goldEarned,
                totalDamageDealtToChampions: participant.totalDamageDealtToChampions,
                totalDamageTaken: participant.totalDamageTaken,
                wardsPlaced: participant.wardsPlaced,
                wardsDestroyed: participant.wardsDestroyed,
                visionScore: participant.visionScore,
                totalMinionsKilled: participant.totalMinionsKilled,
                neutralMinionsKilled: participant.neutralMinionsKilled,
                kda: participant.challenges.kda,
                killParticipation: participant.challenges.killParticipation,
                controlWardsPurchased: participant.visionWardsBoughtInGame,
                doubleKills: participant.doubleKills,
                tripleKills: participant.tripleKills,
                quadraKills: participant.quadraKills,
                pentaKills: participant.pentaKills,
                summonerId: participant.summonerId,
                teamId: participant.teamId,
                role: participant.role,
                perks: {
                    primaryRune: participant.perks.styles[0].selections[0].perk,
                    secondaryStyle: participant.perks.styles[1].style,
                },
                win: participant.win,
            }));

            res.json({ matchId, endOfGameResult, gameDuration, gameEndTimestamp, gameMode, participants});
            return;
        }

        const apiKey = "RGAPI-bf515fa8-79e7-45d5-8b05-12121e6c8326";
        const url = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`;

        const response = await axios.get(url);

        try {
            const { data: { metadata, info } } = response; // Destructure response data

            const newMatch = new MatchData({
                matchId,
                metadata,
                info,
            });


            await newMatch.save();

            const endOfGameResult = info.endOfGameResult;
            const gameDuration = info.gameDuration; 
            const gameMode = info.gameMode;
            const gameEndTimestamp = info.gameEndTimestamp;

            // Extract and return specific participant data from response
            const participants = info.participants.map((participant) => ({
                summonerName: participant.summonerName,
                puuid: participant.puuid,
                riotIdGameName: participant.riotIdGameName,
                riotIdTagline: participant.riotIdTagline,
                profileIcon: participant.profileIcon,
                championId: participant.championId.toString(),
                championLevel: participant.championLevel,
                summonerLevel: participant.summonerLevel,
                kills: participant.kills,
                deaths: participant.deaths,
                assists: participant.assists,
                championLevel: participant.champLevel,
                itemsPurchased: participant.itemsPurchased,
                item0: participant.item0,
                item1: participant.item1,
                item2: participant.item2,
                item3: participant.item3,
                item4: participant.item4,
                item5: participant.item5,
                item6: participant.item6,
                summonerSpell1: participant.summoner1Id.toString(),
                summonerSpell2: participant.summoner2Id.toString(),
                goldEarned: participant.goldEarned,
                totalDamageDealtToChampions: participant.totalDamageDealtToChampions,
                totalDamageTaken: participant.totalDamageTaken,
                wardsPlaced: participant.wardsPlaced,
                wardsDestroyed: participant.wardsDestroyed,
                visionScore: participant.visionScore,
                totalMinionsKilled: participant.totalMinionsKilled,
                neutralMinionsKilled: participant.neutralMinionsKilled,
                kda: participant.challenges.kda,
                killParticipation: participant.challenges.killParticipation,
                controlWardsPurchased: participant.visionWardsBoughtInGame,
                doubleKills: participant.doubleKills,
                tripleKills: participant.tripleKills,
                quadraKills: participant.quadraKills,
                pentaKills: participant.pentaKills,
                summonerId: participant.summonerId,
                teamId: participant.teamId,
                role: participant.role,
                perks: {
                    primaryRune: participant.perks.styles[0].selections[0].perk,
                    secondaryStyle: participant.perks.styles[1].style,
                },
                win: participant.win,
            }));

            res.json({ matchId, endOfGameResult, gameDuration, gameEndTimestamp, gameMode, participants});
        } catch (error) {
            console.error("Error saving match data:", error.message);
            res.status(500).json({ error: "Failed to save match data" });
        }
    } catch (error) {
        if (error.response) {
            console.error("Error fetching match data:", error.response.data);
        } else {
            console.error("Error:", error.message);
        }
        res.status(500).json({ error: "Failed to fetch match data" });
    }
});


app.listen(5069, () => {
    console.log("Server Connection Successful!");
});