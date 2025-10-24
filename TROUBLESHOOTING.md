# Smart Expense Tracker - Troubleshooting Guide

## 🔴 Critical Issue: Login Redirects Back Immediately

### Symptoms
- You enter correct credentials on login page
- Page briefly shows loading state
- You see the Dashboard for a split second
- Immediately redirected back to login page
- Terminal shows errors like: `JsonWebTokenError: invalid signature`

### Root Cause
JWT token signature mismatch - old tokens in browser localStorage were created with a different secret key than the server is currently using to verify them.

### Complete Fix (Recommended)

**1. Clear Browser localStorage**
Open browser console (F12) and run:
```javascript
localStorage.clear();
location.reload();
```

**2. Clear All Users from Database**
Open PowerShell in project root:
```powershell
npx tsx server/src/utils/clearUsers.ts
```

You should see:
```
✅ Connected to MongoDB
🗑️  Deleted X users
✅ Disconnected from MongoDB
✨ All users have been cleared!
💡 You can now create a new account with signup
```

**3. Restart Both Servers**
Press `Ctrl+C` in the terminal running the servers, then:
```powershell
npm run dev:all
```

**4. Create Fresh Account**
1. Navigate to: http://localhost:5176/signup
2. Create new account with ANY email/password
3. After signup, you should automatically go to Dashboard
4. Dashboard should load successfully without redirecting

### Alternative Quick Fixes

#### Fix 1: Browser Hard Refresh
1. Open browser on login page
2. Press `Ctrl+Shift+R` (hard refresh)
3. Open DevTools Console (F12)
4. Type: `localStorage.clear()`
5. Refresh page normally
6. Try logging in

#### Fix 2: Use Incognito/Private Window
1. Open browser in Incognito/Private mode
2. Go to http://localhost:5176
3. Create new account via signup
4. This bypasses any cached tokens

#### Fix 3: Recreate Default User
```powershell
npx tsx server/src/utils/clearUsers.ts
npx tsx server/src/utils/seedUser.ts
```
Then login with:
- Email: admin@expense.com
- Password: Admin@123

## 🟡 Common Issues

### Issue: "Cannot connect to MongoDB"

**Symptoms:**
- Terminal shows: `MongooseError: Could not connect to any servers`
- Backend server crashes on startup

**Fix:**
1. Check `server/.env` file exists
2. Verify MONGODB_URI is correct (no spaces, no angle brackets)
3. Check MongoDB Atlas cluster is active
4. Verify IP whitelist in MongoDB Atlas (allow all: 0.0.0.0/0)

### Issue: CORS Errors in Browser Console

**Symptoms:**
- Browser console shows: `Access-Control-Allow-Origin` errors
- API requests fail from frontend

**Fix:**
The backend accepts ports 5173-5179. Check which port Vite is running on:
- Look for: `➜  Local:   http://localhost:XXXX/`
- Port should be between 5173-5179
- If different, update `server/src/index.ts` CORS configuration

### Issue: "Port 5000 already in use"

**Symptoms:**
- Backend fails to start
- Error: `EADDRINUSE: address already in use :::5000`

**Fix:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Or change port in server/.env
PORT=5001
```

### Issue: White Screen on Frontend

**Symptoms:**
- Browser shows blank white page
- No errors in console
- Vite is running successfully

**Fix:**
1. Check browser console for errors
2. Verify `client/index.html` exists
3. Check `vite.config.ts` has correct `root: './client'`
4. Clear browser cache: `Ctrl+Shift+Delete`
5. Hard refresh: `Ctrl+Shift+R`

### Issue: "Cannot find module" errors

**Symptoms:**
- TypeScript errors about missing modules
- Import statements showing red squiggly lines

**Fix:**
```powershell
# Reinstall all dependencies
npm install

# Or install specific missing packages
npm install <package-name>
```

### Issue: Tailwind CSS Styles Not Working

**Symptoms:**
- UI looks unstyled
- Colors and layouts are broken
- Dark theme not applied

**Fix:**
1. Verify `tailwind.config.js` exists
2. Check `postcss.config.js` exists
3. Verify `client/src/index.css` has Tailwind directives:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
4. Restart Vite server

## 🟢 Verification Steps

### Verify Backend is Running
You should see:
```
[dotenv] injecting env (4) from server\.env
✅ MongoDB connected successfully
🚀 Server is running on port 5000
📍 API endpoint: http://localhost:5000
```

### Verify Frontend is Running
You should see:
```
VITE v7.x.x  ready in XXX ms

➜  Local:   http://localhost:5176/
```

### Verify Database Connection
Check terminal for:
```
✅ MongoDB connected successfully
```

### Verify Successful Login
After login, check browser console for:
```
Attempting login with: <your-email>
AuthContext: Login successful, state updated
Login successful, redirecting to dashboard...
```

### Verify Dashboard API Calls
Dashboard should make these requests successfully:
- `GET /api/expenses` (200 OK)
- `GET /api/expenses/summary/daily` (200 OK)
- `GET /api/expenses/summary/monthly` (200 OK)

Check Network tab in DevTools to verify.

## 📊 Debug Checklist

- [ ] Both servers running (backend + frontend)
- [ ] MongoDB connection successful
- [ ] Browser localStorage cleared
- [ ] Using correct port for frontend
- [ ] No CORS errors in console
- [ ] JWT_SECRET defined in server/.env
- [ ] Tried creating new account via signup
- [ ] Checked terminal logs for errors
- [ ] Checked browser console for errors
- [ ] Hard refreshed browser (Ctrl+Shift+R)
- [ ] Used incognito mode to test

## 🆘 Still Having Issues?

### Collect Debug Information

**1. Backend Logs:**
Copy everything from the terminal running the backend

**2. Frontend Logs:**
Open browser console (F12), copy all errors

**3. Network Errors:**
Open DevTools → Network tab → try login → copy failed requests

**4. Environment:**
```powershell
node --version
npm --version
```

**5. Package Versions:**
```powershell
npm list --depth=0
```

### Nuclear Option: Complete Reset

If nothing works, start fresh:

```powershell
# 1. Stop all servers (Ctrl+C)

# 2. Clear database
npx tsx server/src/utils/clearUsers.ts

# 3. Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# 4. Clear browser completely
# In browser: Ctrl+Shift+Delete → Clear everything

# 5. Restart servers
npm run dev:all

# 6. Create new account via signup
```

---

**Remember:** Most authentication issues are solved by clearing localStorage + creating a fresh account!
