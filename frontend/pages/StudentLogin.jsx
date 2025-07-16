import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const StudentLogin = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const BACKEND_URL = 'http://localhost:8000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/accounts/login/student`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include' 
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsLoggedIn(true);
        navigate('/');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setError('Server error');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)'
    }}>
      <div
        style={{
          background: '#fff',
          padding: '2.5rem 2rem',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          minWidth: '280px',
          maxWidth: '95vw',
          width: '500px',
          margin: '0 1rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
          <img src="/ruet_logo.png" alt="RUET Logo" style={{ width: 90, marginBottom: '1rem', borderRadius: '50%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
          <h2 style={{ margin: 0, color: '#2563eb', fontWeight: 800, fontSize: '2rem', letterSpacing: '1px', textAlign: 'center' }}>RUET Student Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#334155', fontWeight: 600, fontSize: '1rem' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.6rem',
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                fontSize: '1rem',
                background: '#f1f5f9'
              }}
              placeholder="Enter your email"
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#334155', fontWeight: 600, fontSize: '1rem' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.6rem',
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                fontSize: '1rem',
                background: '#f1f5f9'
              }}
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.8rem',
              background: 'linear-gradient(90deg, #2563eb 60%, #38bdf8 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: '1.08rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
              marginBottom: '1rem',
              transition: 'background 0.2s'
            }}
          >
            Login
          </button>
        </form>
        <div style={{ textAlign: 'center', margin: '1.5rem 0 0 0', color: '#64748b', fontWeight: 500 }}>
          Don't have an account?{' '}
          <Link to="/student-signup" style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: 600 }}>
            Sign up
          </Link>
        </div>
        <div style={{ textAlign: 'center', margin: '0.5rem 0 0 0', color: '#64748b', fontWeight: 500 }}>
          Want to login as Teacher?{' '}
          <Link to="/teacher-login" style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: 600 }}>
            Login
          </Link>
        </div>
      </div>
      <style>
        {`
          @media (min-width: 1024px) {
            div[style*="background: #fff"] {
              width: 480px !important;
            }
          }
          @media (max-width: 600px) {
            div[style*="background: #fff"] {
              padding: 1.2rem 0.5rem !important;
              min-width: 0 !important;
              width: 100% !important;
              border-radius: 10px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default StudentLogin;