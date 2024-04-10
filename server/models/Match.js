const mongoose = require("mongoose");

// Schema for PerkStyleSelectionDto
const PerkStyleSelectionSchema = new mongoose.Schema({
  perk: {
    type: Number,
  },
  var1: {
    type: Number,
  },
  var2: {
    type: Number,
  },
  var3: {
    type: Number,
  },
});

// Schema for PerkStyleDto
const PerkStyleSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  selections: [PerkStyleSelectionSchema],
  style: {
    type: Number,
  },
});

// Schema for PerkStatsDto
const PerkStatsSchema = new mongoose.Schema({
  defense: {
    type: Number,
  },
  flex: {
    type: Number,
  },
  offense: {
    type: Number,
  },
});

// Schema for PerksDto
const PerksSchema = new mongoose.Schema({
  statPerks: PerkStatsSchema,
  styles: [PerkStyleSchema],
});

// Sub-schema for participants
const ParticipantSchema = new mongoose.Schema({
  summonerName: {
    type: String,
  },
  puuid: {
    type: String,
  },
  riotIdGameName: {
    type: String,
  },
  riotIdTagline: {
    type: String,
  },
  profileIcon:{
    type: Number,
  },
  championId: {
    type: Number,
  },
  champLevel: {
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
    type: Number, // number of items
  },
  item0: {
    type: Number,
  },
  item1: {
    type: Number,
  },
  item2: {
    type: Number,
  },
  item3: {
    type: Number,
  },
  item4 : {
    type: Number,
  },
  item5 : {
    type: Number,
  },
  item6: {
    type: Number,
  },
  summoner1Id : {
    type: Number,
  },
  summoner2Id: {
    type: Number,
  },
  goldEarned: {
    type: Number,
  },
  totalDamageDealtToChampions: {
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
  totalMinionsKilled: {
    type: Number,
  },
  doubleKills: {
    type: Number,
  },
  tripleKills: {
    type: Number,
  },
  quadraKills: {
    type: Number,
  },
  pentaKills: {
    type: Number,
  },
  summonerId: {
    type: String,
  },
  teamId: {
    type: Number,
  },
  role: {
    type: String,
  },
  perks: PerksSchema,
  win: {
    type: Boolean,
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
