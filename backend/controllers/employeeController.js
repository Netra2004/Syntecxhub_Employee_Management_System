const mongoose = require("mongoose");
const Employee = require("../models/Employee");

// GET ALL EMPLOYEES
const getEmployees = async (req, res) => {
  const employees = await Employee.find().sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    count: employees.length,
    employees,
  });
};

// GET SINGLE EMPLOYEE
const getEmployee = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid employee ID",
    });
  }

  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }

  res.status(200).json({
    success: true,
    employee,
  });
};

// CREATE EMPLOYEE
const createEmployee = async (req, res) => {
  const {
    name,
    email,
    phone,
    role,
    department,
    salary,
    joiningDate,
    status,
    address,
  } = req.body;

  if (
    !name?.trim() ||
    !email?.trim() ||
    !phone?.trim() ||
    !role?.trim() ||
    !department?.trim() ||
    salary === undefined ||
    salary === "" ||
    !joiningDate
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required employee details",
    });
  }

  if (Number.isNaN(Number(salary)) || Number(salary) < 0) {
    return res.status(400).json({
      success: false,
      message: "Salary must be a valid non-negative number",
    });
  }

  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(400).json({
      success: false,
      message: "Invalid employee data",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existingEmployee = await Employee.findOne({
    email: normalizedEmail,
  });

  if (existingEmployee) {
    return res.status(409).json({
      success: false,
      message: "Employee with this email already exists",
    });
  }

  const employee = await Employee.create({
    name: name.trim(),
    email: normalizedEmail,
    phone: phone.trim(),
    role: role.trim(),
    department: department.trim(),
    salary: Number(salary),
    joiningDate,
    status: status || "Active",
    address: address?.trim() || "",
  });

  res.status(201).json({
    success: true,
    message: "Employee created successfully",
    employee,
  });
};

// UPDATE EMPLOYEE
const updateEmployee = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid employee ID",
    });
  }

  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }

  if (
    req.body.salary !== undefined &&
    (Number.isNaN(Number(req.body.salary)) ||
      Number(req.body.salary) < 0)
  ) {
    return res.status(400).json({
      success: false,
      message: "Salary must be a valid non-negative number",
    });
  }

  if (req.body.email) {
    const normalizedEmail =
      req.body.email.trim().toLowerCase();

    const duplicate = await Employee.findOne({
      email: normalizedEmail,
      _id: { $ne: req.params.id },
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "Another employee already uses this email",
      });
    }

    req.body.email = normalizedEmail;
  }

  if (req.body.name) {
    req.body.name = req.body.name.trim();
  }

  if (req.body.phone) {
    req.body.phone = req.body.phone.trim();
  }

  if (req.body.role) {
    req.body.role = req.body.role.trim();
  }

  if (req.body.department) {
    req.body.department =
      req.body.department.trim();
  }

  if (req.body.salary !== undefined) {
    req.body.salary = Number(req.body.salary);
  }

  const updatedEmployee =
    await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

  res.status(200).json({
    success: true,
    message: "Employee updated successfully",
    employee: updatedEmployee,
  });
};

// DELETE EMPLOYEE
const deleteEmployee = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid employee ID",
    });
  }

  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }

  await employee.deleteOne();

  res.status(200).json({
    success: true,
    message: "Employee deleted successfully",
  });
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};