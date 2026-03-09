const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({}, { timestamps: true, strict: false });
module.exports = mongoose.model("Account", accountSchema);
