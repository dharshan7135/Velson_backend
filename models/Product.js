const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({}, { timestamps: true, strict: false });
module.exports = mongoose.model("Product", productSchema);
