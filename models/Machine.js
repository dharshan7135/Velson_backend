const mongoose = require("mongoose");
const machineSchema = new mongoose.Schema({}, { timestamps: true, strict: false });
module.exports = mongoose.model("Machine", machineSchema);
