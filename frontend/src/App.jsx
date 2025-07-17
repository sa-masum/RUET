import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import StudentLogin from '../pages/StudentLogin';
import StudentSignup from '../pages/StudentSignup';
import StudentHome from '../pages/StudentHome';
import StudentSettings from '../pages/StudentSettings';
import StudentProfile from '../pages/StudentProfile';
import StudentDashboard from '../pages/StudentDashboard';

import TeacherSignup from '../pages/TeacherSignup';
import TeacherLogin from '../pages/TeacherLogin';
import TeacherHome from '../pages/TeacherHome';
import TeacherSettings from '../pages/TeacherSettings';
import TeacherProfile from '../pages/TeacherProfile';
import TeacherDashboard from '../pages/TeacherDashboard';


const BACKEND_URL = 'http://localhost:8000';

async function checkStudentAuth() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/accounts/check_student_token/`, {
      method: 'GET',
      credentials: 'include'
    });
    const data = await res.json();
    return res.ok && data.valid;
  } catch {
    return false;
  }
}

async function checkTeacherAuth() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/accounts/check_teacher_token/`, {
      method: 'GET',
      credentials: 'include'
    });
    const data = await res.json();
    return res.ok && data.valid;
  } catch {
    return false;
  }
}

function App() {
  const [authState, setAuthState] = useState({
    student: null,    // null = loading, true = logged in, false = not logged in
    teacher: null     // same for teacher
  });
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      const [studentAuth, teacherAuth] = await Promise.all([
        checkStudentAuth(),
        checkTeacherAuth()
      ]);
      
      setAuthState({
        student: studentAuth,
        teacher: teacherAuth
      });
    };

    verifyAuth();
  }, [location]);

  const handleStudentLogin = (status) => {
    setAuthState(prev => ({ ...prev, student: status }));
  };

  const handleTeacherLogin = (status) => {
    setAuthState(prev => ({ ...prev, teacher: status }));
  };

  // Show loading while checking auth status
  if (authState.student === null || authState.teacher === null) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Student Routes */}
        <Route
          path="/"
          element={
            authState.student ? <StudentHome /> : <Navigate to="/student-login" replace />
          }
        />
        <Route
          path="/student-login"
          element={
            authState.student ? <Navigate to="/" replace /> : <StudentLogin setIsLoggedIn={handleStudentLogin} />
          }
        />
        <Route
          path="/student-signup"
          element={<StudentSignup />}
        />
        <Route
          path="/student-settings"
          element={
            authState.student ? <StudentSettings /> : <Navigate to="/student-login" replace />
          }
        />
        <Route
          path="/student-profile"
          element={
            authState.student ? <StudentProfile /> : <Navigate to="/student-login" replace />
          }
        />
        <Route
          path="/student-dashboard"
          element={
            authState.student ? <StudentDashboard /> : <Navigate to="/student-login" replace state={{ from: location }} />
          }
        />


        {/* Teacher Routes */}
        <Route
          path="/teacher-signup"
          element={<TeacherSignup />}
        />
        <Route
          path="/teacher-login"
          element={
            authState.teacher ? <Navigate to="/teacher-home" replace /> : <TeacherLogin setIsLoggedIn={handleTeacherLogin} />
          }
        />
        <Route
          path="/teacher-home"
          element={
            authState.teacher ? <TeacherHome /> : <Navigate to="/teacher-login" replace />
          }
        />
        <Route
          path="/teacher-settings"
          element={
            authState.teacher ? <TeacherSettings /> : <Navigate to="/teacher-login" replace />
          }
        />
        <Route
          path="/teacher-profile"
          element={
            authState.teacher ? <TeacherProfile /> : <Navigate to="/teacher-login" replace />
          }
        />
        <Route
          path="/teacher-dashboard"
          element={
            authState.teacher ? <TeacherDashboard /> : <Navigate to="/teacher-login" replace state={{ from: location }} />
          }
        />


        {/* Fallback route */}
        <Route
          path="*"
          element={
            <Navigate to={authState.student ? "/" : "/student-login"} replace />
          }
        />
      </Routes>
    </>
  )
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
