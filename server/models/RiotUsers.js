const mongoose = require("mongoose");

const riotUserSchema = new mongoose.Schema({
    puuid : {
        type: String,
        required: true,
        unique: true,
    },
    riotId: {
      type: String,
      required: true,
      unique: true, 
    },
    tagline: {
      type: String,
      required: true,
    },
  });

const RiotUser = mongoose.model('riotusers', riotUserSchema);
module.exports = RiotUser;