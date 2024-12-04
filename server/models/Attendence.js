const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["Present", "Absent"], default: "Present" },
});

const attendence = mongoose.model("Attendance", attendanceSchema);
module.exports = attendence;
