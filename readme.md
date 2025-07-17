# RUET Portal 🎓

A full-stack web application for managing student and teacher profiles, built with Django (backend), React (frontend), and PostgreSQL.

## ✨ Features

- 👨‍🎓 Student Signup/Login with OTP
- 👨‍🏫 Teacher Signup/Login with OTP
- 🔐 Email OTP verification using Gmail SMTP
- 📋 Separate Dashboards for Students and Teachers
- ⚙️ Profile Management (Edit/Update)
- 🔁 JWT-based Authentication


## 🛠️ Tech Stack

- Backend: Django, PostgreSQL
- Frontend: React (Vite), Tailwind CSS
- Auth: JWT, Gmail SMTP


## 🚀 How to Run Locally

### 📦 Backend (Django)
1. Clone the repo:
   ```bash
   git clone https://github.com/sa-masum/RUET.git
   cd RUET/backend

   # Create Virtual Environment 

    python -m venv venv
    venv\Scripts\activate  # for Mac:   source venv/bin/activate
    pip install -r requirements.txt

   # Setup .env
    EMAIL_HOST_USER=your_email@gmail.com
    EMAIL_HOST_PASSWORD=your_gmail_app_password
    SECRET_KEY=your_django_secret

### 📦 Frontend (React + Vite)
    cd ../frontend
    npm install
    npm run dev



---

### 🔐 5. **Environment Variables**

```md
## 🔐 Environment Variables

Make sure to create `.env` files for backend.

### Backend `.env`
- `EMAIL_HOST_USER`
- `EMAIL_HOST_PASSWORD`
- `SECRET_KEY`



