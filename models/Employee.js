const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({}, { timestamps: true, strict: false });
module.exports = mongoose.model("Employee", employeeSchema);
