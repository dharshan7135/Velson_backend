const mongoose = require("mongoose");
const referenceSchema = new mongoose.Schema({}, { timestamps: true, strict: false });
module.exports = mongoose.model("Reference", referenceSchema);
