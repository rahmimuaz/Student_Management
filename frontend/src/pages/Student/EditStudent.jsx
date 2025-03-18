import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // useNavigate instead of useHistory
  const [student, setStudent] = useState({
    name: "",
    age: "",
    status: "Inactive",
    image: null,
  });
  const [errorMessage, setErrorMessage] = useState(""); // For error message
  const [successMessage, setSuccessMessage] = useState(""); // For success message

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        // Fetch student by ID
        const response = await axios.get(`/api/student/${id}`);
        setStudent(response.data.data); // Assuming the student data is in response.data.data
      } catch (error) {
        console.error("Error fetching student:", error);
        setErrorMessage("Failed to load student data. Please try again later.");
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleFileChange = (e) => {
    setStudent({ ...student, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student.name || !student.age) {
      setErrorMessage("Name and Age are required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("id", student.studentId);
    formData.append("name", student.name);
    formData.append("age", student.age);
    formData.append("status", student.status);
    if (student.image) formData.append("image", student.image);

    try {
      await axios.post("/api/student/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccessMessage("Student updated successfully");
      setErrorMessage(""); // Clear previous error messages
      navigate("/students"); // use navigate instead of history.push
    } catch (error) {
      console.error("Error updating student:", error);
      setSuccessMessage(""); // Clear any success messages
      setErrorMessage("Error updating student. Please try again.");
    }
  };

  return (
    <div>
      <h2>Edit Student</h2>

      {/* Display error or success messages */}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={student.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status</label>
          <select
            name="status"
            value={student.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default EditStudent;
