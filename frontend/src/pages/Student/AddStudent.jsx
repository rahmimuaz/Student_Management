import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddStudent = () => {
  const url = "http://localhost:5001"; // Updated URL for API
  const [image, setImage] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [date, setDate] = useState('');
  const [data, setData] = useState({
    name: "",
    age: "",
    status: "",
    gender: "",
  });

  useEffect(() => {
    const generateStudentId = () => {
      const id = 'STU-' + Math.floor(Math.random() * 1000000);
      setStudentId(id);
    };
    generateStudentId();

    const currentDate = new Date().toISOString().split('T')[0];
    setDate(currentDate);
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("studentId", studentId);
    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("age", data.age);
    formData.append("status", data.status);
    formData.append("gender", data.gender);
    formData.append("date", date);

    try {
      const response = await axios.post(`${url}/api/students/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          age: "",
          status: "",
          gender: "",
        });
        setImage(null);
        setStudentId('');
        setDate('');

        confirmAlert({
          title: 'Student Added',
          message: 'The student has been successfully added.',
          buttons: [
            {
              label: 'OK',
              onClick: () => {}
            }
          ]
        });
      } else {
        alert('Error adding student');
      }
    } catch (error) {
      alert('An error occurred while adding the student');
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className="dashboard">
      <div className="StudentAddSidebar">
        <ul className="sidebar-list">
          <li className="sidebar-item"><Link to="/dashboard/admin">Dashboard</Link></li>
          <li className="sidebar-item"><Link to="/add-student">Add Student</Link></li>
          <li className="sidebar-item"><Link to="/students-list">Student List</Link></li>
        </ul>
      </div>
      
      <div className="add-container">
        <form className='flex-col' onSubmit={onSubmitHandler}>
          <div className="add-student-id">
            <p>Student ID</p>
            <input type="text" name='studentId' value={studentId} readOnly />
          </div>

          <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image" className="image-upload-label">
              <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload Area" />
            </label>
            <input onChange={handleImageChange} type="file" id="image" hidden />
            {image && <p>{image.name}</p>} {/* Show the file name once an image is selected */}
          </div>

          <div className="add-student-name flex-col">
            <p>Student Name</p>
            <input type="text" name='name' placeholder='Type here' value={data.name} onChange={onChangeHandler} required />
          </div>

          <div className="add-student-age flex-col">
            <p>Age</p>
            <input type="number" name='age' placeholder='Enter age' value={data.age} onChange={onChangeHandler} required />
          </div>

          <div className="add-status-gender">
            <div className="add-status flex-col">
              <p>Status</p>
              <select name="status" value={data.status} onChange={onChangeHandler} required>
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="add-gender flex-col">
              <p>Gender</p>
              <select name="gender" value={data.gender} onChange={onChangeHandler} required>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="add-date">
            <p>Date</p>
            <input type="text" name='date' value={date} readOnly />
          </div>

          <button type='submit' className='add-btn'>ADD</button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
