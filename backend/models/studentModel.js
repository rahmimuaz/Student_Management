import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';  // Import uuid for generating unique IDs

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true, default: () => uuidv4() },  // Generate a unique studentId by default
  name: { type: String, required: true },
  image: { type: String, required: false }, // Image URL
  age: { type: Number, required: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Inactive' }, // Status (Active/Inactive)
  date: { type: Date, default: Date.now }
});

const studentModel = mongoose.models.student || mongoose.model("student", studentSchema);

export default studentModel;
