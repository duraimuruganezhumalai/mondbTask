// TASK 1 — Student Management API
// Create a Student collection with the fields name, email, age, course.
// POST — Add a new student.
// GET — Fetch all students.
// GET By ID — Fetch one student using _id.
// DELETE By ID — Delete a student.
// Validation: All fields required, age must be 18 or above.

import courseModel from "../model/courseModel.js";
import employeeModel from "../model/employeeModel.js";
import productModel from "../model/productModel.js";
import studentModel from "../model/studentModel.js";

// Validation: All fields required, age must be 18 or above.

export const studentRegisterController = async (req, res) => {
  console.log("req", req.body);

  try {
    const { studentname, email, age, course } = req.body;

    if (studentname == "" || email == "" || age == "" || course == "") {
      res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
      return;
    }

    const ageNum = Number(age);
    if (ageNum < 18) {
      res.status(400).json({
        success: false,
        msg: "Age must be 18 or above",
      });
      return;
    }

    const emailExist = await studentModel.findOne({ email });
    console.log("emailExist", emailExist);

    if (emailExist) {
      res.status(500).json({ msg: "Email already exit" });
    }

    const saveStudentData = await studentModel.create({
      studentname,
      email,
      age,
      course,
    });

    res.status(201).json({
      success: true,
      message:
        "successfully register please check you email for active your account",
      data: saveStudentData,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const getStudentsController = async (req, res) => {
  try {
    const getStudentsData = await studentModel.find();
    console.log("getStudentsData", getStudentsData);
    res
      .status(200)
      .json({ msg: "data fetched successfully", data: getStudentsData });
  } catch (error) {
    console.log("error", error);
  }
};

export const getStudentByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("single data", id);

    const getById = await studentModel.findById(id);
    console.log("getById", getById);

    res.status(200).json({
      success: true,
      msg: "student fetched successfully",
      data: getById,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteStudentController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("userId", id);

    const deleteData = await studentModel.findByIdAndDelete(id);
    res.status(200).json({ msg: "successfully deleted", data: deleteData });
  } catch (error) {
    console.log("error", error);
  }
};

// TASK 2 — Employee Management API
// Create an Employee collection with the fields name, department, salary, email.
// POST — Add a new employee.
// GET — Fetch all employees.
// GET By ID — Fetch one employee using _id.
// DELETE By ID — Delete an employee.
// Validation: All fields required, salary must be greater than 0.

export const addEmployees = async (req, res) => {
  try {
    const { empname, department, salary, email } = req.body;
    console.log(req.body);

    if (
      !empname ||
      !department ||
      salary === undefined ||
      salary === null ||
      salary === "" ||
      !email
    ) {
      res
        .status(400)
        .json({ success: false, msg: "please provide all details" });
      return;
    }

    const salaryNum = Number(salary);
    if (salaryNum <= 0) {
      res
        .status(400)
        .json({ success: false, msg: "salary must be greater than 0" });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const emailExit = await employeeModel.findOne({ email: normalizedEmail });

    if (emailExit) {
      res.status(409).json({
        success: false,
        msg: "Email already exits",
      });
      return;
    }

    const saveEmpData = await employeeModel.create({
      empname,
      department,
      salary: salaryNum,
      email: normalizedEmail,
    });

    res.status(201).json({
      success: true,
      msg: "successfully register employees details",
      data: saveEmpData,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const getEmployees = async (req, res) => {
  try {
    const getEmployees = await employeeModel.find();
    res.status(200).json({
      success: true,
      msg: "employees data fetched successfully",
      data: getEmployees,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const getSingleEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const getEmp = await employeeModel.findById(id);
    res.status(200).json({
      success: true,
      msg: "fetched employee data",
      data: getEmp,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteEmp = await employeeModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      msg: "Employee deleted successfully",
      data: deleteEmp,
    });
  } catch (error) {
    console.log("error", error);
  }
};

// TASK 3 — Product Management API
// Create a Product collection with the fields productName, price, category, stock.
// POST — Add a new product.
// GET — Fetch all products.
// GET By ID — Fetch one product using _id.
// DELETE By ID — Delete a product.
// Validation: All fields required, price must be greater than 0, stock cannot be negative.

export const addProducts = async (req, res) => {
  try {
    const { productName, price, category, stock } = req.body;

    if (!productName || !price || !category || !stock) {
      res.status(400).json({
        success: false,
        msg: "Please provide all details",
      });
    }

    const priceNum = Number(price);
    if (priceNum < 0) {
      res.status(400).json({
        success: false,
        msg: "price must be greater than 0",
      });
      return;
    }

    const saveProductData = await productModel.create({
      productName,
      price: priceNum,
      category,
      stock,
    });
    res.status(201).json({
      success: true,
      msg: "Product added successfully",
      data: saveProductData,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const getProducts = async (req, res) => {
  try {
    const getProducts = await productModel.find();
    res.status(200).json({
      success: true,
      msg: "fetch all products",
      data: getProducts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  console.log("get single product", id);

  const getProduct = await productModel.findById(id);

  res.status(200).json({
    success: true,
    msg: "fetch single product",
    data: getProduct,
  });
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProduct = await productModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      msg: "Product deleted successfully",
      data: deleteProduct,
    });
  } catch (error) {
    console.log("error", error);
  }
};

// TASK 4 — Course Management API
// Create a Course collection with the fields courseName, trainerName, duration, fees.
// POST — Add a new course.
// GET — Fetch all courses.
// GET By ID — Fetch one course using _id.
// DELETE By ID — Delete a course.
// Validation: All fields required, fees must be greater than 0.

export const addCourses = async (req, res) => {
  try {
    const { courseName, trainerName, duration, fees } = req.body;

    if (!courseName || !trainerName || !duration || !fees) {
      res.status(400).json({
        success: false,
        msg: "please provide all details",
      });
      return;
    }

    const feesNum = Number(fees);
    if (feesNum < 0) {
      res.status(400).json({
        success: false,
        msg: "fees must be greater than 0",
      });
    }

    const saveCourseData = await courseModel.create({
      courseName,
      trainerName,
      duration,
      fees: feesNum,
    });
    res.status(201).json({
      success: true,
      msg: "Courses added successfully",
      data: saveCourseData,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const getCourse = async (req, res) => {
  try {
    const getCourses = await courseModel.find();
    res.status(200).json({
      success: true,
      msg: "all cources fetched successfully",
      data : getCourses
    });
  } catch (error) {
    console.log("error", error);
  }
};



export const getSingleCourse = async (req, res) =>{

try {
    const {id} = req.params;

    const getCourse = await courseModel.findById(id)

    res.status(200).json({
      success: true,
      msg: "course fetched succussfully",
      data: getCourse
    })

} catch (error) {
  console.log("error", error)
}
}



export const deleteCourse = async (req, res) =>{

  try {
    const {id} = req.params;

    const deleteCourse = await courseModel.findByIdAndDelete(id)
    res.status(200).json({
      success: true,
      msg: "course deleted successfully",
      result: deleteCourse
    })
    
  } catch (error) {
    console.log("error", error)
  }



}