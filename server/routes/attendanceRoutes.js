const express = require("express");
const { submitAttendance, getAttendanceReport } = require("../controllers/attendanceController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/submit", auth("student"), submitAttendance);
router.get("/report", auth("teacher"), getAttendanceReport);

module.exports = router;
