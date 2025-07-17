import React, { useState } from 'react';
import TeacherHeader from '../components/TeacherHeader';

const BACKEND_URL = 'http://localhost:8000';

const TeacherSettings = () => {
  const [prevPassword, setPrevPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    try {
      const res = await fetch(`${BACKEND_URL}/api/accounts/change_password/teacher`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          prev_password: prevPassword,
          new_password: newPassword
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess('Password changed successfully');
        setPrevPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(data.error || 'Failed to change password');
      }
    } catch {
      setError('Server error');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <TeacherHeader />
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 0'
      }}>
        <div style={{
          background: '#fff',
          padding: '2.5rem 2rem',
          borderRadius: '18px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          minWidth: '280px',
          maxWidth: '95vw',
          width: '400px',
          margin: '0 1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h2 style={{
            color: '#2563eb',
            fontWeight: 800,
            fontSize: '1.7rem',
            letterSpacing: '1px',
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}>Teacher Settings</h2>
          <form onSubmit={handleChangePassword} style={{ width: '100%' }}>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', marginBottom: 6, color: '#334155', fontWeight: 600, fontSize: '1rem' }}>Previous Password</label>
              <input
                type="password"
                value={prevPassword}
                onChange={e => setPrevPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: 8,
                  border: '1px solid #cbd5e1',
                  fontSize: '1rem',
                  background: '#f1f5f9'
                }}
                placeholder="Enter previous password"
              />
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', marginBottom: 6, color: '#334155', fontWeight: 600, fontSize: '1rem' }}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: 8,
                  border: '1px solid #cbd5e1',
                  fontSize: '1rem',
                  background: '#f1f5f9'
                }}
                placeholder="Enter new password"
              />
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', marginBottom: 6, color: '#334155', fontWeight: 600, fontSize: '1rem' }}>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: 8,
                  border: '1px solid #cbd5e1',
                  fontSize: '1rem',
                  background: '#f1f5f9'
                }}
                placeholder="Confirm new password"
              />
            </div>
            {error && (
              <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>
            )}
            {success && (
              <div style={{ color: 'green', marginBottom: '1rem', textAlign: 'center' }}>{success}</div>
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
              Change Password
            </button>
          </form>
        </div>
      </main>
      <style>
        {`
          @media (max-width: 600px) {
            main > div[style*="background: #fff"] {
              padding: 1rem 0.2rem !important;
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

export default TeacherSettings;