# 🏙️ Public Infrastructure Issue Reporting System (Client)

A full-featured, role-based, responsive web application that allows citizens to report and track public infrastructure issues such as potholes, broken streetlights, water leakage, garbage overflow, and more. The system improves transparency, accountability, and efficiency in municipal service delivery.

---

## 🌐 Live Website
👉 https://reportify-b0b38.web.app/


## ✨ Key Features

- 🔐 Firebase Authentication (Email/Password & Google Sign-in)
- 👥 Role-based access control (Admin, Staff, Citizen)
- 📝 Issue reporting with image upload & location
- ⏱️ Full issue lifecycle tracking with immutable timeline
- ⬆️ Upvote system (one upvote per user per issue)
- ⚡ Issue priority boosting via secure payment
- 💎 Premium subscription system (unlimited issue reporting)
- 📊 Interactive dashboards with charts & statistics
- 🔍 Server-side pagination, search & filtering
- 📄 Downloadable PDF invoices
- 🔔 Toast & SweetAlert notifications for all actions
- 📱 Fully responsive UI (Mobile, Tablet, Desktop)

---

## 🧭 Application Pages

### 🌍 Public Pages
- Home
- All Issues
- Login & Registration
- 404 Not Found

### 🔒 Private Pages
- Issue Details
- Citizen Dashboard
- Staff Dashboard
- Admin Dashboard

---

## 🧑‍💼 Dashboards Overview

### 👤 Citizen Dashboard
- Dashboard Overview (stats & charts)
- My Issues (edit/delete pending issues)
- Report New Issue (free & premium rules enforced)
- Profile & Subscription Management

### 🧑‍🔧 Staff Dashboard
- Assigned Issues
- Status Updates (workflow controlled)
- Profile Management

### 🧑‍💻 Admin Dashboard
- System Overview (charts & stats)
- All Issues Management
- Staff Assignment
- User Management (block/unblock)
- Staff Management (create/update/delete)
- Payments & Invoices
- Admin Profile

---

## 🛠️ Technologies Used

### Frontend Stack
- **React 19**
- **React Router v7**
- **TanStack React Query v5**
- **Axios**
- **Firebase Authentication**
- **Tailwind CSS v4**
- **SweetAlert2**
- **React Hot Toast**
- **Framer Motion**
- **Recharts**
- **Lottie Animations**
- **jsPDF**
- **Lucide React Icons**

---

## 🔐 Security & Best Practices

- Environment variables for all secrets
- JWT-based private route protection
- Persistent login after refresh
- Role-based UI & API access
- Blocked user restrictions enforced

---

## 📦 Installation & Setup

```bash
git clone https://github.com/your-username/project-client.git
cd project-client
npm install
npm run dev
