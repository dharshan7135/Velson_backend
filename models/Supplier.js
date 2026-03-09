const mongoose = require("mongoose");
const supplierSchema = new mongoose.Schema({}, { timestamps: true, strict: false });
module.exports = mongoose.model("Supplier", supplierSchema);
