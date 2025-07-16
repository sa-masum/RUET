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

function App() {
  const [authState, setAuthState] = useState({
    student: null,    // null = loading, true = logged in, false = not logged in
  });
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      const [studentAuth] = await Promise.all([
        checkStudentAuth(),
      ]);
      
      setAuthState({
        student: studentAuth,
      });
    };

    verifyAuth();
  }, [location]);

  const handleStudentLogin = (status) => {
    setAuthState(prev => ({ ...prev, student: status }));
  };

  // Show loading while checking auth status
  if (authState.student === null) {
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
