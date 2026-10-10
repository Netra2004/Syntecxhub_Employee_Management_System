import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Employees() {
  const navigate = useNavigate();

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/employees");

      setEmployees(response.data.employees || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load employees."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await API.delete(`/employees/${id}`);

      setEmployees((currentEmployees) =>
        currentEmployees.filter(
          (employee) => employee._id !== id
        )
      );

      setCurrentPage(1);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete employee."
      );
    }
  };

  const departments = useMemo(() => {
    const uniqueDepartments = [
      ...new Set(
        employees.map((employee) => employee.department)
      ),
    ];

    return uniqueDepartments.sort();
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        employee.name?.toLowerCase().includes(search) ||
        employee.email?.toLowerCase().includes(search) ||
        employee.role?.toLowerCase().includes(search);

      const matchesDepartment =
        departmentFilter === "All" ||
        employee.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All" ||
        employee.status === statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [
    employees,
    searchTerm,
    departmentFilter,
    statusFilter,
  ]);

  const totalPages = Math.ceil(
    filteredEmployees.length / employeesPerPage
  );

  const startIndex =
    (currentPage - 1) * employeesPerPage;

  const paginatedEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + employeesPerPage
  );

  const clearFilters = () => {
    setSearchTerm("");
    setDepartmentFilter("All");
    setStatusFilter("All");
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDepartmentChange = (e) => {
    setDepartmentFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="employees-page">

      <nav className="dashboard-navbar">
        <div>
          <h2>Employee Management System</h2>
          <p>Employee Management</p>
        </div>

        <button
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>
      </nav>

      <main className="employees-content">

        <div className="employees-header">
          <div>
            <h1>Employees</h1>

            <p>
              Manage your organization's employees.
            </p>
          </div>

          <button
            className="add-employee-button"
            onClick={() => navigate("/employees/add")}
          >
            + Add Employee
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-message">
            Loading employees...
          </div>
        ) : employees.length === 0 ? (
          <div className="empty-state">

            <div className="empty-icon">👥</div>

            <h2>No Employees Found</h2>

            <p>
              Start building your employee database by
              adding your first employee.
            </p>

            <button
              className="add-employee-button"
              onClick={() => navigate("/employees/add")}
            >
              + Add First Employee
            </button>

          </div>
        ) : (
          <>
            <div className="employee-filters">

              <div className="search-box">
                <label>Search Employees</label>

                <input
                  type="text"
                  placeholder="Search by name, email or role..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              <div className="filter-box">
                <label>Department</label>

                <select
                  value={departmentFilter}
                  onChange={handleDepartmentChange}
                >
                  <option value="All">
                    All Departments
                  </option>

                  {departments.map((department) => (
                    <option
                      key={department}
                      value={department}
                    >
                      {department}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-box">
                <label>Status</label>

                <select
                  value={statusFilter}
                  onChange={handleStatusChange}
                >
                  <option value="All">
                    All Status
                  </option>

                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>
              </div>

              <button
                className="clear-filter-button"
                onClick={clearFilters}
              >
                Clear Filters
              </button>

            </div>

            <div className="employee-results">
              <p>
                Showing{" "}
                <strong>
                  {filteredEmployees.length === 0
                    ? 0
                    : startIndex + 1}
                </strong>{" "}
                -{" "}
                <strong>
                  {Math.min(
                    startIndex + employeesPerPage,
                    filteredEmployees.length
                  )}
                </strong>{" "}
                of{" "}
                <strong>
                  {filteredEmployees.length}
                </strong>{" "}
                employees
              </p>
            </div>

            {filteredEmployees.length === 0 ? (
              <div className="empty-state">

                <div className="empty-icon">🔍</div>

                <h2>No Matching Employees</h2>

                <p>
                  No employees match your current
                  search or filters.
                </p>

                <button
                  className="clear-filter-button"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>

              </div>
            ) : (
              <>
                <div className="employee-table-container">

                  <table className="employee-table">

                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>

                      {paginatedEmployees.map(
                        (employee) => (
                          <tr key={employee._id}>

                            <td>
                              {employee.name}
                            </td>

                            <td>
                              {employee.email}
                            </td>

                            <td>
                              {employee.phone}
                            </td>

                            <td>
                              {employee.role}
                            </td>

                            <td>
                              {employee.department}
                            </td>

                            <td>
                              ₹
                              {Number(
                                employee.salary
                              ).toLocaleString("en-IN")}
                            </td>

                            <td>
                              <span
                                className={`status-badge ${
                                  employee.status ===
                                  "Active"
                                    ? "status-active"
                                    : "status-inactive"
                                }`}
                              >
                                {employee.status}
                              </span>
                            </td>

                            <td>
                              <div className="action-buttons">

                                {/* Admin and HR can edit */}
                                <button
                                  className="edit-button"
                                  onClick={() =>
                                    navigate(
                                      `/employees/edit/${employee._id}`
                                    )
                                  }
                                >
                                  Edit
                                </button>

                                {/* Only Admin can delete */}
                                {isAdmin && (
                                  <button
                                    className="delete-button"
                                    onClick={() =>
                                      handleDelete(
                                        employee._id
                                      )
                                    }
                                  >
                                    Delete
                                  </button>
                                )}

                              </div>
                            </td>

                          </tr>
                        )
                      )}

                    </tbody>

                  </table>

                </div>

                {totalPages > 1 && (
                  <div className="pagination">

                    <button
                      className="pagination-button"
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                    >
                      ← Previous
                    </button>

                    <div className="page-numbers">

                      {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                      ).map((page) => (
                        <button
                          key={page}
                          className={`page-number ${
                            currentPage === page
                              ? "active-page"
                              : ""
                          }`}
                          onClick={() =>
                            setCurrentPage(page)
                          }
                        >
                          {page}
                        </button>
                      ))}

                    </div>

                    <button
                      className="pagination-button"
                      onClick={goToNextPage}
                      disabled={
                        currentPage === totalPages
                      }
                    >
                      Next →
                    </button>

                  </div>
                )}

              </>
            )}
          </>
        )}

      </main>

    </div>
  );
}

export default Employees;