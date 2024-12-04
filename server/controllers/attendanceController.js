const Attendance = require("../models/Attendence");

const submitAttendance = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const existingAttendance = await Attendance.findOne({
      studentId: req.user.id,
      date: { $gte: startOfDay },
    });

    if (existingAttendance) {
      return res.status(400).send("Attendance already submitted for today.");
    }

    const attendance = new Attendance({ studentId: req.user.id });
    await attendance.save();
    res.status(201).send("Attendance submitted successfully.");
  } catch (error) {
    res.status(500).send("Error submitting attendance: " + error.message);
  }
};

const getAttendanceReport = async (req, res) => {
  const { filter } = req.query;

  try {
    const date = new Date();
    let startDate;

    if (filter === "daily") {
      startDate = date.setHours(0, 0, 0, 0);
    } else if (filter === "weekly") {
      startDate = new Date(date.setDate(date.getDate() - 7));
    } else if (filter === "monthly") {
      startDate = new Date(date.setDate(1));
    } else {
      return res.status(400).send("Invalid filter value. Use 'daily', 'weekly', or 'monthly'.");
    }

    const report = await Attendance.find({ date: { $gte: startDate } }).populate(
      "studentId",
      "name"
    );

    res.status(200).send(report);
  } catch (error) {
    res.status(500).send("Error fetching attendance report: " + error.message);
  }
};

module.exports = { submitAttendance, getAttendanceReport };