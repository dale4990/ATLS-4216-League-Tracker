const mongoose = require("mongoose");

// Sub-schema for participants
const ParticipantSchema = new mongoose.Schema({
  summonerName: {
    type: String,
  },
  championId: {
    type: Number,
  },
  summonerLevel: {
    type: Number,
  },
  kills: {
    type: Number,
  },
  deaths: {
    type: Number,
  },
  assists: {
    type: Number,
  },
  championLevel: {
    type: Number,
  },
  itemsPurchased: {
    type: [Number], // Array of item IDs
  },
  goldEarned: {
    type: Number,
  },
  totalDamageDealt: {
    type: Number,
  },
  totalDamageTaken: {
    type: Number,
  },
  wardsPlaced: {
    type: Number,
  },
  wardsDestroyed: {
    type: Number,
  },
  visionScore: {
    type: Number,
  },
  creepScore: {
    type: Number,
  },
  role: {
    type: String,
  },
});

// Sub-schema for bans
const BanSchema = new mongoose.Schema({
  championId: {
    type: Number,
    required: true,
  },
  pickTurn: {
    type: Number,
  },
});

// Schema for teams
const TeamSchema = new mongoose.Schema({
  teamId: {
    type: Number,
    required: true,
  },
  win: {
    type: Boolean,
    required: true,
  },
  bans: [BanSchema],
});

// Info schema
const InfoSchema = new mongoose.Schema({
  endOfGameResult: {
    type: String,
    required: true,
  },
  gameCreation: {
    type: Number,
    required: true,
  },
  gameDuration: {
    type: Number,
    required: true,
  },
  gameEndTimestamp: {
    type: Number,
    required: true,
  },
  gameId: {
    type: Number,
    required: true,
    unique: true,
  },
  gameMode: {
    type: String,
    required: true,
  },
  gameName: {
    type: String,
    required: true,
  },
  gameStartTimestamp: {
    type: Number,
    required: true,
  },
  gameType: {
    type: String,
    required: true,
  },
  gameVersion: {
    type: String,
    required: true,
  },
  mapId: {
    type: Number,
    required: true,
  },
  participants: [ParticipantSchema],
  platformId: {
    type: String,
    required: true,
  },
  queueId: {
    type: Number,
    required: true,
  },
  teams: [TeamSchema],
  tournamentCode: {
    type: String,
  },
});

// Match schema
const MatchSchema = new mongoose.Schema({
  matchId: {
    type: String,
    required: true,
    unique: true,
  },
  metadata: {
    dataVersion: String,
    matchId: String,
    participants: [String],
  },
  info: InfoSchema,
});

const MatchData = mongoose.model("matchdatas", MatchSchema);

module.exports = MatchData;
