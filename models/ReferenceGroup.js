const mongoose = require("mongoose");
const referenceGroupSchema = new mongoose.Schema({}, { timestamps: true, strict: false });
module.exports = mongoose.model("ReferenceGroup", referenceGroupSchema);
