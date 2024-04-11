const mongoose = require("mongoose");

const rankedDataSchema = new mongoose.Schema({
  leagueId: {
      type: String,
  },
  queueType: {
      type: String,
  },
  tier: {
      type: String,
  },
  rank: {
      type: String,
  },
  summonerId: {
      type: String,
  },
  leaguePoints: {
      type: Number,
  },
  wins: {
      type: Number,
  },
  losses: {
      type: Number,
  },
  veteran: {
      type: Boolean,
  },
  inactive: {
      type: Boolean,
  },
  freshBlood: {
      type: Boolean,
  },
  hotStreak: {
      type: Boolean,
  }
});

const riotUserSchema = new mongoose.Schema({
    puuid : {
        type: String,
        required: true,
        unique: true,
    },
    riotId: {
      type: String,
    },
    tagline: {
      type: String,
    },
    rank: {
      type: String
    },
  });

const RiotUser = mongoose.model('riotusers', riotUserSchema);
module.exports = RiotUser;