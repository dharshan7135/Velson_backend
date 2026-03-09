const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({}, { timestamps: true, strict: false });
module.exports = mongoose.model("Item", itemSchema);
