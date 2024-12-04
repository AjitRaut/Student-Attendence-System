import React, { useState } from "react";
import API from "../utils/Api";

const StudentDashboard = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleAttendance = async () => {
    try {
      await API.post("/attendance/submit");
      setSubmitted(true);
      alert("Attendance submitted successfully!");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert(err.response.data);
        setSubmitted(true);
      } else {
        alert("Failed to submit attendance. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-10">Student Dashboard</h1>
      <button
        onClick={handleAttendance}
        disabled={submitted}
        className={`mt-6 px-6 py-3 font-semibold rounded-lg ${
          submitted
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
      >
        {submitted ? "Attendance Submitted" : "Submit Attendance"}
      </button>
    </div>
  );
};

export default StudentDashboard;
