# 🚀 START HERE - Complete Setup Guide

## Current Configuration
- **Backend Port:** 8081 (changed from default 8080)
- **Database:** task_management_db
- **MySQL User:** root
- **MySQL Password:** skvasan

## Step-by-Step Setup

### Step 1: Verify Everything is Ready

Double-click: **`verify-setup.bat`**

This will check:
- ✅ Java installation
- ✅ Maven installation  
- ✅ MySQL service status
- ✅ Database existence

If all checks pass, proceed to Step 2.

### Step 2: Start the Backend

Double-click: **`start-backend.bat`**

You should see:
```
Started TaskManagementApplication in X.XXX seconds
```

**IMPORTANT:** Keep this window open! Don't close it.

If you see errors:
- **"Access denied"** → Wrong MySQL password in application.properties
- **"Unknown database"** → Run verify-setup.bat again
- **"Port already in use"** → Close other apps using port 8081

### Step 3: Test the Connection

Open: **`test-connection.html`** in your browser

Click: **"Test Connection"**

You should see: **"✅ SUCCESS! Backend is running!"**

If you see "CONNECTION FAILED":
- Backend is not running → Go back to Step 2
- Check the backend terminal for error messages

### Step 4: Use the Application

Open: **`frontend/index.html`** in your browser

Now you can:
1. Click "Add New Task"
2. Fill in the form
3. Click "Save Task"
4. Task appears in the list!

## Quick Commands

### Start Backend (Terminal)
```bash
cd backend
mvn spring-boot:run
```

### Start Frontend (Terminal)
```bash
cd frontend
python -m http.server 3000
```
Then visit: http://localhost:3000

### Check if Backend is Running
Visit in browser: http://localhost:8081/api/tasks

Should show: `[]` or list of tasks

## Common Issues

### Issue: "Failed to fetch" in frontend
**Solution:** Backend is not running. Start it with start-backend.bat

### Issue: Backend shows MySQL errors
**Solution:** 
1. Check MySQL service is running (Services → MySQL)
2. Verify credentials in application.properties
3. Run verify-setup.bat to create database

### Issue: Port 8081 already in use
**Solution:** 
1. Find what's using port 8081: `netstat -ano | findstr :8081`
2. Close that application
3. Or change port in application.properties to 8082

### Issue: Maven not found
**Solution:** 
1. Download Maven: https://maven.apache.org/download.cgi
2. Add to PATH environment variable
3. Restart terminal

## Testing the Backend Manually

Open Command Prompt and test:

```bash
# Get all tasks
curl http://localhost:8081/api/tasks

# Create a task
curl -X POST http://localhost:8081/api/tasks -H "Content-Type: application/json" -d "{\"taskTitle\":\"Test\",\"priority\":\"High\",\"dueDate\":\"2024-12-31\"}"
```

## File Structure

```
project/
├── verify-setup.bat          ← Run this FIRST
├── start-backend.bat         ← Start backend server
├── start-frontend.bat        ← Start frontend server
├── test-connection.html      ← Test if backend works
├── backend/
│   ├── src/main/resources/
│   │   └── application.properties  ← Database config
│   └── pom.xml
└── frontend/
    ├── index.html            ← Main application
    ├── script.js             ← Frontend logic
    └── styles.css            ← Styling
```

## Need More Help?

1. **QUICK_START.txt** - Simple step-by-step guide
2. **TROUBLESHOOTING.md** - Detailed problem solutions
3. **SETUP_GUIDE.md** - Complete setup instructions
4. **README.md** - Full project documentation

## Success Checklist

- [ ] Ran verify-setup.bat - all checks passed
- [ ] Started backend - saw "Started TaskManagementApplication"
- [ ] Opened test-connection.html - saw success message
- [ ] Opened frontend/index.html - page loads
- [ ] Added a task - task appears in list
- [ ] ✅ Everything works!

---

**Remember:** Always start the backend BEFORE opening the frontend!
