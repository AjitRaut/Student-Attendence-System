import React, { useState, useEffect } from "react";
import API from "../utils/Api";

const TeacherDashboard = () => {
  const [filter, setFilter] = useState("daily");
  const [attendanceData, setAttendanceData] = useState([]);

  const fetchAttendance = async () => {
    try {
      const { data } = await API.get(`/attendance/report?filter=${filter}`);
      setAttendanceData(data);
    } catch (err) {
      alert("Failed to fetch attendance data.");
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [filter]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Teacher Dashboard</h1>
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border px-4 py-2">Student Name</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record) => (
            <tr key={record._id}>
              <td className="border px-4 py-2">{record.studentId.name}</td>
              <td className="border px-4 py-2">{new Date(record.date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherDashboard;
