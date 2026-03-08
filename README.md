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
- Java 21
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

- Java 17 , 21 or higher
- Maven 3.6+
- MySQL 8.0+
- Modern web browser

## Database Setup

1. Install MySQL and start the service
2. Create database:
```sql
CREATE DATABASE task_management_db;
```

3. Update credentials in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## Running the Application

### Quick Start (Windows)

1. **Setup MySQL Database:**
   - Start MySQL service
   - Run `check-mysql.sql` in MySQL Workbench to create database

2. **Start Backend:**
   - Double-click `start-backend.bat`
   - Wait for "Started TaskManagementApplication" message

3. **Test Connection (Optional but Recommended):**
   - Open `test-connection.html` in browser
   - Click "Test Connection" button
   - Should show "✅ SUCCESS! Backend is running!"

4. **Start Frontend:**
   - Double-click `start-frontend.bat`
   - Or open `frontend/index.html` directly in browser

### Manual Start

#### Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

Server runs on: http://localhost:8080

#### Frontend

```bash
cd frontend
python -m http.server 3000
```

Then visit: http://localhost:3000

Or simply open `frontend/index.html` in your browser.

#### Console Version

```bash
cd console-version
javac TaskManagementConsole.java
java TaskManagementConsole
```

### Troubleshooting

**"Failed to fetch" error in browser:**
- Backend is not running - start it first using `start-backend.bat`
- MySQL is not running - start MySQL service
- Database doesn't exist - run `check-mysql.sql`

**Backend won't start:**
- Check MySQL credentials in `application.properties`
- Verify MySQL is running on port 3306
- Check if port 8080 is available

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

## Project Structure

```
task-management-system/
├── backend/
│   ├── src/main/java/com/taskmanagement/
│   │   ├── model/Task.java
│   │   ├── repository/TaskRepository.java
│   │   ├── service/TaskService.java
│   │   ├── controller/TaskController.java
│   │   └── exception/GlobalExceptionHandler.java
│   └── pom.xml
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── console-version/
    └── TaskManagementConsole.java
```

## Usage

1. Click "Add New Task" to create a task
2. Fill in required fields (Title, Priority, Due Date)
3. View all tasks in card layout
4. Use filters to view tasks by status
5. Search tasks using the search bar
6. Edit or delete tasks using action buttons
7. Mark tasks as completed with the Complete button

## Validation

- Task Title: Required
- Priority: Required (Low/Medium/High)
- Due Date: Required
- Status: Auto-set to "Pending" for new tasks

## License

This project is for educational purposes.
