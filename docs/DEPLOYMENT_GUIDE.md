# 🚀 Deployment Guide: Vercel (Frontend) + Render (Backend)

This guide walks you through deploying the **Smart Expense Tracker** with the frontend hosted on **Vercel** and the backend API on **Render**, connected to **MongoDB Atlas**.

---

## 🏗️ Architecture Overview

```
[ User Browser ]
       │
       ├───► [ Vercel ] (React 19 Frontend SPA)
       │         │
       │         └───► [ Render ] (Express 5 REST API)
       │                     │
       │                     └───► [ MongoDB Atlas ] (Cloud Database)
```

---

## Step 1: Push Your Code to GitHub

Make sure all changes are committed and pushed to your GitHub repository:

```bash
git add .
git commit -m "chore: prepare for production deployment to Render and Vercel"
git push origin main
```

---

## Step 2: Ensure MongoDB Atlas is Active & Whitelisted

Before launching the backend, verify your MongoDB Atlas cluster:
1. Log into [MongoDB Atlas](https://cloud.mongodb.com/).
2. If your cluster is paused, click **Resume**.
3. Go to **Network Access** (left menu):
   - Click **Add IP Address**.
   - Select **Allow Access From Anywhere** (`0.0.0.0/0`) so Render's cloud servers can connect.
   - Click **Confirm**.
4. Go to **Database** > **Connect** > **Drivers** and copy your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/expense_tracker?retryWrites=true&w=majority
   ```
   *(Replace `<username>` and `<password>` with your database user credentials)*.

---

## Step 3: Deploy Backend on Render

1. Sign in to [Render](https://render.com/) with your GitHub account.
2. Click **New +** > **Web Service**.
3. Select **Build and deploy from a Git repository** and pick your `mini_project__fswd` repository.
4. Configure the Web Service settings:

| Setting | Value |
|---|---|
| **Name** | `smart-expense-backend` *(or your choice)* |
| **Region** | Select region closest to you (e.g., Singapore, Frankfurt, Oregon) |
| **Branch** | `main` |
| **Root Directory** | *(Leave blank - root)* |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

5. Under **Environment Variables**, add:

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `10000` *(Render sets this automatically, but good to declare)* |
| `MONGODB_URI` | *Your MongoDB Atlas connection string from Step 2* |
| `JWT_SECRET` | *A random secure string (e.g. `expense_tracker_secret_prod_2026!#`)* |
| `CLIENT_URL` | `http://localhost:5173` *(We will update this in Step 5 once Vercel gives our URL)* |

6. Click **Create Web Service**.
7. Wait 2-3 minutes for the build to complete. When deployed, copy your Render URL:
   - Example: `https://smart-expense-backend.onrender.com`

> [!TIP]
> Test your backend by visiting `https://your-backend.onrender.com/` in your browser. You should see:
> `{"status":"ok","message":"Smart Expense Tracker API is running","environment":"production"}`

---

## Step 4: Deploy Frontend on Vercel

1. Sign in to [Vercel](https://vercel.com/) with your GitHub account.
2. Click **Add New...** > **Project**.
3. Import your `mini_project__fswd` repository.
4. In the Project Configuration window:

| Setting | Value |
|---|---|
| **Framework Preset** | `Vite` |
| **Root Directory** | `./` *(Leave root)* |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

5. Expand **Environment Variables** and add:

| Key | Value |
|---|---|
| `VITE_API_URL` | `https://your-backend.onrender.com/api` *(Paste your Render URL from Step 3 + `/api`)* |

6. Click **Deploy**.
7. In ~60 seconds, Vercel will finish and provide your live frontend URL:
   - Example: `https://mini-project-fswd.vercel.app`

---

## Step 5: Final Handshake (Connect Vercel to Render)

1. Go back to your [Render Dashboard](https://dashboard.render.com/).
2. Select your `smart-expense-backend` service.
3. Go to **Environment** (left menu).
4. Update `CLIENT_URL` to your Vercel URL:
   - `CLIENT_URL` = `https://your-app.vercel.app`
5. Render will automatically redeploy the service with the updated CORS origin.

---

## ✅ Step 6: Test Your Live App

1. Open your Vercel URL in your browser: `https://your-app.vercel.app`
2. Log in with the default admin account:
   - **Email:** `admin@expense.com`
   - **Password:** `Admin@123`
3. Try adding an expense with natural language:
   - `"coffee 45"` or `"groceries 120"`
4. Check the **Analytics** page to verify graphs and spending summaries load properly.

---

## 💡 Important Notes for Free Tiers
- **Render Free Tier Spin-Down**: Free Render web services go to sleep after 15 minutes of inactivity. When you open the frontend for the first time in a while, the first request may take 30–50 seconds while Render spins up the container. Subsequent requests are instant.
- **MongoDB Atlas Free Tier**: If you leave the Atlas cluster unused for over 60 days, Atlas may pause it. Remember to keep it active or unpause it from the Atlas console if needed.
