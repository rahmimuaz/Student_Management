import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/students/list");
        setStudents(response.data); // Assuming the response is an array of students
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Failed to fetch students. Please try again later.");
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const changeStatus = async (studentId, status) => {
    try {
      const response = await axios.post("http://localhost:5001/api/students/change-status", { id: studentId, status });
      alert(response.data.message);
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.studentId === studentId ? { ...student, status: response.data.data.status } : student
        )
      );
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  const deleteStudent = async (studentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    try {
      const response = await axios.post("http://localhost:5001/api/students/delete", { id: studentId });
      alert(response.data.message);
      setStudents(students.filter((student) => student.studentId !== studentId));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div>
      <h2>Student List</h2>

      {/* Show loading spinner or message if still loading */}
      {loading && <p>Loading students...</p>}
      
      {/* Show error message if there is an error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.studentId}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.status}</td>
                <td>
                  <button
                    onClick={() =>
                      changeStatus(
                        student.studentId,
                        student.status === "Active" ? "Inactive" : "Active"
                      )
                    }
                  >
                    Change Status
                  </button>
                  <button onClick={() => deleteStudent(student.studentId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;
