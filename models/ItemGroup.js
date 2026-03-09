const mongoose = require("mongoose");
const itemGroupSchema = new mongoose.Schema({}, { timestamps: true, strict: false });
module.exports = mongoose.model("ItemGroup", itemGroupSchema);
