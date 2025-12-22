# 🚀 ReqCraft – API Testing Platform

ReqCraft is a full-stack API testing tool inspired by Postman, designed for developers to create, organize, execute, and monitor REST API requests inside collaborative workspaces.

---

## 🎥 Demo Video

👉 **Watch Project Demo on YouTube:**  
[https://youtube.com/your-demo-link](https://youtu.be/TrLyyf-kwqo)

---

## 🖼️ Screenshots

> Replace the image links below with your uploaded screenshots

![Picture 1](<./public/Screenshot%20(28).png>)

![Picture 2](<./public/Screenshot%20(29).png>)

![Picture 3](<./public/Screenshot%20(30).png>)

![Picture 4](<./public/Screenshot%20(31).png>)

---

## ✨ Key Features

- 🔐 **Authentication & Authorization**

  - Social login using **GitHub** and **Google**
  - Secure session handling with Better Auth

- 🏢 **Workspace-Based Architecture**

  - Create and manage multiple workspaces
  - Role-based access (Admin / Member)
  - Invite users via shareable invite links

- 📦 **API Request Management**

  - Create, edit, delete REST API requests
  - Supports headers, query params, and request body
  - Organize requests inside collections

- ▶️ **Run & Track Requests**

  - Execute requests using Axios
  - Persist request runs with:
    - Status code & status text
    - Response body & headers
    - Response size & latency
  - View latest response instantly in the UI

- ⚡ **Modern State Management**

  - Server state handled using **TanStack React Query**
  - UI and selection state managed with **Zustand**

- 🎨 **Developer-Friendly UI**
  - Built using **Radix UI + ShadCN**
  - Dark mode support
  - Hotkeys & toast notifications for better DX

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 15 (App Router)**
- **React 19 + TypeScript**
- Tailwind CSS
- Radix UI / ShadCN
- Zustand
- TanStack React Query

### Backend

- Next.js Server Actions
- Prisma ORM
- PostgreSQL
- Axios (API execution)

### Authentication

- Better Auth
- GitHub & Google OAuth

### Infrastructure

- Docker (PostgreSQL)
- Prisma Migrations

---

## 🧠 Architecture Highlights

- Clear separation between **server actions**, **hooks**, and **UI components**
- Relational database design with proper **foreign keys & cascading deletes**
- Request execution and persistence decoupled from UI rendering
- Optimized cache invalidation and UI sync using React Query

---

## ⚙️ Getting Started (Local Setup)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/shylekhwani/postman_clone.git
```

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Create a .env file:

DATABASE_URL=postgresql://user:password@localhost:5432/ReqCraft
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

4️⃣ Start Database (Docker)
docker-compose up -d

5️⃣ Run Prisma Migrations
npx prisma migrate dev

6️⃣ Start the App
npm run dev
