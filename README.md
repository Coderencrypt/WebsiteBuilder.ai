<div align="center">

# 🚀 Genweb.ai — AI Website Builder

**Generate a full website from a prompt. Deploy it in one click.**

Built with the MERN stack, powered by AI, and monetized with Stripe.

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)

[Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 📸 Preview

<div align="center">
<img width="1866" height="928" alt="image" src="https://github.com/user-attachments/assets/06e773bd-d5fc-4b62-b38c-bccb52977e6c" alt="Home page" />
<br/><br/>
<img width="1832" height="922" alt="image" src="https://github.com/user-attachments/assets/8b2290f1-5b25-4d8c-b2d4-7dc50d31bf8c" alt="Dashboard page" />
<br/><br/>
<img width="1841" height="933" alt="image" src="https://github.com/user-attachments/assets/33ed9885-8d79-4f15-baa2-b4b05473445c" alt="AI Website Generator page"/>
<br/><br/>
<img width="1840" height="933" alt="image" src="https://github.com/user-attachments/assets/d69738e1-439a-4aaa-b7e6-8f128180c53c" alt= "Pricing page"/>

</div>

---

## ✨ Overview

**Genweb.ai** is a full-stack SaaS application that lets users describe the website they want in plain language and get a fully generated site back — ready to preview and deploy, all in one click. It's built end-to-end: authentication, an AI generation pipeline, a credits-based usage system, and Stripe-powered subscription billing.

## 🧩 Features

- 🤖 **AI-powered website generation** — describe your site in a prompt, get a working website generated for you
- ⚡ **One-click deploy** — go from prompt to live site without touching config
- 💳 **Stripe billing & checkout** — secure, PCI-compliant payments via Stripe Checkout Sessions
- 🎟️ **Credit-based usage system** — Free / Pro / Enterprise plans, each with its own credit allowance
- 🔐 **Authentication & protected routes** — JWT-based auth middleware guarding sensitive endpoints
- 🪝 **Stripe Webhooks** — automatic credit + plan provisioning on successful payment
- 🗄️ **MongoDB persistence** — user accounts, plans, and credit balances stored and updated reliably

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Node.js + Express |
| Database | MongoDB (Mongoose) |
| Payments | Stripe (Checkout Sessions + Webhooks) |
| AI Generation | OpenRouter API |
| Auth | JWT-based middleware |

## 🏗️ Architecture

```
┌──────────────┐        ┌──────────────────┐        ┌───────────────┐
│   React UI   │ ─────▶ │  Express Backend  │ ─────▶ │   MongoDB     │
│ (Prompt Box, │  REST  │  (Auth, Billing,  │        │ (Users, Plans,│
│  Dashboard)  │◀───────│   AI Generation)  │◀───────│   Credits)    │
└──────────────┘        └──────────┬────────┘        └───────────────┘
                                    │
                     ┌──────────────┼───────────────┐
                     ▼                              ▼
              ┌─────────────┐               ┌──────────────┐
              │ OpenRouter  │               │    Stripe     │
              │ (AI models) │               │ (Checkout +   │
              └─────────────┘               │  Webhooks)    │
                                             └──────────────┘
```

## 💰 Plans & Credits

| Plan | Price | Credits |
|---|---|---|
| Free | $0 | 100 |
| Pro | $5.99 | 500 |
| Enterprise | $10.99 | 1000 |

Credits are consumed per AI generation and automatically topped up when a paid plan checkout completes, via a Stripe webhook.

## 📂 Project Structure

```
websiteBuilder/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   ├── openRouter.js
│   │   ├── plans.js
│   │   └── stripe.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── billing.controller.js
│   │   ├── stripeWebhook.controller.js
│   │   ├── user.controller.js
│   │   └── website.controller.js
│   ├── middlewares/
│   │   └── isAuth.js
│   ├── models/
│   │   ├── user.model.js
│   │   └── website.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── billing.routes.js
│   │   ├── user.routes.js
│   │   └── website.routes.js
│   ├── utils/
│   │   └── extractJson.js
│   ├── .gitignore
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── assets/
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   ├── components/
│   │   │   └── LoginModal.jsx
│   │   ├── hooks/
│   │   │   └── useGetCurrentUser.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Editor.jsx
│   │   │   ├── Generate.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── LiveSite.jsx
│   │   │   └── Pricing.jsx
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   └── userSlice.js
│   │   ├── App.jsx
│   │   ├── firebase.js
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── .oxlintrc.json
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## ⚙️ Getting Started
 
### Prerequisites
 
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- A Stripe account (test mode keys)
- An OpenRouter API key
### 1. Clone the repo
 
```bash
git clone https://github.com/<your-username>/genweb-ai.git
cd genweb-ai
```
 
### 2. Backend setup
 
```bash
cd backend
npm install
```
 
Create a `.env` file in `backend/`:
 
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
OPENROUTER_API_KEY=your_openrouter_api_key
```
 
Create a `.env` file in `frontend/` with your Firebase config:
 
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```
 
Run the backend:
 
```bash
npm run dev
```
 
### 3. Frontend setup
 
```bash
cd ../frontend
npm install
npm run dev
```
 
### 4. Stripe webhook (local testing)
 
```bash
stripe listen --forward-to localhost:5000/api/billing/webhook
```

## 🔑 API Endpoints (sample)
 
Routes are split across four files: `auth.routes.js`, `billing.routes.js`, `user.routes.js`, and `website.routes.js`. Typical shape:
 
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/*` | Registration / login / Firebase token exchange | ❌ |
| GET | `/api/user/*` | Fetch current user profile & credit balance | ✅ |
| POST | `/api/billing` | Creates a Stripe Checkout session for a plan | ✅ |
| POST | `/api/billing/webhook` | Handles Stripe webhook events (raw body, Stripe-signed) | ❌ |
| POST | `/api/website/*` | Generate, save, and fetch AI-generated websites | ✅ |
 
> Fill in the exact paths from your route files — this is the general shape based on your project structure.

## 🗺️ Roadmap
 
- [ ] Custom domain support on deploy
- [ ] Template gallery
- [ ] Team/multi-user workspaces
- [ ] Usage analytics dashboard
## 🤝 Contributing
 
Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](../../issues).
 
## 📄 License
 
Distributed under the MIT License. See `LICENSE` for more information.

## 👤 Author

**AYUSH DUBEY**
- GitHub: [@Coderencrypt](https://github.com/Coderencrypt)
- LinkedIn: [AYUSH DUBEY](https://linkedin.com/in/ayush-dubey-1348ay)
---

<div align="center">

If you found this project useful, consider giving it a ⭐️!

</div>
