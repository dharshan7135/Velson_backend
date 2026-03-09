const mongoose = require("mongoose");
const serviceJobSchema = new mongoose.Schema({}, { timestamps: true, strict: false });
module.exports = mongoose.model("ServiceJob", serviceJobSchema);
