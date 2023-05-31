const mongoose = require("mongoose");

const refreshTokenSchema = mongoose.Schema({});

module.exports = mongoose.model("refreshtoken", refreshTokenSchema);
