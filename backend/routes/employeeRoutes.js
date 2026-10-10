const express = require("express");

const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// All employee routes require login
router.use(protect);

// Admin + HR can view
router.get("/", getEmployees);

router.get("/:id", getEmployee);

// Admin + HR can add
router.post(
  "/",
  authorize("admin", "hr"),
  createEmployee
);

// Admin + HR can edit
router.put(
  "/:id",
  authorize("admin", "hr"),
  updateEmployee
);

// ONLY ADMIN can delete
router.delete(
  "/:id",
  authorize("admin"),
  deleteEmployee
);

module.exports = router;