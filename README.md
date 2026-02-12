# Full Stack Task Management System

Task Management System is a full-stack task management application built using the MERN stack.  
It allows users to manage projects and tasks with secure authentication, protected routes, and a real-time dashboard overview.



## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (password hashing)

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router

---

## 🔐 Features

### Authentication
- User Registration
- User Login
- JWT-based authentication
- Protected routes
- Secure logout

### Project Management
- Create project
- View all user projects
- Update project
- Delete project
- Projects linked to authenticated users

### Task Management
- Create tasks inside projects
- Update task status (Todo / In Progress / Done)
- Set priority (Low / Medium / High)
- Set due date
- Delete tasks
- Overdue task detection

### Dashboard
- Total projects count
- Total tasks count
- Tasks grouped by status
- Tasks grouped by priority
- Overdue task overview



Backend and frontend are separated for scalability and clean architecture.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

git clone <your-repository-link>
cd Task_management_system

---

### 2️⃣ Backend Setup

cd backend
npm install

Create a `.env` file inside the backend folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


Start backend server:

npm run dev

Backend runs on:
http://localhost:5000


---

### 3️⃣ Frontend Setup

cd frontend
npm install
npm run dev

http://localhost:5173


---

## 🛡️ Security Implementation

- Passwords hashed using bcrypt
- JWT used for stateless authentication
- Protected API routes
- Ownership validation before update/delete operations
- Users cannot access other users’ data

---

## 📊 Database Relationships

- A User can have multiple Projects
- A Project can have multiple Tasks
- Each Task belongs to one Project
- Tasks are assigned to a specific User

Implemented using MongoDB ObjectId references.

---

## 🎯 Design Decisions

- MVC-based backend structure
- JWT chosen for scalable authentication
- MongoDB for flexible document modeling
- Tailwind CSS for modern and responsive UI
- Axios interceptor for automatic token handling

---

## 🔮 Future Improvements

- Role-based access control (Admin/User)
- Pagination for scalability
- Search & filtering
- Charts in dashboard
- Docker-based deployment

---

## 📡 API Documentation

### Base URL (Local)
```
http://localhost:5000/api
```

---

## Authentication Routes

### 1️ Register User

**POST** `/auth/register`

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

Response:
```json
{
  "message": "User registered successfully"
}
```

---

### 2️ Login User

**POST** `/auth/login`

Request Body:
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

Response:
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

##  Project Routes  
(All routes below require Authorization header)

Header:
```
Authorization: Bearer <token>
```

---

### 3️ Create Project

**POST** `/projects`

Request Body:
```json
{
  "title": "Marketing Project",
  "description": "Campaign tasks"
}
```

---

### 4️ Get All Projects

**GET** `/projects`

Returns all projects belonging to logged-in user.

---

### 5️ Update Project

**PUT** `/projects/:id`

Request Body:
```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```

---

### 6️ Delete Project

**DELETE** `/projects/:id`

---

## Task Routes  
(All routes below require Authorization header)

---

### 7️ Create Task

**POST** `/tasks`

Request Body:
```json
{
  "title": "Finish backend",
  "priority": "High",
  "dueDate": "2026-02-20",
  "project": "project_id_here"
}
```

---

### 8️ Get Tasks by Project

**GET** `/tasks?projectId=project_id_here`

---

### 9️ Update Task

**PUT** `/tasks/:id`

Request Body:
```json
{
  "status": "Done"
}
```

---

###  Delete Task

**DELETE** `/tasks/:id`

---

##  Dashboard Route

### 1️1️ Get Dashboard Data

**GET** `/dashboard`

Response:
```json
{
  "totalProjects": 2,
  "totalTasks": 10,
  "tasksByStatus": {
    "Todo": 3,
    "In Progress": 4,
    "Done": 3
  },
  "tasksByPriority": {
    "Low": 2,
    "Medium": 5,
    "High": 3
  },
  "overdueTasks": 1
}
Thank You