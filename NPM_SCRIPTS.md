# Smart Expense Tracker - NPM Scripts Reference

## 🚀 Development Scripts

### Start Application
```powershell
npm run dev:all
```
**What it does:** Starts both backend (port 5000) and frontend (port 5176) servers concurrently.

### Start Backend Only
```powershell
npm run server
```
**What it does:** Starts Express backend with nodemon (auto-restart on changes).

### Start Frontend Only
```powershell
npm run client
```
**What it does:** Starts Vite development server for React frontend.

## 🔧 Database Utility Scripts

### Reset Authentication (Recommended for JWT Issues)
```powershell
npm run reset:auth
```
**What it does:**
- Connects to MongoDB
- Deletes all existing users
- Creates fresh admin user (admin@expense.com / Admin@123)
- Provides next steps for browser cleanup

**When to use:** Login redirects back immediately, JWT signature errors in terminal.

### Clear All Users
```powershell
npm run clear:users
```
**What it does:**
- Connects to MongoDB
- Deletes all users from database
- Shows count of deleted users

**When to use:** Want to start fresh with no accounts, testing user creation.

### Create Default Admin User
```powershell
npm run seed:user
```
**What it does:**
- Creates admin user if it doesn't exist
- Email: admin@expense.com
- Password: Admin@123

**When to use:** Need default admin credentials, accidentally deleted admin user.

## 🏗️ Build & Production Scripts

### Build for Production
```powershell
npm run build
```
**What it does:**
- Compiles TypeScript
- Builds optimized production bundle with Vite
- Output goes to `dist/` folder

### Preview Production Build
```powershell
npm run preview
```
**What it does:**
- Serves the production build locally for testing
- Must run `npm run build` first

## 🧹 Code Quality Scripts

### Lint Code
```powershell
npm run lint
```
**What it does:**
- Runs ESLint on all code files
- Checks for code quality issues
- Reports TypeScript errors

## 📦 Package Management

### Install Dependencies
```powershell
npm install
```
**What it does:**
- Installs all dependencies from package.json
- Creates/updates node_modules folder

### Install Specific Package
```powershell
npm install <package-name>
```

### Install Dev Dependency
```powershell
npm install -D <package-name>
```

## 🔍 Common Workflows

### First Time Setup
```powershell
# 1. Install dependencies
npm install

# 2. Create default user
npm run seed:user

# 3. Start application
npm run dev:all
```

### Fix JWT Authentication Issues
```powershell
# 1. Reset authentication
npm run reset:auth

# 2. In browser console (F12):
localStorage.clear();
location.reload();

# 3. Login with admin@expense.com / Admin@123
```

### Start Fresh Development Session
```powershell
# 1. Clear all users
npm run clear:users

# 2. Start servers
npm run dev:all

# 3. Create new account via signup page
```

### Production Deployment
```powershell
# 1. Build application
npm run build

# 2. Preview to test
npm run preview

# 3. Deploy dist/ folder to hosting service
```

## 🎯 Script Parameters

### Run Script Directly (Without npm)
```powershell
# Using npx tsx
npx tsx server/src/utils/seedUser.ts
npx tsx server/src/utils/clearUsers.ts
npx tsx server/src/utils/resetAuth.ts
```

## 🆘 Troubleshooting Scripts

### Check Node/NPM Versions
```powershell
node --version
npm --version
```

### List Installed Packages
```powershell
npm list --depth=0
```

### Clear npm Cache
```powershell
npm cache clean --force
```

### Reinstall All Dependencies
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

## 📝 Notes

- **PowerShell**: All commands shown for Windows PowerShell
- **Concurrently**: `dev:all` runs backend + frontend in one terminal
- **Nodemon**: Auto-restarts backend on file changes
- **Vite HMR**: Frontend hot-reloads without full refresh
- **TSX**: Runs TypeScript files directly without compilation

## 🔗 Related Documentation

- **Running Instructions**: See `RUNNING_INSTRUCTIONS.md`
- **Troubleshooting**: See `TROUBLESHOOTING.md`
- **Setup Guide**: See `SETUP_COMPLETE.md`

---

**Quick Reference:**
- Start app: `npm run dev:all`
- Fix auth: `npm run reset:auth`
- Clear users: `npm run clear:users`
- Seed admin: `npm run seed:user`
