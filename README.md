# CrowdConnect 🤝

CrowdConnect is a modern, production-ready full-stack crowdfunding platform built using the MERN stack (MongoDB, Express, React, Node.js). It enables organizations and individuals to start fundraising campaigns, and allows donors to securely contribute to causes they care about.

---

## 🚀 Features

### 👤 User Authentication
- Secure login and registration powered by **Firebase Authentication**.
- Role-based access control (Donors vs. Organizations).

### 📢 Campaign Management
- **Create Campaigns**: Organizations can set up fundraising campaigns with titles, descriptions, target goals, categories, and deadlines.
- **Explore Campaigns**: Users can search, filter by category, and browse campaigns.
- **Campaign Details**: Real-time progress tracking showing raised amount, percentage completed, and donor list.

### 💳 Secure Payments
- Integrated with **Razorpay** for seamless and secure payment processing.
- Real-time payment verification and automatic campaign progress updates.

### 📊 User Dashboard
- **Donor Dashboard**: View donation history, total impact, and supported campaigns.
- **Organization Dashboard**: Manage created campaigns, track total funds raised, and view donor analytics.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** & **Vite** (Fast build tool)
- **Tailwind CSS** (Modern styling)
- **Framer Motion** (Smooth animations and transitions)
- **React Router Dom** (Client-side routing)
- **Axios** (API requests)

### Backend
- **Node.js** & **Express**
- **MongoDB** & **Mongoose** (Database & ODM)
- **Firebase Admin SDK** (Token verification and user synchronization)
- **Razorpay SDK** (Payment order generation and verification)

---

## 📂 Project Structure

```text
CrowdConnect/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, Footer, etc.)
│   │   ├── context/        # React Context (Auth context)
│   │   ├── firebase/       # Firebase Client SDK configuration
│   │   ├── pages/          # Page components (Home, Campaigns, Dashboard, etc.)
│   │   ├── utils/          # API client and helper functions
│   │   ├── App.jsx         # Main App component & Routing
│   │   └── main.jsx        # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── server/                 # Node.js Backend
    ├── config/             # Database connection configuration
    ├── controllers/        # Request handlers
    ├── middleware/         # Authentication and role verification middleware
    ├── models/             # Mongoose schemas (User, Campaign, Donation)
    ├── routes/             # API route definitions (users, campaigns, payments)
    ├── index.js            # Express server entry point
    └── package.json
```

---

## ⚙️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB](https://www.mongodb.com/) running locally or an Atlas connection string.
- A [Firebase Project](https://console.firebase.google.com/) (for authentication).
- A [Razorpay Account](https://dashboard.razorpay.com/) in Test Mode (for payments).

---

### 1. Backend Setup (`server/`)

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server/` directory:
   ```bash
   cp env.template .env
   ```
4. Open `.env` and fill in your credentials:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/crowdconnect
   
   # Razorpay Keys (from Razorpay Dashboard -> Settings -> API Keys)
   RAZORPAY_KEY_ID=rzp_test_your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret
   
   # Firebase Admin Credentials (from Firebase Console -> Project Settings -> Service Accounts)
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project-id.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBg...\n-----END PRIVATE KEY-----\n"
   ```
5. Start the backend server:
   ```bash
   # Starts the server (usually on http://localhost:5000)
   node index.js
   ```

---

### 2. Frontend Setup (`client/`)

1. Navigate to the client directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `client/` directory:
   ```bash
   cp env.template .env
   ```
4. Open `.env` and configure your Firebase client credentials:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
5. Start the frontend development server:
   ```bash
   npm run dev
   ```
6. Open your browser and navigate to `http://localhost:5173`.

---

## 📡 API Endpoints

### Campaigns
- `GET /api/campaigns` - Get all campaigns (supports search and category filters)
- `GET /api/campaigns/:id` - Get details of a specific campaign
- `POST /api/campaigns` - Create a new campaign (Requires authentication)

### Payments
- `POST /api/payments/create-order` - Create a Razorpay order
- `POST /api/payments/verify-payment` - Verify payment signature and update campaign progress

### Users
- `POST /api/users/sync` - Synchronize Firebase user with MongoDB database
- `GET /api/users/profile` - Get authenticated user profile and donation history

---

## 🔒 Security Note
The `.env` files contain sensitive credentials and are excluded from version control via `.gitignore`. Never commit `.env` files to public repositories.
