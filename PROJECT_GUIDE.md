# Complete Project Guide

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Setup Instructions](#setup-instructions)
4. [Development Guide](#development-guide)
5. [API Documentation](#api-documentation)
6. [Deployment](#deployment)

## Project Overview

### What is this?
A full-stack Task & Deadline Management System that allows users to:
- Create, read, update, and delete tasks
- Set priorities (Low, Medium, High)
- Track task status (Pending, In Progress, Completed)
- Search and filter tasks
- Set due dates and track creation time

### Technology Stack

**Backend:**
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA (ORM)
- MySQL 8.0 (Database)
- Maven (Build tool)

**Frontend:**
- HTML5
- CSS3 (Flexbox/Grid)
- Vanilla JavaScript (ES6+)
- Fetch API (HTTP requests)

**Console Version:**
- Core Java
- ArrayList & HashMap
- Scanner for input

## Architecture

### Backend Architecture (MVC Pattern)

```
┌─────────────────────────────────────────┐
│           Controller Layer              │
│  (TaskController.java)                  │
│  - REST API endpoints                   │
│  - Request/Response handling            │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│           Service Layer                 │
│  (TaskService.java)                     │
│  - Business logic                       │
│  - Data validation                      │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Repository Layer                │
│  (TaskRepository.java)                  │
│  - Database operations                  │
│  - JPA queries                          │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│            Database                     │
│  (MySQL - task_management_db)           │
│  - tasks table                          │
└─────────────────────────────────────────┘
```

### Frontend Architecture

```
┌─────────────────────────────────────────┐
│         User Interface (HTML)           │
│  - Task list display                    │
│  - Modal forms                          │
│  - Filters and search                   │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│      JavaScript Logic (script.js)       │
│  - Event handlers                       │
│  - DOM manipulation                     │
│  - API calls (Fetch)                    │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         REST API (Backend)              │
│  http://localhost:8081/api/tasks        │
└─────────────────────────────────────────┘
```

### Database Schema

```sql
CREATE TABLE tasks (
    task_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    task_title VARCHAR(255) NOT NULL,
    task_description VARCHAR(1000),
    priority VARCHAR(50) NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    created_date_time DATETIME NOT NULL
);
```

## Setup Instructions

### Prerequisites Installation

**1. Java 17+**
- Download: https://www.oracle.com/java/technologies/downloads/
- Verify: `java -version`

**2. Maven 3.6+**
- Download: https://maven.apache.org/download.cgi
- Add to PATH
- Verify: `mvn --version`

**3. MySQL 8.0+**
- Download: https://dev.mysql.com/downloads/mysql/
- Install and start service
- Verify: `mysql --version`

### Database Setup

```sql
-- Create database
CREATE DATABASE task_management_db;

-- Verify
USE task_management_db;
SHOW TABLES;
```

### Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/task_management_db
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password

# Server Configuration
server.port=8081

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Running the Application

**Backend:**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

**Frontend:**
- Open `frontend/index.html` in browser
- Or use local server: `python -m http.server 3000`

## Development Guide

### Adding New Features

**1. Add new field to Task entity:**
```java
// Task.java
@Column
private String newField;

// Add getter and setter
```

**2. Update repository (if needed):**
```java
// TaskRepository.java
List<Task> findByNewField(String value);
```

**3. Add service method:**
```java
// TaskService.java
public List<Task> getTasksByNewField(String value) {
    return taskRepository.findByNewField(value);
}
```

**4. Add controller endpoint:**
```java
// TaskController.java
@GetMapping("/newfield/{value}")
public ResponseEntity<List<Task>> getByNewField(@PathVariable String value) {
    return ResponseEntity.ok(taskService.getTasksByNewField(value));
}
```

**5. Update frontend:**
```javascript
// script.js
async function getByNewField(value) {
    const response = await fetch(`${API_URL}/newfield/${value}`);
    return await response.json();
}
```

### Code Structure

**Backend Package Structure:**
```
com.taskmanagement/
├── TaskManagementApplication.java  (Main class)
├── model/
│   └── Task.java                   (Entity)
├── repository/
│   └── TaskRepository.java         (Data access)
├── service/
│   └── TaskService.java            (Business logic)
├── controller/
│   └── TaskController.java         (REST API)
└── exception/
    └── GlobalExceptionHandler.java (Error handling)
```

**Frontend Structure:**
```
frontend/
├── index.html      (Main page)
├── styles.css      (Styling)
├── script.js       (Logic)
└── debug.html      (Diagnostic tool)
```

### Testing

**Backend Testing:**
```bash
# Run tests
mvn test

# Run with coverage
mvn clean test jacoco:report
```

**Manual API Testing:**
```bash
# Get all tasks
curl http://localhost:8081/api/tasks

# Create task
curl -X POST http://localhost:8081/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"taskTitle":"Test","priority":"High","dueDate":"2024-12-31"}'

# Update task
curl -X PUT http://localhost:8081/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"taskTitle":"Updated","priority":"Low","dueDate":"2024-12-31","status":"Completed"}'

# Delete task
curl -X DELETE http://localhost:8081/api/tasks/1
```

## API Documentation

### Base URL
```
http://localhost:8081/api/tasks
```

### Endpoints

#### 1. Create Task
```
POST /api/tasks
Content-Type: application/json

Request Body:
{
    "taskTitle": "Complete project",
    "taskDescription": "Finish the task management system",
    "priority": "High",
    "dueDate": "2024-12-31"
}

Response: 201 Created
{
    "taskId": 1,
    "taskTitle": "Complete project",
    "taskDescription": "Finish the task management system",
    "priority": "High",
    "dueDate": "2024-12-31",
    "status": "Pending",
    "createdDateTime": "2024-03-08T10:30:00"
}
```

#### 2. Get All Tasks
```
GET /api/tasks

Response: 200 OK
[
    {
        "taskId": 1,
        "taskTitle": "Complete project",
        ...
    }
]
```

#### 3. Get Task by ID
```
GET /api/tasks/{id}

Response: 200 OK or 404 Not Found
```

#### 4. Update Task
```
PUT /api/tasks/{id}
Content-Type: application/json

Request Body: (same as create)

Response: 200 OK
```

#### 5. Delete Task
```
DELETE /api/tasks/{id}

Response: 204 No Content
```

#### 6. Filter by Status
```
GET /api/tasks/status/{status}
Example: /api/tasks/status/Pending

Response: 200 OK
```

#### 7. Search by Title
```
GET /api/tasks/search?title={keyword}
Example: /api/tasks/search?title=project

Response: 200 OK
```

#### 8. Mark as Completed
```
PATCH /api/tasks/{id}/complete

Response: 200 OK
```

### Error Responses

```json
// Validation Error (400)
{
    "taskTitle": "Task title is required",
    "priority": "Priority is required"
}

// Not Found (404)
{
    "error": "Task not found with id: 1"
}

// Server Error (500)
{
    "error": "An unexpected error occurred"
}
```

## Deployment

### Production Configuration

**application-prod.properties:**
```properties
spring.datasource.url=jdbc:mysql://production-host:3306/task_management_db
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

server.port=8080
```

### Building for Production

```bash
# Build JAR file
cd backend
mvn clean package -DskipTests

# Run JAR
java -jar target/task-management-system-1.0.0.jar
```

### Docker Deployment (Optional)

**Dockerfile:**
```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: task_management_db
      MYSQL_ROOT_PASSWORD: password
    ports:
      - "3306:3306"
  
  backend:
    build: ./backend
    ports:
      - "8081:8081"
    depends_on:
      - mysql
```

## Best Practices

### Backend
- Use DTOs for API requests/responses
- Implement proper exception handling
- Add logging (SLF4J)
- Use transactions for data consistency
- Implement pagination for large datasets
- Add API versioning (/api/v1/tasks)

### Frontend
- Implement proper error handling
- Add loading states
- Use debouncing for search
- Implement client-side validation
- Add accessibility features (ARIA labels)
- Optimize for mobile devices

### Security
- Add Spring Security for authentication
- Implement JWT tokens
- Use HTTPS in production
- Sanitize user inputs
- Implement rate limiting
- Add CORS configuration properly

## Resources

- Spring Boot Documentation: https://spring.io/projects/spring-boot
- Spring Data JPA: https://spring.io/projects/spring-data-jpa
- MySQL Documentation: https://dev.mysql.com/doc/
- JavaScript MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript

## License

This project is for educational purposes.
