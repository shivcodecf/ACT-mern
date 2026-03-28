# 🚀 Phonix - Full Stack Web Application

A simple full stack web application with authentication and dashboard functionality built using React, Node.js, and MongoDB.

---

## 📌 Features

- 🔐 User Signup & Login
- ✅ Form Validation (Email & Password)
- 🍪 Authentication using HTTP-only Cookies
- 🔒 Protected Routes
- 📊 Dashboard with:
  - Leads
  - Tasks
  - Users
- 🚪 Logout functionality

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/shivcodecf/ACT-mern.git
cd act
```
---

2. Setup Backend

```bash

cd backend
npm install

```



Create .env file:

```bash
 
PORT = 8000

JWT_SECRET 

FRONTEND_URL 

MONGO_URI 

```




Run backend:

```bash

npm run dev

```

---

3. Setup Frontend

```bash

cd frontend
npm install

```

Create .env:

```bash

VITE_API_URL

```


---

🌐 Deployment
Frontend: Vercel
Backend: Render

---

🔐 Authentication Flow
User logs in
Server generates JWT
Token stored in HTTP-only cookie
Protected routes check authentication

---



👨‍💻 Author

Shivam Yadav




