# Fix: "Cannot Connect to Backend" Error in index.html

## Problem
- test-connection.html works ✓
- Backend is running ✓
- Tasks are being created ✓
- BUT index.html shows "Cannot connect to backend" ✗

## Root Cause
Your browser is caching the OLD version of `script.js` that uses port 8080 instead of 8081.

## Solution - Choose ONE method:

### Method 1: Hard Refresh (Quickest)
1. Open `frontend/index.html` in your browser
2. Press one of these key combinations:
   - **Windows/Linux:** `Ctrl + Shift + R` or `Ctrl + F5`
   - **Mac:** `Cmd + Shift + R`
3. This forces the browser to reload without cache

### Method 2: Clear Browser Cache
1. Open browser settings
2. Find "Clear browsing data" or "Clear cache"
3. Select "Cached images and files"
4. Clear cache
5. Reload `frontend/index.html`

### Method 3: Use Debug Page
1. Open: `frontend/debug.html`
2. Check if it shows "Port 8081" (correct) or "Port 8080" (wrong)
3. Click "Clear Cache & Reload" button
4. Then open `frontend/index.html`

### Method 4: Incognito/Private Mode
1. Open browser in Incognito/Private mode
2. Open `frontend/index.html`
3. Should work immediately (no cache)

### Method 5: Different Browser
1. Try opening `frontend/index.html` in a different browser
2. Should work immediately

## Verify the Fix

After clearing cache, open browser console (F12) and check:
- You should see: `Task Management System - API URL: http://localhost:8081/api/tasks`
- If you see port 8080, cache is still not cleared

## Files Updated
I've updated these files to use port 8081:
- ✓ `frontend/script.js` - Changed API_URL to port 8081
- ✓ `frontend/index.html` - Added cache-busting parameter
- ✓ `test-connection.html` - Already using port 8081

## Test Steps

1. **Clear browser cache** (use Method 1 above)

2. **Open debug page:**
   ```
   frontend/debug.html
   ```
   Should show: "✓ Correct (Port 8081)"

3. **Open main app:**
   ```
   frontend/index.html
   ```
   Should load tasks successfully

4. **Check console (F12):**
   Should see: "API URL: http://localhost:8081/api/tasks"

## Still Not Working?

If after clearing cache it still doesn't work:

1. **Check browser console (F12):**
   - Look for any error messages
   - Verify API URL shows port 8081

2. **Verify backend is running:**
   - Open: http://localhost:8081/api/tasks
   - Should show: `[]` or list of tasks

3. **Try this test:**
   ```javascript
   // Open browser console (F12) and paste:
   fetch('http://localhost:8081/api/tasks')
     .then(r => r.json())
     .then(d => console.log('Tasks:', d))
     .catch(e => console.error('Error:', e));
   ```

4. **Check CORS:**
   - Backend should have `@CrossOrigin(origins = "*")` in controller
   - Already configured in your backend ✓

## Prevention

To avoid cache issues in the future:
- Always use hard refresh when testing changes
- Use browser dev tools with "Disable cache" option enabled
- Test in incognito mode during development

## Quick Reference

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Hard Refresh | Ctrl + Shift + R | Cmd + Shift + R |
| Hard Refresh | Ctrl + F5 | - |
| Open Console | F12 | Cmd + Option + I |
| Incognito | Ctrl + Shift + N | Cmd + Shift + N |

---

**TL;DR:** Press `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac) while on index.html page!
