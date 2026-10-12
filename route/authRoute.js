import express from "express";
import { addCourses, addEmployees, addProducts, deleteCourse, deleteEmployee, deleteProduct, deleteStudentController, getCourse, getEmployees, getProducts, getSingleCourse, getSingleEmployee, getSingleProduct, getStudentByIdController, getStudentsController, studentRegisterController } from "../controller/authController.js";

const route = express.Router()

// student api endpoint
route.post("/students", studentRegisterController)
route.get("/students", getStudentsController)
route.get("/students/:id", getStudentByIdController)
route.delete("/students/:id", deleteStudentController)


//employee api endpoint
route.post("/employees", addEmployees)
route.get("/employees", getEmployees)
route.get("/employees/:id", getSingleEmployee)
route.delete("/employees/:id", deleteEmployee)


//product api endpoint
route.post("/products", addProducts)
route.get("/products", getProducts)
route.get("/products/:id", getSingleProduct)
route.delete("/products/:id", deleteProduct)


route.post("/courses", addCourses)
route.get("/courses", getCourse)
route.get("/courses/:id", getSingleCourse)
route.delete("/courses/:id", deleteCourse)


export default route;

//STUDENTS API
// http://localhost:5000/api/students - insert
// http://localhost:5000/api/students - fetch all
// http://localhost:5000/api/students/6acb7396e75ccf5f81a2bb96 - get single data
// http://localhost:5000/api/students/6acb71e87d8bd1a41edafbfc - delete


//EMPLOYEE API
// http://localhost:5000/api/employees - insert
// http://localhost:5000/api/employees - fetch all
// http://localhost:5000/api/employees/6acba0def11cd6c6c13537b4 - get single data
// http://localhost:5000/api/employees - delete


// PRODUCT API
// http://localhost:5000/api/products - insert
// http://localhost:5000/api/products - fetch all
// http://localhost:5000/api/products/6acbb1428d8a12861ec3acaa - get single data
// http://localhost:5000/api/products - delete


// COURSES API
// http://localhost:5000/api/courses - insert
// http://localhost:5000/api/courses - fetch all
// http://localhost:5000/api/courses/6acc456a7a30f639e26e1332 - get single data
// http://localhost:5000/api/courses/6acc46007a30f639e26e1335 - delete









