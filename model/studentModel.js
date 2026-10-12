import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentname: String,
    email: String,
    age: Number,
    course: String,
  }, { timestamps: true });


const studentModel = mongoose.model("students", studentSchema)  

export default studentModel;