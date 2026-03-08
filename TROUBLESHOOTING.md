# Troubleshooting Guide

## Error: "Failed to fetch" in Browser

This error means the frontend cannot connect to the backend API.

### Solution Steps:

1. **Check if Backend is Running**
   - Open a new terminal
   - Navigate to project folder
   - Run: `cd backend`
   - Run: `mvn spring-boot:run`
   - Wait for message: "Started TaskManagementApplication in X seconds"

2. **Verify Backend is Accessible**
   - Open browser
   - Visit: http://localhost:8080/api/tasks
   - You should see: `[]` (empty array) or list of tasks
   - If you see error page, backend is not running properly

3. **Check MySQL is Running**
   - Open Services (Windows) or Activity Monitor (Mac)
   - Look for MySQL service
   - Make sure it's running
   - If not, start it

4. **Verify Database Exists**
   - Open MySQL Workbench or command line
   - Run: `SHOW DATABASES;`
   - Look for `task_management_db`
   - If missing, run: `CREATE DATABASE task_management_db;`

5. **Check MySQL Credentials**
   - Open: `backend/src/main/resources/application.properties`
   - Verify username and password match your MySQL installation
   - Default is:
     ```
     spring.datasource.username=root
     spring.datasource.password=root
     ```

6. **Refresh Frontend**
   - After backend is running, refresh the browser page
   - Or click the "Retry Connection" button

## Backend Won't Start

### Error: "Access denied for user"
- MySQL credentials are wrong
- Update `application.properties` with correct username/password

### Error: "Communications link failure"
- MySQL is not running
- Start MySQL service

### Error: "Port 8080 already in use"
- Another application is using port 8080
- Stop that application or change port in `application.properties`:
  ```
  server.port=8081
  ```
- Also update frontend `script.js`:
  ```javascript
  const API_URL = 'http://localhost:8081/api/tasks';
  ```

### Error: "Unknown database 'task_management_db'"
- Database doesn't exist
- Create it: `CREATE DATABASE task_management_db;`

## Maven Issues

### "mvn: command not found"
- Maven is not installed
- Download from: https://maven.apache.org/download.cgi
- Add to PATH environment variable

### Build fails
- Run: `mvn clean install`
- Check Java version: `java -version` (should be 17+)

## Frontend Issues

### Modal doesn't open
- Check browser console (F12) for JavaScript errors
- Make sure `script.js` is loaded

### Tasks don't appear after adding
- Check browser console for errors
- Verify backend received the request
- Check backend logs for errors

## Testing Backend Manually

Use these curl commands to test backend:

```bash
# Get all tasks
curl http://localhost:8080/api/tasks

# Create a task
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d "{\"taskTitle\":\"Test Task\",\"priority\":\"High\",\"dueDate\":\"2024-12-31\"}"

# Get task by ID
curl http://localhost:8080/api/tasks/1

# Delete task
curl -X DELETE http://localhost:8080/api/tasks/1
```

## Still Having Issues?

1. Check all logs in terminal where backend is running
2. Check browser console (F12 → Console tab)
3. Verify all prerequisites are installed:
   - Java 17+
   - Maven 3.6+
   - MySQL 8.0+
4. Try restarting everything:
   - Stop backend (Ctrl+C)
   - Restart MySQL
   - Start backend again
   - Refresh frontend
