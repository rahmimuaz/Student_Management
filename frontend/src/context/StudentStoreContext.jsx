// src/context/StudentStoreContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create the context for student data
export const StudentStoreContext = createContext(null);

const StudentStoreContextProvider = (props) => {
    const [students, setStudents] = useState([]);
    const [studentDetails, setStudentDetails] = useState(null);
    const [token, setToken] = useState(""); // For authentication token
    const [userId, setUserId] = useState(""); // User ID of the logged-in admin

    const url = "http://localhost:5001"; // API URL (update accordingly)

    // Fetch the list of students
    const fetchStudentList = async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/students");
            setStudents(response.data.data); // Assuming the API response includes a `data` property
        } catch (error) {
            console.error("Error fetching student list:", error);
        }
    };

    // Fetch student details by ID
    const fetchStudentDetails = async (studentId) => {
        try {
            const response = await axios.get(`${url}/api/students/${studentId}`);
            setStudentDetails(response.data); // Assuming the API returns student details
        } catch (error) {
            console.error("Error fetching student details:", error);
        }
    };

    // Add a new student
    const addStudent = async (studentData) => {
        try {
            const response = await axios.post(`${url}/api/students/add`, studentData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.success) {
                setStudents((prev) => [...prev, response.data.student]);
                console.log("Student added successfully:", response.data.student);
            } else {
                console.error("Error adding student:", response.data.message);
            }
        } catch (error) {
            console.error("Error adding student:", error);
        }
    };

    // Update student details
    const updateStudent = async (studentId, updatedData) => {
        try {
            const response = await axios.put(`${url}/api/students/update/${studentId}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.success) {
                setStudents((prev) =>
                    prev.map((student) =>
                        student._id === studentId ? { ...student, ...updatedData } : student
                    )
                );
                console.log("Student updated successfully:", response.data.student);
            } else {
                console.error("Error updating student:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };

    // Delete a student
    const deleteStudent = async (studentId) => {
        try {
            const response = await axios.delete(`${url}/api/students/delete/${studentId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.success) {
                setStudents((prev) => prev.filter((student) => student._id !== studentId));
                console.log("Student deleted successfully:", studentId);
            } else {
                console.error("Error deleting student:", response.data.message);
            }
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    // Load user data and student list when the component mounts
    useEffect(() => {
        const loadData = async () => {
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
            }
            await fetchStudentList(); // Fetch the student list
        };
        loadData();
    }, []);

    // Context value to provide
    const contextValue = {
        students,
        studentDetails,
        setStudentDetails,
        fetchStudentList,
        fetchStudentDetails,
        addStudent,
        updateStudent,
        deleteStudent,
        token,
        setToken,
        userId, // User ID for the logged-in admin
    };

    return (
        <StudentStoreContext.Provider value={contextValue}>
            {props.children}
        </StudentStoreContext.Provider>
    );
};

export default StudentStoreContextProvider;
