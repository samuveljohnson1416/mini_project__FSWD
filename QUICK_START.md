# 🎯 Quick Start Guide - Smart Expense Tracker

## ⚡ 30-Second Start

```powershell
# 1. Start the app
npm run dev:all

# 2. Open browser: http://localhost:5176

# 3. Login or Signup
```

---

## 🚨 Having Login Issues?

**If you login but immediately get redirected back:**

```powershell
# Run this ONE command:
npm run reset:auth
```

Then in your **browser console** (F12):
```javascript
localStorage.clear();
location.reload();
```

Now login with: `admin@expense.com` / `Admin@123`

---

## 📚 Full Documentation

| Document | Purpose |
|----------|---------|
| **RUNNING_INSTRUCTIONS.md** | How to run the app + basic troubleshooting |
| **TROUBLESHOOTING.md** | Detailed fixes for all common issues |
| **NPM_SCRIPTS.md** | All available npm commands explained |
| **SETUP_COMPLETE.md** | Complete project setup information |

---

## 🎮 Key Features

### Dashboard
- Type expenses naturally: `"tea 25"`, `"uber 120"`
- Auto-categorizes into 10 categories
- Search and filter expenses
- Edit/delete any expense
- See daily/monthly totals

### Analytics
- Pie chart: Category breakdown
- Bar chart: Daily spending
- Total expenses summary

---

## 🔑 Default Credentials

**Email:** admin@expense.com  
**Password:** Admin@123

---

## 🛠️ Useful Commands

| Command | What It Does |
|---------|-------------|
| `npm run dev:all` | Start both servers |
| `npm run reset:auth` | Fix JWT/login issues |
| `npm run clear:users` | Delete all users |
| `npm run seed:user` | Create admin user |

---

## 🐛 Common Issues & Quick Fixes

### Login Redirect Loop
```powershell
npm run reset:auth
```
Then clear browser: `localStorage.clear()`

### Port Already in Use
```powershell
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### White Screen
- Hard refresh: `Ctrl+Shift+R`
- Clear cache: `Ctrl+Shift+Delete`

### MongoDB Connection Failed
- Check `server/.env` file exists
- Verify MONGODB_URI is correct

---

## 📁 Project Structure

```
mini_project__fswd/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Login, Signup, Dashboard, Analytics
│   │   ├── services/    # API calls
│   │   ├── context/     # Auth state management
│   │   └── types/       # TypeScript types
│   └── index.html
│
├── server/              # Express backend
│   └── src/
│       ├── config/      # Database config
│       ├── controllers/ # Business logic
│       ├── middleware/  # Auth middleware
│       ├── models/      # MongoDB schemas
│       ├── routes/      # API routes
│       └── utils/       # Helper scripts
│
└── Documentation files  # This and other guides
```

---

## 🌟 Tech Stack

**Frontend:** React 19 + TypeScript + Vite + Tailwind CSS + Recharts  
**Backend:** Express 5 + TypeScript + MongoDB + Mongoose  
**Auth:** JWT + bcrypt  
**Database:** MongoDB Atlas

---

## 💡 Pro Tips

1. **Natural Language Input**: Just type naturally
   - `tea 25` → ₹25 for Food & Drinks
   - `electricity bill 500` → ₹500 for Bills

2. **Quick Filters**: Use search or category dropdowns

3. **Responsive**: Works on mobile, tablet, desktop

4. **Dark Theme**: Easy on the eyes with warm accent colors

5. **Auto-Save**: Changes save immediately

---

## 🔐 Security

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens expire in 7 days
- Protected API routes with auth middleware
- CORS enabled for localhost ports 5173-5179

---

## 📞 Need Help?

1. Check **TROUBLESHOOTING.md** for detailed solutions
2. Look at terminal output for error messages
3. Check browser console (F12) for frontend errors
4. Verify MongoDB connection is successful
5. Try the reset commands above

---

## 🚀 Development Workflow

```powershell
# 1. Start servers
npm run dev:all

# 2. Make changes to code
#    - Backend: Auto-restarts with nodemon
#    - Frontend: Hot-reloads with Vite HMR

# 3. Test in browser
#    - Backend: http://localhost:5000
#    - Frontend: http://localhost:5176

# 4. Check for errors
#    - Terminal: Backend logs
#    - Browser console: Frontend logs
```

---

## ✅ Verify Everything Works

After starting with `npm run dev:all`, you should see:

**Terminal:**
```
✅ MongoDB connected successfully
🚀 Server is running on port 5000
VITE ready in XXX ms
➜  Local:   http://localhost:5176/
```

**Browser (after login):**
- Dashboard loads without redirecting
- Can add expense: `test 100`
- Can see expense in list
- Summary shows totals
- Analytics page works

---

**Happy Expense Tracking! 💰✨**
