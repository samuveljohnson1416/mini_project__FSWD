# 💰 Smart Expense Tracker

A full-stack, enterprise-grade expense tracking application featuring natural language input parsing, real-time analytics visualizations, secure JWT authentication, and a responsive dark-themed UI built with React 19, Express 5, and TypeScript.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-5.1.0-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%208-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.18-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## ✨ Key Features

- 🗣️ **Natural Language Input Parsing**: Simply type `"tea 25"` or `"uber 120"`; the backend automatically infers category, amount, description, and timestamp.
- 📊 **Real-time Analytics**: Interactive spending breakdown pie charts and daily expense bar charts powered by Recharts.
- 🔐 **Robust Authentication**: Secure multi-user JWT authentication with bcrypt password hashing and token validation.
- 🛡️ **Resilient Database Layer**: Hybrid database engine connects to MongoDB Atlas or automatically falls back to an embedded in-memory MongoDB server for local development with zero setup.
- 📱 **Mobile-First Dark UI**: Sleek, modern interface styled with Tailwind CSS and designed for desktop and mobile devices.
- 🔍 **Search & Category Filtering**: Filter expenses by date range, category, or real-time text query.

---

## 📁 Project Structure

```
mini_project__fswd/
├── client/                     # Frontend Application (React 19 + Vite)
│   ├── src/
│   │   ├── assets/            # Static assets
│   │   ├── components/        # Reusable UI components (ChatInput, ExpenseList, Summary, Modals)
│   │   ├── context/           # AuthContext state management
│   │   ├── pages/             # Route pages (Dashboard, Analytics, Login, Signup)
│   │   ├── services/          # Axios API service client
│   │   ├── types/             # Frontend TypeScript definitions
│   │   ├── App.tsx            # Root routing & layout
│   │   └── main.tsx           # React entry point
│   ├── .env                   # Client environment variables
│   └── index.html             # HTML entry file
│
├── server/                     # Backend API (Express 5 + TypeScript)
│   ├── src/
│   │   ├── config/            # Centralized environment & database configuration
│   │   ├── controllers/       # Route controllers (authController, expenseController)
│   │   ├── middleware/        # JWT authentication middleware
│   │   ├── models/            # Mongoose schemas (User, Expense)
│   │   ├── routes/            # REST API route handlers
│   │   ├── utils/             # Natural language parser & DB utility scripts
│   │   └── index.ts           # Express server entry point
│   ├── .env                   # Server environment variables
│   └── tsconfig.json          # Backend TypeScript configuration
│
├── docs/                       # Project documentation
│   ├── DEPLOYMENT_GUIDE.md    # Step-by-step Vercel + Render deployment
│   └── TROUBLESHOOTING.md     # Detailed troubleshooting guide
│
├── .env.example                # Global environment variable template
├── package.json                # Project dependencies & scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # Root TypeScript project reference
└── vite.config.ts              # Vite configuration
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Servers
Launch both the backend API and frontend client concurrently:
```bash
npm run dev:all
```

- **Frontend Client:** [http://localhost:5173](http://localhost:5173) (or next available port)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

### 4. Default Login Credentials
The system automatically seeds a default admin account upon startup:
- **Email:** `admin@expense.com`
- **Password:** `Admin@123`

You can also create new accounts via the **Sign Up** page.

---

## ⚙️ Environment Configuration

Copy the example configuration files if you wish to customize ports or credentials:

```bash
# Root template
cp .env.example .env

# Server configuration
cp server/.env.example server/.env

# Client configuration
cp client/.env.example client/.env
```

| Variable | Description | Default |
|---|---|---|
| `PORT` | Backend HTTP server port | `5000` |
| `NODE_ENV` | Environment mode (`development` / `production`) | `development` |
| `MONGODB_URI` | Remote MongoDB Atlas or local MongoDB URI | Embedded fallback if unreachable |
| `JWT_SECRET` | Secret key used for signing and verifying JWTs | Pre-configured secret |
| `CLIENT_URL` | Allowed frontend origin for CORS | `http://localhost:5173` |
| `VITE_API_URL` | Backend API base URL consumed by frontend | `http://localhost:5000/api` |

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev:all` | Starts both backend API and frontend client concurrently |
| `npm run server` | Starts the Express server with nodemon hot-reloading |
| `npm run client` | Starts the Vite dev server for the React client |
| `npm run build` | Typechecks and builds frontend bundle for production (`dist/`) |
| `npm run lint` | Runs ESLint across the codebase |
| `npm run seed:user` | Seeds or verifies the default admin user |
| `npm run clear:users`| Deletes all users from the active database |
| `npm run reset:auth` | Flushes database users and recreates clean admin credentials |

---

## 📡 REST API Reference

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Register new user account | No |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT token | No |
| `GET` | `/api/auth/profile` | Retrieve authenticated user profile | Yes (Bearer Token) |

### Expenses (`/api/expenses`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/expenses` | Create expense (natural language or manual JSON) | Yes |
| `GET` | `/api/expenses` | Query user expenses (supports date & category filters) | Yes |
| `GET` | `/api/expenses/summary` | Get aggregated expense summary & category breakdown | Yes |
| `PUT` | `/api/expenses/:id` | Update an existing expense | Yes |
| `DELETE` | `/api/expenses/:id` | Delete an existing expense | Yes |

---

## 🔧 Troubleshooting

If you experience session redirect loops or connection issues, refer to **[docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)** for step-by-step solutions.

Quick reset in browser DevTools (`F12`):
```javascript
localStorage.clear();
location.reload();
```
