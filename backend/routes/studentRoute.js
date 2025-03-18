import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';  // For generating unique filenames

import Student from '../models/studentModel.js';  // Assuming you have a Student model

const router = express.Router();

// Set up multer to store files with unique names and validate image file types
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Store the file in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + '-' + file.originalname;  // Add unique ID to avoid filename conflicts
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(file.mimetype);
    if (extname) {
      return cb(null, true);
    } else {
      return cb(new Error('Only image files are allowed'), false);
    }
  },
});  // Initialize multer with custom storage configuration and file filter

// Define the POST route for adding a student
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, age, status } = req.body;
    const image = req.file;  // File is available in `req.file` if uploaded

    // Check for missing fields
    if (!name || !age || !status) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if the file was uploaded
    if (!image) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Assuming you are saving to a database (e.g., MongoDB)
    const newStudent = {
      name,
      age,
      status,
      imageUrl: `/uploads/${image.filename}`,  // Save the image URL relative to the static file server
    };

    // Save the new student to the database (example)
    const savedStudent = await Student.create(newStudent);

    return res.status(201).json(savedStudent);  // Respond with the saved student
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
