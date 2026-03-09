const mongoose = require("mongoose");
const characteristicSchema = new mongoose.Schema({}, { timestamps: true, strict: false });
module.exports = mongoose.model("Characteristic", characteristicSchema);
