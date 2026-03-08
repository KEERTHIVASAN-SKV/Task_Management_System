# Quick Start Guide

Get the Task Management System running in 3 simple steps.

## Step 1: Setup Database

1. **Start MySQL service**
   - Windows: Services → MySQL → Start
   - Or use MySQL Workbench

2. **Create database**
   ```sql
   CREATE DATABASE task_management_db;
   ```

3. **Configure credentials**
   - Open: `backend/src/main/resources/application.properties`
   - Update:
     ```properties
     spring.datasource.username=your_mysql_username
     spring.datasource.password=your_mysql_password
     ```

## Step 2: Start Backend

### Windows (Easy Way)
Double-click: `run-backend-with-logs.bat`

### Manual (All Platforms)
```bash
cd backend
mvn spring-boot:run
```

**Wait for this message:**
```
Started TaskManagementApplication in X.XXX seconds
```

**Keep this terminal window open!**

## Step 3: Open Application

1. **Test connection (optional):**
   - Open: `test-connection.html`
   - Click "Test Connection"
   - Should show: "✅ SUCCESS!"

2. **Use the app:**
   - Open: `frontend/index.html`
   - Click "Add New Task"
   - Fill form and save
   - Task appears!

## Verification

Backend is running if you can visit:
```
http://localhost:8081/api/tasks
```
Should show: `[]` or list of tasks

## Common Issues

### "Failed to fetch" error
**Cause:** Backend not running  
**Fix:** Start backend with `run-backend-with-logs.bat`

### "Access denied for user"
**Cause:** Wrong MySQL credentials  
**Fix:** Update `application.properties` with correct username/password

### "Unknown database"
**Cause:** Database doesn't exist  
**Fix:** Run `CREATE DATABASE task_management_db;`

### "Port 8081 already in use"
**Cause:** Another app using port 8081  
**Fix:** Close that app or change port in `application.properties`

### Browser cache issue
**Cause:** Browser using old cached files  
**Fix:** Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

## Utility Scripts

- `run-backend-with-logs.bat` - Start backend (recommended)
- `verify-setup.bat` - Check if everything is ready
- `check-backend-status.bat` - Check if backend is running
- `test-connection.html` - Test backend connection
- `frontend/debug.html` - Diagnostic tool

## Configuration

- **Backend Port:** 8081
- **Database Name:** task_management_db
- **API URL:** http://localhost:8081/api/tasks

## Next Steps

- Read `README.md` for full documentation
- Read `TROUBLESHOOTING.md` for detailed problem solutions
- Try the console version in `console-version/`

## Success Checklist

- [ ] MySQL is running
- [ ] Database created
- [ ] Credentials configured
- [ ] Backend started successfully
- [ ] test-connection.html shows success
- [ ] frontend/index.html loads
- [ ] Can create and view tasks
- [ ] ✅ Everything works!
