const mongoose = require("mongoose");
const processSchema = new mongoose.Schema({}, { timestamps: true, strict: false });
module.exports = mongoose.model("Process", processSchema);
