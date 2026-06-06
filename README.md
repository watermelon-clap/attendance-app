# Employee Attendance & Broadcast Management System

A web-based Employee Management System built with **React**, **Vite**, and **Supabase** that allows administrators to manage employees, track attendance, and send company-wide announcements.

---

## Features

### Authentication

* User registration
* User login
* Role-based access control
* Admin approval workflow
* Secure authentication using Supabase Auth

### User Features

* View profile information
* View attendance history
* View attendance summary
* Read company announcements and broadcasts

### Admin Features

#### Dashboard

* Total users count
* Total attendance records count
* Total broadcast messages count

#### User Management

* View registered users
* Activate users
* Deactivate users
* Exclude admin accounts from user listings

#### Attendance Entry

* Record employee attendance
* Select employee
* Record attendance date
* Record entry time
* Optional exit time
* Attendance status management
* Remarks support

#### Attendance Manager

* Search attendance by date
* Edit:

  * Entry Time
  * Exit Time
  * Status
  * Remarks
* Save updates directly from the management screen

#### Broadcast Management

* Create company announcements
* View all announcements
* Delete announcements
* Responsive modal-based broadcast creation

---

## Technology Stack

### Frontend

* React
* React Router DOM
* Vite
* CSS

### Backend

* Supabase

### Database

PostgreSQL via Supabase

### Authentication

Supabase Auth

---

## Project Structure

```text
src/
│
├── components/
│   └── Navbar.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── pages/
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── UserDashboard.jsx
│   ├── AttendanceHistory.jsx
│   ├── Broadcasts.jsx
│   ├── Profile.jsx
│   │
│   └── admin/
│       ├── AdminDashboard.jsx
│       ├── ManageUsers.jsx
│       ├── AttendanceEntry.jsx
│       ├── AttendanceManager.jsx
│       └── BroadcastManager.jsx
│
├── routes/
│   ├── PrivateRoute.jsx
│   └── AdminRoute.jsx
│
├── services/
│   ├── authService.js
│   ├── attendanceService.js
│   ├── broadcastService.js
│   ├── dashboardService.js
│   └── userService.js
│
├── supabase/
│   └── client.js
│
└── App.jsx
```

---

## Database Schema

### profiles

```sql
id UUID PRIMARY KEY
full_name TEXT
username TEXT UNIQUE
email TEXT
role TEXT
is_active BOOLEAN
```

### attendance

```sql
id BIGINT PRIMARY KEY
user_id UUID
attendance_date DATE
entry_time TIME
exit_time TIME
status TEXT
remarks TEXT
created_by UUID
created_at TIMESTAMP
```

### broadcasts

```sql
id BIGINT PRIMARY KEY
title TEXT
message TEXT
created_by UUID
created_at TIMESTAMP
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Example:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/watermelon-clap/attendance-app.git
```

Move into the project directory:

```bash
cd employee-attendance-system
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Supabase Setup

### 1. Create Project

Create a new project in Supabase.

### 2. Create Tables

Create:

* profiles
* attendance
* broadcasts

### 3. Enable Authentication

Enable Email/Password Authentication.

### 4. Create First Admin

Insert a profile record manually:

```sql
INSERT INTO profiles (
    id,
    email,
    username,
    full_name,
    role,
    is_active
)
VALUES (
    '<auth_user_id>',
    'admin@example.com',
    'admin',
    'System Admin',
    'admin',
    true
);
```

### 5. Configure RLS Policies

Enable RLS and create policies according to project requirements.

---

## Attendance Rules

* One attendance record per user per day
* Duplicate attendance entries are prevented using a database unique constraint:

```sql
UNIQUE(user_id, attendance_date)
```

* Exit time is optional during attendance entry
* Exit time can be updated later through Attendance Manager

---

## Responsive Design

The application supports:

* Desktop
* Tablet
* Mobile devices

Features include:

* Responsive navigation bar
* Mobile hamburger menu
* Mobile-friendly cards
* Responsive tables

---

## Security

* Protected routes
* Admin-only pages
* Role-based authorization
* Supabase Row Level Security (RLS)
* Secure authentication using JWT

---

## Future Enhancements

* Attendance reports
* PDF export
* Excel export
* Employee leave management
* Attendance analytics
* User profile editing
* Broadcast attachments
* Email notifications
* Search and filtering

---

## License

This project is developed for internal employee management and attendance tracking purposes.
