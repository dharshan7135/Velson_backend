const mongoose = require("mongoose");
const contractorSchema = new mongoose.Schema({}, { timestamps: true, strict: false });
module.exports = mongoose.model("Contractor", contractorSchema);
