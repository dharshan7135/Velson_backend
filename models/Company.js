const mongoose = require("mongoose");

// Fully flexible schema - accepts any fields the frontend sends
const companySchema = new mongoose.Schema({}, { timestamps: true, strict: false });

module.exports = mongoose.model("Company", companySchema);
