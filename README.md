# 🚀 Employee Management System

A modern full-stack **Employee Management System** built using the **MERN stack**. The application provides secure authentication, Admin/HR role-based access, employee management, dashboard analytics, search, filtering, pagination, and a responsive user interface.

---

## 📌 Project Overview

The Employee Management System is designed to simplify employee administration and HR operations through a centralized web application.

Authorized users can securely log in and manage employee records based on their assigned role. The dashboard provides an overview of employee statistics, departments, active/inactive employees, and recently added employees.

The project follows a full-stack architecture with a **React frontend**, **Node.js + Express backend**, and **MongoDB database**.

---

## ✨ Features

### 🔐 Authentication & Authorization

- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Protected routes and APIs
- Admin and HR roles
- Role-based access control
- Secure logout

### 👥 Employee Management

- Add new employees
- View employee records
- View individual employee details
- Edit employee information
- Delete employees
- Active/Inactive employee status
- Department management
- Employee salary information
- Joining date management
- Employee address management

### 🔎 Search & Filtering

- Search employees
- Filter by department
- Filter by employee status
- Pagination for employee records

### 📊 Dashboard

- Total employees
- Total departments
- Active employees
- Inactive employees
- Department-wise employee distribution
- Department percentage visualization
- Recently added employees
- Quick actions for employee management

### 🛡️ Validation & Error Handling

- Required field validation
- Email validation
- Duplicate employee email prevention
- Salary validation
- Employee ID validation
- MongoDB validation handling
- Centralized backend error handling
- User-friendly frontend error messages

### 🎨 Responsive UI

- Clean modern interface
- Responsive dashboard
- Responsive employee table
- Responsive forms
- Mobile-friendly layout
- Consistent navigation and styling

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- JavaScript
- HTML5
- CSS3
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman
- MongoDB Atlas

---

## 🏗️ Project Architecture

