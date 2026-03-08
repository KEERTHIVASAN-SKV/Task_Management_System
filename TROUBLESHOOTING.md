# Troubleshooting Guide

Complete solutions for common issues.

## Backend Issues

### Error: "Failed to fetch" in Browser

**Symptoms:**
- Frontend shows "Cannot connect to backend"
- test-connection.html fails

**Causes & Solutions:**

1. **Backend not running**
   ```bash
   # Start backend
   cd backend
   mvn spring-boot:run
   ```

2. **Wrong port**
   - Check `application.properties`: `server.port=8081`
   - Check `frontend/script.js`: `API_URL = 'http://localhost:8081/api/tasks'`
   - Both should match

3. **MySQL not running**
   - Windows: Services → MySQL → Start
   - Mac: `brew services start mysql`
   - Linux: `sudo systemctl start mysql`

### Error: "Access denied for user"

**Cause:** Wrong MySQL credentials

**Solution:**
1. Open: `backend/src/main/resources/application.properties`
2. Update:
   ```properties
   spring.datasource.username=your_correct_username
   spring.datasource.password=your_correct_password
   ```
3. Restart backend

### Error: "Unknown database 'task_management_db'"

**Cause:** Database doesn't exist

**Solution:**
```sql
CREATE DATABASE task_management_db;
```

Or run: `verify-setup.bat` (Windows)

### Error: "Communications link failure"

**Cause:** MySQL service not running

**Solution:**
1. Check MySQL status
2. Start MySQL service
3. Verify MySQL is on port 3306

### Error: "Port 8081 already in use"

**Cause:** Another application using port 8081

**Solutions:**

**Option 1 - Find and close the app:**
```bash
# Windows
netstat -ano | findstr :8081

# Mac/Linux
lsof -i :8081
```

**Option 2 - Change port:**
1. Edit `application.properties`:
   ```properties
   server.port=8082
   ```
2. Edit `frontend/script.js`:
   ```javascript
   const API_URL = 'http://localhost:8082/api/tasks';
   ```
3. Edit `test-connection.html`:
   ```javascript
   const API_URL = 'http://localhost:8082/api/tasks';
   ```

### Error: Maven build fails

**Solutions:**

1. **Clean and rebuild:**
   ```bash
   cd backend
   mvn clean install
   ```

2. **Check Java version:**
   ```bash
   java -version
   # Should be 17 or higher
   ```

3. **Update Maven:**
   ```bash
   mvn --version
   # Should be 3.6+
   ```

## Frontend Issues

### Browser Cache Issues

**Symptoms:**
- test-connection.html works
- frontend/index.html shows error
- Error mentions wrong port

**Solution:**

**Method 1 - Hard Refresh:**
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

**Method 2 - Clear Cache:**
1. Browser Settings
2. Clear browsing data
3. Select "Cached images and files"
4. Clear and reload

**Method 3 - Incognito Mode:**
1. Open Incognito/Private window
2. Open `frontend/index.html`

**Method 4 - Use Debug Tool:**
1. Open `frontend/debug.html`
2. Click "Clear Cache & Reload"

### Modal doesn't open

**Cause:** JavaScript not loaded

**Solution:**
1. Press F12 (open console)
2. Check for JavaScript errors
3. Verify `script.js` is loaded
4. Hard refresh: `Ctrl + Shift + R`

### Tasks don't appear after adding

**Causes & Solutions:**

1. **Check backend logs** for errors
2. **Check browser console** (F12) for errors
3. **Verify API response:**
   ```javascript
   // In browser console
   fetch('http://localhost:8081/api/tasks')
     .then(r => r.json())
     .then(d => console.log(d));
   ```

### CORS errors

**Symptoms:**
- Console shows "CORS policy" error

**Solution:**
Backend already has CORS configured. If still seeing errors:
1. Verify `@CrossOrigin(origins = "*")` in `TaskController.java`
2. Restart backend
3. Clear browser cache

## Database Issues

### Can't connect to MySQL

**Solutions:**

1. **Check MySQL is running:**
   ```bash
   # Windows
   sc query MySQL
   
   # Mac
   brew services list
   
   # Linux
   sudo systemctl status mysql
   ```

2. **Check port 3306:**
   ```bash
   netstat -an | findstr :3306
   ```

3. **Test connection:**
   ```bash
   mysql -u root -p
   # Enter password when prompted
   ```

### Database exists but tables are empty

**Cause:** Spring Boot creates tables automatically

**Verification:**
```sql
USE task_management_db;
SHOW TABLES;
-- Should show: tasks

DESCRIBE tasks;
-- Should show table structure
```

If tables don't exist:
- Check `application.properties`: `spring.jpa.hibernate.ddl-auto=update`
- Restart backend (tables created on startup)

## Testing & Verification

### Test Backend Manually

**Using Browser:**
```
http://localhost:8081/api/tasks
```
Should return: `[]` or list of tasks

**Using curl:**
```bash
# Get all tasks
curl http://localhost:8081/api/tasks

# Create task
curl -X POST http://localhost:8081/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"taskTitle":"Test","priority":"High","dueDate":"2024-12-31"}'

# Get task by ID
curl http://localhost:8081/api/tasks/1

# Delete task
curl -X DELETE http://localhost:8081/api/tasks/1
```

### Check Backend Logs

Look for these in terminal:

**Success:**
```
Started TaskManagementApplication in X.XXX seconds
```

**Database connection:**
```
HikariPool-1 - Start completed
```

**API calls:**
```
Hibernate: select ... from tasks
```

### Verify Configuration

**Check ports match:**
1. `application.properties`: `server.port=8081`
2. `frontend/script.js`: `const API_URL = 'http://localhost:8081/api/tasks'`
3. `test-connection.html`: `const API_URL = 'http://localhost:8081/api/tasks'`

**Check database config:**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/task_management_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## Utility Tools

### verify-setup.bat (Windows)
Checks:
- Java installation
- Maven installation
- MySQL service status
- Database existence

### check-backend-status.bat (Windows)
Tests if backend is responding on port 8081

### frontend/debug.html
- Shows current API URL
- Tests backend connection
- Clears browser cache

## Still Having Issues?

1. **Check all logs:**
   - Backend terminal output
   - Browser console (F12)
   - MySQL error logs

2. **Verify prerequisites:**
   - Java 17+: `java -version`
   - Maven 3.6+: `mvn --version`
   - MySQL 8.0+: `mysql --version`

3. **Try clean restart:**
   - Stop backend (Ctrl+C)
   - Restart MySQL
   - Clear browser cache
   - Start backend
   - Refresh frontend

4. **Test in isolation:**
   - Test MySQL connection
   - Test backend with curl
   - Test frontend in incognito mode

## Quick Reference

| Issue | Quick Fix |
|-------|-----------|
| Failed to fetch | Start backend |
| Access denied | Fix credentials in application.properties |
| Unknown database | CREATE DATABASE task_management_db; |
| Port in use | Change port or close other app |
| Cache issue | Ctrl+Shift+R |
| Backend won't start | Check MySQL is running |
| Tasks don't load | Check backend logs |

## Getting Help

1. Check backend terminal for error messages
2. Check browser console (F12) for JavaScript errors
3. Verify backend is accessible: http://localhost:8081/api/tasks
4. Use `frontend/debug.html` for diagnostics
5. Read `README.md` for full documentation
