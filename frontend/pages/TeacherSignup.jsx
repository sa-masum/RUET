import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherSignup = () => {
  const [step, setStep] = useState('form'); // 'form' | 'otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const BACKEND_URL = 'http://localhost:8000';

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/accounts/send_otp/teacher`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStep('otp');
      } else {
        setError(data.error || 'Could not send OTP');
      }
    } catch {
      setError('Server error');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/accounts/signup/teacher`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, otp })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        navigate('/teacher-login');
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch {
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
          <img src="/ruet_logo.png" alt="RUET Logo" style={{ width: 90, marginBottom: '1rem', borderRadius: '50%' }} />
          <h2 style={{ margin: 0, color: '#2563eb', fontWeight: 800, fontSize: '2rem', letterSpacing: '1px', textAlign: 'center' }}>RUET Teacher Portal Signup</h2>
        </div>
        {step === 'form' && (
          <form onSubmit={handleSendOtp}>
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
                placeholder="Enter your teacher email"
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
                placeholder="Create a password"
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
              Send OTP
            </button>
          </form>
        )}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: 6, color: '#334155', fontWeight: 600, fontSize: '1rem' }}>Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: 8,
                  border: '1px solid #cbd5e1',
                  fontSize: '1rem',
                  background: '#f1f5f9'
                }}
                placeholder="Enter the OTP sent to your email"
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
              Verify OTP
            </button>
          </form>
        )}
        <div style={{ textAlign: 'center', margin: '1.5rem 0 0 0', color: '#64748b', fontWeight: 500 }}>
          Already have an account?{' '}
          <a href="/teacher-login" style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: 600 }}>
            Login
          </a>
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

export default TeacherSignup;