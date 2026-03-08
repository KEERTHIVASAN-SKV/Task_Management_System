# Quick Setup Guide

## Step 1: Setup MySQL Database

1. Start MySQL service:
   - Windows: Open Services and start MySQL
   - Or use MySQL Workbench

2. Create the database:
```sql
CREATE DATABASE task_management_db;
```

3. Verify connection settings in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=root
```
Update username/password if different.

## Step 2: Start Backend Server

Open a terminal in the project root:

```bash
cd backend
mvn spring-boot:run
```

Wait until you see: "Started TaskManagementApplication"
Backend will run on: http://localhost:8080

## Step 3: Open Frontend

Option A - Direct file:
- Open `frontend/index.html` in your browser

Option B - Local server (recommended):
```bash
cd frontend
python -m http.server 3000
```
Then visit: http://localhost:3000

## Troubleshooting

### "Failed to fetch" error:
- ✅ Check if backend is running on port 8080
- ✅ Check if MySQL is running
- ✅ Check database exists: `task_management_db`
- ✅ Check MySQL credentials in application.properties

### Backend won't start:
- Check if port 8080 is already in use
- Verify MySQL connection credentials
- Run: `mvn clean install` first

### Test Backend Manually:
Open browser and visit: http://localhost:8080/api/tasks
Should return: `[]` (empty array)

## Quick Test

1. Backend running? Visit: http://localhost:8080/api/tasks
2. Frontend loaded? You should see the purple gradient page
3. Click "Add New Task" - modal should open
4. Fill form and submit - task should appear
