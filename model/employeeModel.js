import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    empname: String,
    department: String,
    salary: Number,
    email: String,
  },
  { timestamps: true },
);

const employeeModel = mongoose.model("employees", employeeSchema);

export default employeeModel;