```text
Employee Management System
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── employeeController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Employee.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── employeeRoutes.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employees.jsx
│   │   │   └── EmployeeForm.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md

🔄 Application Flow
User
 │
 ▼
Login / Register
 │
 ▼
JWT Authentication
 │
 ▼
Protected Dashboard
 │
 ├── View Statistics
 │
 ├── Manage Employees
 │      │
 │      ├── Add
 │      ├── View
 │      ├── Edit
 │      └── Delete
 │
 └── Search / Filter / Pagination
 │
 ▼
Express REST API
 │
 ▼
MongoDB


🔐 Authentication Flow
The application uses JWT (JSON Web Token) for authentication.
1. User registers or logs in.
2. Backend validates the credentials.
3. Passwords are securely hashed using bcrypt.
4. Backend generates a JWT token.
5. Token is stored on the frontend.
6. Axios automatically sends the token with protected API requests.
7. Backend middleware verifies the token.
8. Authorized users can access protected resources.


👤 User Roles
The application supports two roles:
Role	  Access
Admin	  Manage employees and perform administrative actions
HR	    Manage employee information and access HR features

Role-based restrictions are implemented for protected actions.


🌐 API Endpoints
Authentication
Method	  Endpoint	        Description
POST	  /api/auth/register	Register a new user
POST	  /api/auth/login	    Login user


Employees
Method	  Endpoint	        Description
GET	    /api/employees	    Get all employees
GET	    /api/employees/:id	Get employee by ID
POST    /api/employees	    Create employee
PUT	    /api/employees/:id	Update employee
DELETE	/api/employees/:id	Delete employee

Employee endpoints require authentication.


📋 Employee Data
Each employee record contains:
- Full Name
- Email
- Phone
- Job Role
- Department
- Salary
- Joining Date
- Status
- Address
Supported employee statuses:
  Active
  Inactive


⚙️ Installation & Setup
1. Clone the Repository
  git clone https://github.com/Netra2004/Syntecxhub_Employee_Management_System.git

Navigate into the project:
  cd Syntecxhub_Employee_Management_System

🔧 Backend Setup
Navigate to the backend:
  cd backend

Install dependencies:
  npm install

Create a .env file inside the backend folder:
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret

Start the backend in development mode:
  npm run dev

The backend will run on:
  http://localhost:5000


💻 Frontend Setup
Open another terminal and navigate to the frontend:
  cd frontend

Install dependencies:
  npm install

Start the frontend:
  npm run dev

The frontend will run on the Vite development server, usually:
  http://localhost:5173


🔑 Environment Variables
The backend requires the following environment variables:
Variable	  Description
PORT	      Backend server port
MONGO_URI	  MongoDB connection string
JWT_SECRET	Secret key used to sign JWT tokens


⚠️ Security
Never upload your .env file to GitHub.
The .gitignore file should contain:
  node_modules/
  .env
  dist/
  .vite/

🧪 API Testing
The backend APIs can be tested using Postman.
Example:
Login
  POST http://localhost:5000/api/auth/login

Request body:
  {
    "email": "your-email@example.com",
    "password": "your-password"
  }

Get Employees
  GET http://localhost:5000/api/employees

For protected requests, include:
  Authorization: Bearer YOUR_JWT_TOKEN


📊 Dashboard
The dashboard provides a centralized overview of the organization.
It displays:
- 👥 Total Employees
- 🏢 Departments
- ✅ Active Employees
- ⏸️ Inactive Employees
- 📊 Department Distribution
- 👤 Recently Added Employees
- ⚡ Quick Actions


🔍 Employee Management
The employee management page provides:
- Employee listing
- Search functionality
- Department filtering
- Status filtering
- Pagination
- Add employee
- Edit employee
- Delete employee
- Employee status management


🧠 Key Concepts Demonstrated
This project demonstrates practical implementation of:
- RESTful API development
- MVC-style backend architecture
- JWT authentication
- Role-based authorization
- Password hashing
- MongoDB database integration
- Mongoose schemas and validation
- React component architecture
- React Router
- Axios API integration
- Protected frontend routes
- CRUD operations
- Search and filtering
- Pagination
- Error handling
- Environment variables
- Responsive web design


📸 Screenshots
Login Page
<img width="975" height="513" alt="image" src="https://github.com/user-attachments/assets/b1c330f1-6bca-4de0-8939-741236ea6197" />
<img width="975" height="513" alt="image" src="https://github.com/user-attachments/assets/c110a474-c675-420c-bbb8-a1ec9b8e5478" />

Dashboard
<img width="975" height="447" alt="image" src="https://github.com/user-attachments/assets/d09a98b7-10f0-4012-b2d2-dd032e17a20b" />
<img width="975" height="509" alt="image" src="https://github.com/user-attachments/assets/d155c225-ff03-4681-bb66-6cac33d3d3a2" />

Employee Management
<img width="975" height="514" alt="image" src="https://github.com/user-attachments/assets/3d7372ec-8aa4-4f36-b2da-49fd59e7a5c0" />

Add / Edit Employee
<img width="958" height="470" alt="image" src="https://github.com/user-attachments/assets/d5591983-26a9-4e88-a837-b91bddba2cb5" />


🚀 Future Enhancements
The project can be extended with:
- Employee profile photos
- Attendance management
- Leave management
- Payroll management
- Email notifications
- Excel/PDF employee reports
- Advanced analytics
- Admin user management
- Department management
- Cloud deployment
- AI-powered HR assistance
- Employee performance tracking


🎯 Project Objectives
The main objectives of this project are:
1. Build a practical full-stack MERN application.
2. Implement secure user authentication.
3. Implement role-based authorization.
4. Develop complete employee CRUD functionality.
5. Integrate MongoDB for persistent data storage.
6. Create an interactive HR dashboard.
7. Implement search, filtering, and pagination.
8. Develop a responsive and user-friendly interface.
9. Demonstrate real-world REST API development.


📚 Learning Outcomes
Through this project, the following skills were developed:
- Full-stack web development
- React.js development
- Node.js and Express.js
- MongoDB and Mongoose
- REST API development
- Authentication and authorization
- Database operations
- Frontend-backend integration
- API testing with Postman
- Git and GitHub
- Error handling and validation
- Responsive UI development


👩‍💻 Author
Nethra G S
Computer Science & Engineering Graduate


GitHub
https://github.com/Netra2004


⭐ Support
If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.


📄 License
This project is created for educational and portfolio purposes.
