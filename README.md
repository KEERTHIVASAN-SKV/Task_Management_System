# Task & Deadline Management System

A full-stack web application for managing tasks and deadlines with CRUD operations, built with Java Spring Boot, MySQL, and vanilla JavaScript.

## Features

- ✅ Create, Read, Update, Delete tasks
- 🔍 Search tasks by title
- 🎯 Filter tasks by status (Pending, In Progress, Completed)
- 📊 Priority levels (Low, Medium, High)
- ✓ Mark tasks as completed
- 📱 Responsive design
- 💾 Persistent MySQL database storage

## Tech Stack

**Backend:**
- Java 17+
- Spring Boot 3.2.0
- Spring Data JPA
- MySQL Database
- Maven

**Frontend:**
- HTML5
- CSS3 (Flexbox/Grid)
- Vanilla JavaScript (ES6+)
- Fetch API

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- Modern web browser

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

**Option A - Using batch file (Windows):**
```bash
# Double-click: run-backend-with-logs.bat
```

**Option B - Using terminal:**
```bash
cd backend
mvn spring-boot:run
```

Wait for: `"Started TaskManagementApplication"`

Backend runs on: http://localhost:8081

### 3. Test Connection (Optional)

Open `test-connection.html` in browser and click "Test Connection"

### 4. Open Frontend

Open `frontend/index.html` in your browser

## Project Structure

```
task-management-system/
├── backend/
│   ├── src/main/java/com/taskmanagement/
│   │   ├── TaskManagementApplication.java
│   │   ├── model/Task.java
│   │   ├── repository/TaskRepository.java
│   │   ├── service/TaskService.java
│   │   ├── controller/TaskController.java
│   │   └── exception/GlobalExceptionHandler.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── console-version/
    └── TaskManagementConsole.java
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/tasks | Create new task |
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/{id} | Get task by ID |
| PUT | /api/tasks/{id} | Update task |
| DELETE | /api/tasks/{id} | Delete task |
| GET | /api/tasks/status/{status} | Filter by status |
| GET | /api/tasks/search?title={title} | Search by title |
| PATCH | /api/tasks/{id}/complete | Mark as completed |

## Usage

1. Click "Add New Task" to create a task
2. Fill in required fields (Title, Priority, Due Date)
3. View all tasks in card layout
4. Use filters to view tasks by status
5. Search tasks using the search bar
6. Edit or delete tasks using action buttons
7. Mark tasks as completed with the Complete button

## Troubleshooting

**"Failed to fetch" error:**
- Backend is not running → Start it with `run-backend-with-logs.bat`
- MySQL is not running → Start MySQL service
- Database doesn't exist → Run `CREATE DATABASE task_management_db;`

**Backend won't start:**
- Check MySQL credentials in `application.properties`
- Verify MySQL is running on port 3306
- Check if port 8081 is available

**Browser cache issues:**
- Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Or open in Incognito/Private mode

For detailed troubleshooting, see `TROUBLESHOOTING.md`

## Console Version

Run the standalone console application:
```bash
cd console-version
javac TaskManagementConsole.java
java TaskManagementConsole
```

## Configuration

- Backend Port: 8081 (configurable in `application.properties`)
- Database: task_management_db
- API Base URL: http://localhost:8081/api/tasks

## License

This project is for educational purposes.
