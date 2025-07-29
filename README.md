# Invoice Management App

This is a full-stack **Invoice Management Application** with **React (Frontend)** and **Node.js + Express (Backend)**.  
It allows users to create, edit, and view invoices, while admins can manage invoices, users, and view revenue stats.

---

## Features
### User
- Sign up & Login
- Create, edit, and view invoices
- Profile management

### Admin
- Dashboard with revenue chart
- View all invoices and users
- Summary cards (revenue, invoices, users)
- Search and filter functionality

---

## Tech Stack
### Frontend
- React.js
- vite
- React Router
- Axios
- Tailwind CSS 

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- dotenv for environment variables

---

##  Project Structure
invoice-app/
│
├── backend/
│ ├── server.js
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ ├── middleware/
│ ├── .env.example
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ └── AppRoutes.jsx
│ ├── public/
│ ├── .env.example
│ └── package.json
│
└── README.md


##  Environment Variables

 we provide `.env.example` for both frontend and backend.

### Backend `.env.example`
```env
PORT=5000
DATABASE_URL=mongodb:./invoice.db
JWT_SECRET=your_jwt_secret_here

### Frontend .env.example

VITE_API_URL=http://localhost:5000

When you clone the project:
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
Then update your .env files with actual values.

 Setup Instructions
1. Clone the repository

git clone https://github.com/your-username/invoice_generator.git

2. Backend Setup

cd backend
npm install
cp .env.example .env   # then edit .env
npm start
Backend will run on http://localhost:5000

3. Frontend Setup

cd ../frontend
npm install
cp .env.example .env   # then edit .env
npm run dev
Frontend will run on http://localhost:5173


