import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await API.get("/employees");

      setEmployees(response.data.employees || []);
    } catch (error) {
      console.error(
        "Failed to load employees:",
        error.response?.data?.message ||
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  const departments = new Set(
    employees.map((employee) => employee.department)
  ).size;

  const departmentStats = useMemo(() => {
    const stats = {};

    employees.forEach((employee) => {
      stats[employee.department] =
        (stats[employee.department] || 0) + 1;
    });

    return Object.entries(stats).sort(
      (a, b) => b[1] - a[1]
    );
  }, [employees]);

  const recentEmployees = [...employees]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="dashboard-page">

      <nav className="dashboard-navbar">
        <div>
          <h2>Employee Management System</h2>
          <p>HR Management Dashboard</p>
        </div>

        <button
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </button>
      </nav>

      <main className="dashboard-content">

        <div className="welcome-section">
          <h1>
            Welcome, {user?.name || "User"} 👋
          </h1>

          <p>
            Manage employees and monitor your
            organization from one place.
          </p>

          <div className="user-role">
            Role:{" "}
            <strong>
              {user?.role?.toUpperCase()}
            </strong>
          </div>
        </div>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <div className="card-icon">👥</div>
            <h3>Total Employees</h3>
            <p>
              {loading ? "..." : totalEmployees}
            </p>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🏢</div>
            <h3>Departments</h3>
            <p>
              {loading ? "..." : departments}
            </p>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">✅</div>
            <h3>Active Employees</h3>
            <p>
              {loading ? "..." : activeEmployees}
            </p>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">⏸️</div>
            <h3>Inactive Employees</h3>
            <p>
              {loading ? "..." : inactiveEmployees}
            </p>
          </div>

        </div>

        <div className="dashboard-actions">

          <h2>Quick Actions</h2>

          <div className="quick-actions">

            <button
              className="primary-action"
              onClick={() =>
                navigate("/employees")
              }
            >
              👥 Manage Employees
            </button>

            <button
              className="secondary-action"
              onClick={() =>
                navigate("/employees/add")
              }
            >
              ➕ Add Employee
            </button>

          </div>

        </div>

        <div className="department-section">

          <div className="section-header">
            <div>
              <h2>Department Overview</h2>
              <p>
                Employee distribution by department
              </p>
            </div>
          </div>

          {loading ? (
            <div className="recent-loading">
              Loading department statistics...
            </div>
          ) : departmentStats.length === 0 ? (
            <div className="recent-empty">
              <div className="empty-icon">📊</div>

              <h3>No department data</h3>

              <p>
                Add employees to view department
                statistics.
              </p>
            </div>
          ) : (
            <div className="department-list">

              {departmentStats.map(
                ([department, count]) => {

                  const percentage =
                    totalEmployees > 0
                      ? Math.round(
                          (count /
                            totalEmployees) *
                            100
                        )
                      : 0;

                  return (
                    <div
                      className="department-item"
                      key={department}
                    >
                      <div className="department-info">

                        <strong>
                          {department}
                        </strong>

                        <span>
                          {count} employee
                          {count !== 1
                            ? "s"
                            : ""}{" "}
                          ({percentage}%)
                        </span>

                      </div>

                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              )}

            </div>
          )}

        </div>

        <div className="recent-employees">

          <div className="section-header">

            <div>
              <h2>Recent Employees</h2>

              <p>
                Recently added employees
              </p>
            </div>

            <button
              className="view-all-button"
              onClick={() =>
                navigate("/employees")
              }
            >
              View All →
            </button>

          </div>

          {loading ? (
            <div className="recent-loading">
              Loading employees...
            </div>
          ) : recentEmployees.length === 0 ? (
            <div className="recent-empty">

              <div className="empty-icon">
                👥
              </div>

              <h3>No employees yet</h3>

              <p>
                Add your first employee to see
                them here.
              </p>

              <button
                className="primary-action"
                onClick={() =>
                  navigate("/employees/add")
                }
              >
                + Add Employee
              </button>

            </div>
          ) : (
            <div className="recent-table-container">

              <table className="recent-table">

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {recentEmployees.map(
                    (employee) => (
                      <tr key={employee._id}>

                        <td>
                          <strong>
                            {employee.name}
                          </strong>

                          <small>
                            {employee.email}
                          </small>
                        </td>

                        <td>
                          {employee.role}
                        </td>

                        <td>
                          {employee.department}
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

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </main>

    </div>
  );
}

export default Dashboard;