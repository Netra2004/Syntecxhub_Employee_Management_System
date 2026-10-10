import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EmployeeForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    salary: "",
    joiningDate: "",
    status: "Active",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(isEditMode);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditMode) {
      fetchEmployee();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await API.get(`/employees/${id}`);

      const employee = response.data.employee;

      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        phone: employee.phone || "",
        role: employee.role || "",
        department: employee.department || "",
        salary: employee.salary || "",
        joiningDate: employee.joiningDate
          ? employee.joiningDate.substring(0, 10)
          : "",
        status: employee.status || "Active",
        address: employee.address || "",
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load employee."
      );
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (isEditMode) {
        await API.put(`/employees/${id}`, {
          ...formData,
          salary: Number(formData.salary),
        });
      } else {
        await API.post("/employees", {
          ...formData,
          salary: Number(formData.salary),
        });
      }

      navigate("/employees");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to save employee."
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="loading-message">
        Loading employee...
      </div>
    );
  }

  return (
    <div className="employee-form-page">
      <nav className="dashboard-navbar">
        <div>
          <h2>Employee Management System</h2>
          <p>
            {isEditMode
              ? "Edit Employee"
              : "Add Employee"}
          </p>
        </div>

        <button
          className="back-button"
          onClick={() => navigate("/employees")}
        >
          ← Employees
        </button>
      </nav>

      <main className="employee-form-content">
        <div className="employee-form-card">
          <div className="employee-form-header">
            <h1>
              {isEditMode
                ? "Edit Employee"
                : "Add New Employee"}
            </h1>

            <p>
              {isEditMode
                ? "Update employee information."
                : "Enter the employee details below."}
            </p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-grid">

              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="form-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="form-group">
                <label>Phone</label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="form-group">
                <label>Job Role</label>

                <input
                  type="text"
                  name="role"
                  placeholder="e.g. Software Developer"
                  value={formData.role}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="form-group">
                <label>Department</label>

                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Department
                  </option>

                  <option value="IT">
                    IT
                  </option>

                  <option value="HR">
                    HR
                  </option>

                  <option value="Finance">
                    Finance
                  </option>

                  <option value="Marketing">
                    Marketing
                  </option>

                  <option value="Sales">
                    Sales
                  </option>

                  <option value="Operations">
                    Operations
                  </option>
                </select>
              </div>


              <div className="form-group">
                <label>Salary</label>

                <input
                  type="number"
                  name="salary"
                  placeholder="Enter salary"
                  value={formData.salary}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>


              <div className="form-group">
                <label>Joining Date</label>

                <input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>
              </div>


              <div className="form-group full-width">
                <label>Address</label>

                <textarea
                  name="address"
                  placeholder="Enter employee address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate("/employees")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-button"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : isEditMode
                  ? "Update Employee"
                  : "Add Employee"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EmployeeForm;