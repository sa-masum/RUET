import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import TeacherHeader from '../components/TeacherHeader';

const ruetInfo = {
  name: "Rajshahi University of Engineering & Technology (RUET)",
  established: "1964",
  location: "Rajshahi, Bangladesh",
  description: "RUET is one of the leading public engineering universities in Bangladesh, renowned for its excellence in engineering education, research, and innovation. The campus is vibrant with academic activities, faculty research, and a strong academic community.",
  website: "https://www.ruet.ac.bd/",
  departments: [
    "Civil Engineering",
    "Electrical & Electronic Engineering",
    "Mechanical Engineering",
    "Computer Science & Engineering",
    "Architecture",
    "Industrial & Production Engineering",
    "Urban & Regional Planning",
    "Mechatronics Engineering",
    "Materials Science & Engineering",
    "Chemical & Food Process Engineering"
  ]
};

const BACKEND_URL = 'http://localhost:8000';

const TeacherHome = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <TeacherHeader />
      {/* Main Content */}
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
          width: '600px',
          margin: '0 1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h2 style={{
            color: '#2563eb',
            fontWeight: 800,
            fontSize: '2.1rem',
            letterSpacing: '1px',
            textAlign: 'center',
            marginBottom: '0.5rem'
          }}>{ruetInfo.name}</h2>
          <p style={{
            color: '#334155',
            fontSize: '1.15rem',
            textAlign: 'center',
            marginBottom: '1.2rem'
          }}>{ruetInfo.description}</p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              background: '#f1f5f9',
              borderRadius: 10,
              padding: '1rem 1.5rem',
              minWidth: 120,
              textAlign: 'center',
              fontWeight: 600,
              color: '#2563eb'
            }}>
              <span>Established</span>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#334155' }}>{ruetInfo.established}</div>
            </div>
            <div style={{
              background: '#f1f5f9',
              borderRadius: 10,
              padding: '1rem 1.5rem',
              minWidth: 120,
              textAlign: 'center',
              fontWeight: 600,
              color: '#2563eb'
            }}>
              <span>Location</span>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#334155' }}>{ruetInfo.location}</div>
            </div>
            <div style={{
              background: '#f1f5f9',
              borderRadius: 10,
              padding: '1rem 1.5rem',
              minWidth: 120,
              textAlign: 'center',
              fontWeight: 600,
              color: '#2563eb'
            }}>
              <span>Website</span>
              <div>
                <a href={ruetInfo.website} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'underline', fontSize: '1.1rem' }}>
                  Visit
                </a>
              </div>
            </div>
          </div>
          <div style={{
            width: '100%',
            marginBottom: '1.2rem'
          }}>
            <h3 style={{ color: '#2563eb', fontWeight: 700, fontSize: '1.15rem', marginBottom: 8 }}>Departments</h3>
            <ul style={{
              columns: 2,
              columnGap: '2rem',
              paddingLeft: 0,
              margin: 0,
              listStyle: 'none',
              color: '#334155',
              fontSize: '1.05rem',
              fontWeight: 500
            }}>
              {ruetInfo.departments.map(dep => (
                <li key={dep} style={{ marginBottom: 6, paddingLeft: 12, position: 'relative' }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    color: '#2563eb',
                    fontWeight: 700
                  }}>•</span>
                  {dep}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <style>
        {`
          @media (max-width: 900px) {
            main > div[style*="background: #fff"] {
              width: 98vw !important;
              padding: 1.5rem 0.5rem !important;
            }
            ul {
              columns: 1 !important;
            }
          }
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

export default TeacherHome;