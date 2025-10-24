# Smart Expense Tracker - Running Instructions

## 📋 Prerequisites
- Node.js installed
- MongoDB Atlas account (already configured)
- All dependencies installed

## 🚀 How to Run the Project

### Step 1: Start the Application
Open PowerShell in the project root directory and run:
```powershell
npm run dev:all
```

This will start:
- **Backend Server** on `http://localhost:5000`
- **Frontend Client** on `http://localhost:5176` (or 5173-5175 if available)

### Step 2: Access the Application
Open your browser and go to: **http://localhost:5176**

### Step 3: Login Credentials
Use these credentials to login:

**📧 Email:** `admin@expense.com`  
**🔑 Password:** `Admin@123`

## 🔧 If Login Issues Persist

### Quick Fix: Reset Authentication (Recommended)
Run this single command to fix JWT token issues:
```powershell
npm run reset:auth
```

This will:
- Clear all users from database
- Create fresh admin user
- Show you the next steps

Then:
1. Clear browser localStorage: `localStorage.clear()` in console (F12)
2. Refresh page
3. Login with `admin@expense.com` / `Admin@123`

### Option 1: Clear Browser Data
1. Press `F12` to open Developer Tools
2. Go to **Console** tab
3. Type: `localStorage.clear()` and press Enter
4. Refresh the page (F5)
5. Try logging in again

### Option 2: Clear All Users
Run this command in PowerShell:
```powershell
npm run clear:users
```
Then create a new account via signup.

### Option 3: Recreate Default User
Run this command in PowerShell:
```powershell
npm run seed:user
```

### Option 4: Use Signup Instead
1. Go to **http://localhost:5176/signup**
2. Create a new account with any email/password
3. You'll be automatically logged in

## 📱 Application Features

Once logged in, you can:

### Dashboard
- **Add Expenses**: Type naturally like "tea 25" or "lunch 250"
- **View Expenses**: See all your expenses in a card layout
- **Filter**: Search by description or filter by category
- **Edit/Delete**: Click on any expense to modify or remove it
- **Summary**: View daily and monthly expense totals

### Analytics
- **Pie Chart**: Category-wise spending breakdown
- **Bar Chart**: Daily spending trends
- **Total Summary**: Last 30 days total expenses

## 🗂️ Expense Categories
The app supports these categories:
- Food & Drinks
- Shopping
- Transportation
- Entertainment
- Bills & Utilities
- Healthcare
- Education
- Travel
- Personal
- Other

## 💡 Natural Language Input Examples
Try these in the chat input:
- `tea 25` → ₹25 for Food & Drinks
- `uber 120` → ₹120 for Transportation
- `electricity bill 500` → ₹500 for Bills & Utilities
- `movie tickets 400` → ₹400 for Entertainment
- `groceries 850` → ₹850 for Shopping

## 🐛 Troubleshooting

### Login Redirects Back Immediately (JWT Token Issue)

If you login successfully but immediately get redirected back to the login page, this is a JWT token signature mismatch. Follow these steps:

**Step 1: Clear Browser Storage**
1. Open browser Developer Tools (`F12`)
2. Go to **Console** tab
3. Run: `localStorage.clear(); location.reload();`

**Step 2: Clear All Users from Database**
```powershell
npx tsx server/src/utils/clearUsers.ts
```

**Step 3: Create a Fresh Account**
1. Go to the **Signup** page
2. Create a new account (use any email/password)
3. You should be automatically logged in
4. If successful, the Dashboard will load without redirecting back

**Why This Happens:**
- Old tokens created with different JWT secrets remain in localStorage
- New login creates a valid token, but old token is being used for API calls
- Clearing storage ensures fresh token generation

### Backend Issues
- Check if port 5000 is available
- Verify MongoDB connection in terminal logs
- Look for "✅ MongoDB connected successfully"
- Check for JWT errors: "invalid signature" means token mismatch

### Frontend Issues
- Check if Vite is running on port 5176
- Look for "VITE ready in xxx ms"
- Clear browser cache and localStorage
- Check browser console for API errors (401 Unauthorized)

### CORS Errors
The backend accepts requests from ports 5173-5179. If you see CORS errors, the issue is likely the frontend is running on a different port.

## 📝 Database
- **MongoDB Atlas**: Cluster0 (already configured)
- **Database Name**: Auto-created by Mongoose
- **Collections**: users, expenses

## 🔐 Security Notes
- JWT tokens expire in 7 days
- Passwords are hashed with bcrypt
- Token stored in localStorage
- MongoDB credentials in `server/.env`

## 📞 Support
If issues persist:
1. Check terminal output for error messages
2. Check browser console (F12) for frontend errors
3. Verify `server/.env` file exists and has correct MongoDB URI
4. Ensure all npm packages are installed: `npm install`

---

**Happy Expense Tracking! 💰**
