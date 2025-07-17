import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const BACKEND_URL = 'http://localhost:8000';

const TeacherHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${BACKEND_URL}/api/accounts/logout/teacher`, {
        method: 'POST',
        credentials: 'include'
      });
      document.cookie = 'teacherToken=; Max-Age=0; path=/;';
      navigate('/teacher-login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header
      style={{
        width: '100%',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
        padding: '0.8rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
      }}
      className="ruet-header"
    >
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '2rem' }}>
        <img src="/ruet_logo.png" alt="RUET Logo" style={{ width: 48, borderRadius: '50%', marginRight: 12 }} />
        <span style={{ fontWeight: 800, fontSize: '1.3rem', color: '#2563eb', letterSpacing: '1px' }}>RUET Teacher Portal</span>
      </div>
      <div className="profile-area" style={{ marginRight: '2rem', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: '0 0 auto' }}>
        <button
          aria-label="Profile"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            outline: 'none',
            padding: 0
          }}
          onClick={() => setDropdownOpen(v => !v)}
        >
          <FaUserCircle
            size={40}
            color="#2d4a8bff"
            style={{
              verticalAlign: 'middle',
              boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
              borderRadius: '50%'
            }}
          />
        </button>
        {dropdownOpen && (
          <div style={{
            position: 'absolute',
            top: 48,
            right: 0,
            background: '#fff',
            borderRadius: 10,
            boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
            minWidth: 140,
            zIndex: 10,
            overflow: 'hidden'
          }}>
            <button
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                fontWeight: 600,
                color: '#2563eb',
                cursor: 'pointer',
                fontSize: '1rem',
                borderBottom: '1px solid #f1f5f9'
              }}
              onClick={() => {
                setDropdownOpen(false);
                navigate('/teacher-profile');
              }}
            >
              Profile
            </button>
            <button
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                fontWeight: 600,
                color: '#2563eb',
                cursor: 'pointer',
                fontSize: '1rem',
                borderBottom: '1px solid #f1f5f9'
              }}
              onClick={() => {
                setDropdownOpen(false);
                navigate('/teacher-dashboard');
              }}
            >
              Dashboard
            </button>
            <button
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                fontSize: '1rem',
                borderBottom: '1px solid #f1f5f9'
              }}
              onClick={() => {
                setDropdownOpen(false);
                navigate('/teacher-settings');
              }}
            >
              Settings
            </button>
            <button
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                fontWeight: 600,
                color: '#ef4444',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <style>
        {`
          @media (max-width: 600px) {
            .ruet-header {
              flex-direction: row !important;
              padding: 0.5rem 0 !important;
            }
            .ruet-header > div:first-child {
              margin: 0 !important;
            }
            .profile-area {
              margin-right: 1rem !important;
              justify-content: flex-end !important;
            }
          }
        `}
      </style>
    </header>
  );
};

export default TeacherHeader;