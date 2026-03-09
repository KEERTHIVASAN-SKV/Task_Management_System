# Task & Deadline Management System - TaskFlow

A modern full-stack web application for managing tasks and deadlines with user authentication, built with Java Spring Boot, MySQL, and vanilla JavaScript.

## Features

- 🔐 User Authentication (Register/Login)
- ✅ Create, Read, Update, Delete tasks
- 🔍 Search tasks by title
- 🎯 Filter tasks by status and priority
- 📊 Priority levels (Low, Medium, High)
- ✓ Mark tasks as completed
- 📱 Modern, responsive design with animations
- 💾 Persistent MySQL database storage
- 📈 Dashboard with task statistics

## Tech Stack

**Backend:**
- Java 17+
- Spring Boot 3.2.0
- Spring Data JPA
- MySQL Database
- Maven

**Frontend:**
- HTML5
- CSS3 (Modern animations & gradients)
- Vanilla JavaScript (ES6+)
- Fetch API

## Quick Start

### 1. Setup MySQL Database

Start MySQL service and create database:
```sql
CREATE DATABASE task_management_db;
```

Update credentials in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 2. Start Backend

**Windows:**
```bash
# Double-click: run-backend-with-logs.bat
```

**Terminal:**
```bash
cd backend
mvn spring-boot:run
```

Wait for: `"Started TaskManagementApplication"`

Backend runs on: http://localhost:8081

### 3. Open Application

Open `frontend/index.html` in your browser or:
```bash
cd frontend
python -m http.server 3000
```

Then visit: http://localhost:3000

### 4. Register & Login

1. Click "Get Started"
2. Create an account on the registration page
3. Login with your credentials
4. Start managing your tasks!

## Application Flow

1. **Landing Page** (`index.html`) - Welcome page
2. **Register** (`register.html`) - Create new account
3. **Login** (`login.html`) - Sign in to your account
4. **Dashboard** (`dashboard.html`) - Main task management interface

## Project Structure

```
task-management-system/
├── backend/
│   ├── src/main/java/com/taskmanagement/
│   │   ├── TaskManagementApplication.java
│   │   ├── model/
│   │   │   ├── Task.java
│   │   │   └── User.java
│   │   ├── repository/
│   │   │   ├── TaskRepository.java
│   │   │   └── UserRepository.java
│   │   ├── service/
│   │   │   ├── TaskService.java
│   │   │   └── UserService.java
│   │   ├── controller/
│   │   │   ├── TaskController.java
│   │   │   └── AuthController.java
│   │   └── exception/
│   │       └── GlobalExceptionHandler.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/
│   ├── index.html          (Landing page)
│   ├── login.html          (Login page)
│   ├── register.html       (Registration page)
│   ├── dashboard.html      (Main app)
│   ├── auth.css            (Auth pages styling)
│   ├── auth.js             (Auth logic)
│   ├── dashboard.css       (Dashboard styling)
│   └── dashboard.js        (Dashboard logic)
└── console-version/
    └── TaskManagementConsole.java
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/user/{id} | Get user details |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/tasks | Create new task |
| GET | /api/tasks?userId={id} | Get user's tasks |
| GET | /api/tasks/{id} | Get task by ID |
| PUT | /api/tasks/{id} | Update task |
| DELETE | /api/tasks/{id} | Delete task |
| GET | /api/tasks/status/{status} | Filter by status |
| GET | /api/tasks/search?title={title} | Search by title |
| PATCH | /api/tasks/{id}/complete | Mark as completed |

## Features Showcase

### Modern UI
- Gradient backgrounds with animations
- Smooth transitions and hover effects
- Responsive design for all devices
- Professional color scheme
- Card-based layout

### Dashboard
- Real-time task statistics
- Filter by status and priority
- Search functionality
- Quick actions (Complete, Edit, Delete)
- User profile section

### Authentication
- Secure user registration
- Login with validation
- Session management with localStorage
- Auto-redirect for authenticated users

## Configuration

- Backend Port: 8081 (configurable in `application.properties`)
- Database: task_management_db
- API Base URL: http://localhost:8081/api

## Troubleshooting

**"Failed to fetch" error:**
- Backend is not running → Start it with `run-backend-with-logs.bat`
- MySQL is not running → Start MySQL service
- Database doesn't exist → Run `CREATE DATABASE task_management_db;`

**Can't login:**
- Make sure you've registered first
- Check backend logs for errors
- Verify database connection

**Browser cache issues:**
- Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Or open in Incognito/Private mode

For detailed troubleshooting, see `TROUBLESHOOTING.md`

## License

This project is for educational purposes.
