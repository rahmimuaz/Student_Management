import Student from '../models/studentModel.js';  // Assuming you have a Student model

// Add student function
export const addStudent = async (req, res) => {
  const { name, age, status, image } = req.body;
  try {
    const newStudent = new Student({ name, age, status, image });
    await newStudent.save();
    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding student" });
  }
};

// List students function
export const listStudent = async (req, res) => {
  try {
    const students = await Student.find();  // Fetch all students
    res.json({ data: students });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
};

// Update student function
export const updateStudent = async (req, res) => {
  const { id, name, age, status, image } = req.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, { name, age, status, image }, { new: true });
    res.json({ message: "Student updated successfully", data: updatedStudent });
  } catch (error) {
    res.status(500).json({ message: "Error updating student" });
  }
};

// Delete student function
export const deleteStudent = async (req, res) => {
  const { id } = req.body;
  try {
    await Student.findByIdAndDelete(id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student" });
  }
};
