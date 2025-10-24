# 💰 Smart Expense Tracker

A full-stack MERN expense tracking application with natural language input, real-time analytics, and JWT authentication.

![Tech Stack](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Express](https://img.shields.io/badge/Express-5.1.0-green)
![MongoDB](https://img.shields.io/badge/MongoDB-8.19.2-green)

## ✨ Features

- 🗣️ **Natural Language Input**: Type expenses like "tea 25" or "uber 120"
- 📊 **Real-time Analytics**: Pie charts and bar graphs for spending insights
- 🔐 **Secure Authentication**: JWT-based multi-user system with bcrypt
- 📱 **Responsive Design**: Mobile-first dark theme with Tailwind CSS
- 🏷️ **Smart Categorization**: Auto-categorizes expenses into 10 categories
- 🔍 **Search & Filter**: Find expenses quickly by description or category
- ✏️ **Edit & Delete**: Manage your expenses with ease
- 📈 **Summary Cards**: Daily and monthly spending totals

## 🚀 Quick Start

```powershell
# Install dependencies (if not already done)
npm install

# Start both backend and frontend
npm run dev:all

# Open browser
http://localhost:5176
```

**Login with:**
- Email: `admin@expense.com`
- Password: `Admin@123`

## 📖 Documentation

| Guide | Description |
|-------|-------------|
| **[QUICK_START.md](./QUICK_START.md)** | ⚡ Get started in 30 seconds |
| **[RUNNING_INSTRUCTIONS.md](./RUNNING_INSTRUCTIONS.md)** | 📋 How to run the app |
| **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** | 🔧 Fix common issues |
| **[NPM_SCRIPTS.md](./NPM_SCRIPTS.md)** | 📦 All available commands |
| **[SETUP_COMPLETE.md](./SETUP_COMPLETE.md)** | 🏗️ Project setup details |

## 🐛 Having Issues?

**Login redirects back immediately?**
```powershell
npm run reset:auth
```
Then in browser console (F12):
```javascript
localStorage.clear();
location.reload();
```

See **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** for detailed solutions.

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for blazing-fast development
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Express 5** with TypeScript
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** enabled

## 📁 Project Structure

```
mini_project__fswd/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── context/       # State management
│   │   └── types/         # TypeScript types
│   └── index.html
│
├── server/                # Express backend
│   └── src/
│       ├── config/        # Database config
│       ├── controllers/   # Business logic
│       ├── middleware/    # Auth middleware
│       ├── models/        # MongoDB models
│       ├── routes/        # API routes
│       └── utils/         # Helper scripts
│
└── [Documentation files]  # Guides and instructions
```

## 🎮 Usage Examples

### Add Expenses (Natural Language)
```
tea 25                    → ₹25 Food & Drinks
uber to office 120        → ₹120 Transportation
electricity bill 500      → ₹500 Bills & Utilities
movie tickets 400         → ₹400 Entertainment
groceries 850             → ₹850 Shopping
```

### Categories
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

## 🔐 Security

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens with 7-day expiration
- Protected API routes with middleware
- CORS configured for local development

## 🛠️ Available Scripts

```powershell
npm run dev:all      # Start both servers
npm run server       # Backend only
npm run client       # Frontend only
npm run reset:auth   # Fix JWT issues
npm run clear:users  # Delete all users
npm run seed:user    # Create admin user
npm run build        # Production build
```

See **[NPM_SCRIPTS.md](./NPM_SCRIPTS.md)** for complete reference.

## 📊 API Endpoints

### Authentication
```
POST   /api/auth/signup    # Create account
POST   /api/auth/login     # Login
GET    /api/auth/profile   # Get user profile
```

### Expenses
```
GET    /api/expenses           # Get all expenses
POST   /api/expenses           # Create expense
PUT    /api/expenses/:id       # Update expense
DELETE /api/expenses/:id       # Delete expense
GET    /api/expenses/summary/daily    # Daily total
GET    /api/expenses/summary/monthly  # Monthly total
```

## 🌟 Key Features in Detail

### Natural Language Parser
Detects keywords to auto-categorize:
```typescript
'tea', 'coffee', 'lunch' → Food & Drinks
'uber', 'taxi', 'bus'    → Transportation
'bill', 'electricity'    → Bills & Utilities
'movie', 'game'          → Entertainment
```

### Real-time Analytics
- **Pie Chart**: Category-wise spending breakdown
- **Bar Chart**: Last 7 days spending trends
- **Summary**: Daily and monthly totals

### Responsive Design
- Mobile-first approach
- Dark theme with warm accents
- Smooth animations
- Intuitive UX

## 🧪 Development

```powershell
# Install dependencies
npm install

# Start development servers
npm run dev:all

# Backend runs on: http://localhost:5000
# Frontend runs on: http://localhost:5176
```

## 🏗️ Building for Production

```powershell
# Build optimized bundle
npm run build

# Preview production build
npm run preview
```

## 🤝 Contributing

This is a mini project for learning purposes. Feel free to fork and modify!

## 📝 License

ISC

## 👤 Author

**Samuvel Johnson**
- GitHub: [@samuveljohnson1416](https://github.com/samuveljohnson1416)

---

**Need Help?** Check the documentation files or see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

**Happy Expense Tracking! 💰✨**
