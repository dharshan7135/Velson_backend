const mongoose = require("mongoose");
const taxSchema = new mongoose.Schema({}, { timestamps: true, strict: false });
module.exports = mongoose.model("Tax", taxSchema);
