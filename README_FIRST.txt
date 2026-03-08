================================================================================
                    TASK MANAGEMENT SYSTEM
                   COMPLETE SETUP INSTRUCTIONS
================================================================================

YOUR CURRENT ISSUE: "Failed to fetch" error
REASON: Backend server is not running on port 8081

================================================================================
                        SOLUTION - 3 SIMPLE STEPS
================================================================================

STEP 1: VERIFY SETUP
--------------------
Double-click: verify-setup.bat

This checks:
- Java ✓
- Maven ✓  
- MySQL ✓
- Database ✓

Wait for "ALL CHECKS PASSED!" message.


STEP 2: START BACKEND
---------------------
Double-click: run-backend-with-logs.bat

Wait for this message:
"Started TaskManagementApplication in X.XXX seconds (JVM running for X.XXX)"

DO NOT CLOSE THIS WINDOW!


STEP 3: TEST & USE
------------------
A) Test connection:
   - Open: test-connection.html
   - Click "Test Connection"
   - Should show: "✅ SUCCESS!"

B) Use the app:
   - Open: frontend/index.html
   - Click "Add New Task"
   - Fill form and save
   - Task appears!

================================================================================
                            IMPORTANT NOTES
================================================================================

✓ Your backend runs on PORT 8081 (not 8080)
✓ I've already updated frontend to use port 8081
✓ Database credentials are already configured (root/skvasan)
✓ Keep backend window open while using the app

⚠️  BROWSER CACHE ISSUE:
If index.html shows "Cannot connect" but test-connection.html works:
→ Your browser cached the old script.js file
→ Press Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac) to hard refresh
→ Or open frontend/debug.html to check and clear cache

================================================================================
                         IF BACKEND WON'T START
================================================================================

Check the error message in the terminal:

ERROR: "Access denied for user 'root'"
→ Wrong MySQL password
→ Update: backend/src/main/resources/application.properties

ERROR: "Unknown database 'task_management_db'"
→ Database doesn't exist
→ Run: verify-setup.bat (it will create it)

ERROR: "Communications link failure"
→ MySQL service not running
→ Start MySQL from Services (Windows)

ERROR: "Port 8081 already in use"
→ Another app is using port 8081
→ Close that app or change port in application.properties

================================================================================
                          HELPFUL FILES CREATED
================================================================================

verify-setup.bat              - Check if everything is ready
run-backend-with-logs.bat     - Start backend with clear logs
test-connection.html          - Test if backend is working
START_HERE.md                 - Detailed setup guide
TROUBLESHOOTING.md            - Solutions for all problems

================================================================================
                            QUICK TEST
================================================================================

After starting backend, open browser and visit:
http://localhost:8081/api/tasks

You should see: []  (empty array)

If you see this, backend is working! Open frontend/index.html

================================================================================
                          NEED MORE HELP?
================================================================================

1. Read START_HERE.md for detailed instructions
2. Read TROUBLESHOOTING.md for specific error solutions
3. Check backend terminal for error messages
4. Make sure MySQL service is running

================================================================================

Ready? Start with: verify-setup.bat

================================================================================
