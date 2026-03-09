const mongoose = require("mongoose");
const groupMasterSchema = new mongoose.Schema({}, { timestamps: true, strict: false });
module.exports = mongoose.model("GroupMaster", groupMasterSchema);
