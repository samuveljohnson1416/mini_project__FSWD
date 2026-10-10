# Troubleshooting Guide - Smart Expense Tracker

This guide covers common issues and their recommended solutions.

---

## 1. Login Redirects Back to Login Page

### Symptoms
- You enter valid credentials on `/login`.
- The dashboard briefly appears or loading flashes.
- The page immediately redirects back to `/login`.

### Root Cause
A stale or mismatched JWT token in the browser's `localStorage` from a previous session or secret key rotation.

### Solution
1. **Clear Browser Storage**:
   - Open Developer Tools in your browser (`F12` or `Ctrl + Shift + I`).
   - Go to the **Console** tab.
   - Run:
     ```javascript
     localStorage.clear();
     location.reload();
     ```
2. **Reset Auth Credentials (Optional)**:
   - In terminal, run:
     ```bash
     npm run reset:auth
     ```
   - Login with:
     - **Email:** `admin@expense.com`
     - **Password:** `Admin@123`

---

## 2. MongoDB Atlas Connection / DNS Error (`ENOTFOUND`)

### Symptoms
- Terminal logs show:
  ```
  ⚠️ Remote MongoDB connection failed: querySrv ENOTFOUND _mongodb._tcp.cluster0.lrlzgvg.mongodb.net
  ```

### How the App Handles This
The application includes an **automatic in-memory MongoDB fallback** (`MongoMemoryServer`) for local development:
- If MongoDB Atlas is paused, unreachable, or DNS fails, the server automatically starts a local embedded MongoDB instance.
- It automatically seeds the default `admin@expense.com` account so you can continue testing immediately without any downtime!

### To Reconnect to Remote MongoDB Atlas:
1. Log into your MongoDB Atlas web dashboard.
2. Unpause/resume your cluster.
3. Ensure your current IP address is whitelisted in Atlas Network Access (`0.0.0.0/0` or current IP).
4. Update `server/.env` with your active connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/expense_tracker?retryWrites=true&w=majority
   ```
5. Restart the backend server (`npm run server` or `npm run dev:all`).

---

## 3. Port Conflicts (Port 5000 or 5173 In Use)

### Symptoms
- `EADDRINUSE: address already in use :::5000`

### Solution (Windows PowerShell)
Check and terminate the process holding the port:
```powershell
# Find process on port 5000
Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | Select-Object OwningProcess

# Terminate process by PID
Stop-Process -Id <PID> -Force
```
Vite automatically falls back to ports 5174-5179 if 5173 is occupied, and the backend CORS configuration allows all local ports between 5173-5179.

---

## 4. Resetting Application Data

To wipe all users and reset the database:
```bash
# Clear all users
npm run clear:users

# Reset auth and recreate default admin account
npm run reset:auth
```
