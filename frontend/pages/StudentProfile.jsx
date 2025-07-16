import React, { useEffect, useState } from 'react';
import StudentHeader from '../components/StudentHeader';

const BACKEND_URL = 'http://localhost:8000';

const initialProfile = {
  name: '', father_name: '', mother_name: '', date_of_birth: '', address: '',
  department: '', roll: '', registration_no: '', session: '', total_earned_credit: '', cgpa: ''
};

const departments = [
  { name: 'Architecture', code: 'Arch' },
  { name: 'Building Engineering and Construction Management', code: 'BECM' },
  { name: 'Ceramic and Metallurgical Engineering', code: 'CME' },
  { name: 'Chemical Engineering', code: 'ChE' },
  { name: 'Civil Engineering', code: 'CE' },
  { name: 'Computer Science and Engineering', code: 'CSE' },
  { name: 'Electrical and Computer Engineering', code: 'ECE' },
  { name: 'Electrical and Electronic Engineering', code: 'EEE' },
  { name: 'Electronics and Telecommunication Engineering', code: 'ETE' },
  { name: 'Industrial and Production Engineering', code: 'IPE' },
  { name: 'Materials Science and Engineering', code: 'MSE' },
  { name: 'Mechanical Engineering', code: 'ME' },
  { name: 'Mechatronics Engineering', code: 'MTE' },
  { name: 'Urban and Regional Planning', code: 'URP' }
];

// Function to generate sessions from 1964-65 to current year + 1
const generateSessions = () => {
  const currentYear = new Date().getFullYear();
  const sessions = [];
  for (let year = 1964; year <= currentYear; year++) {
    sessions.push(`${year}-${(year + 1).toString().slice(-2)}`);
  }
  return sessions.reverse(); 
};

const sessions = generateSessions();

const StudentProfile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/accounts/get_profile/student`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setProfile(data.profile);
      });
  }, [editMode]);

  const handleChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/accounts/update_profile/student`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess('Profile updated successfully');
        setEditMode(false);
      } else {
        setError(data.error || 'Failed to update profile');
      }
    } catch {
      setError('Server error');
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <StudentHeader />
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 0'
      }}>
        <div style={{
          background: '#fff',
          padding: '3rem 2.5rem',
          borderRadius: '20px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
          width: '720px',
          maxWidth: '95vw',
          margin: '0 1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h2 style={{
            color: '#2563eb',
            fontWeight: 800,
            fontSize: '2rem',
            letterSpacing: '1px',
            textAlign: 'center',
            marginBottom: '1.2rem'
          }}>Profile</h2>
          
          <div style={{ width: '100%' }}>
            <h3 style={{ color: '#2563eb', fontWeight: 700, fontSize: '1.15rem', marginBottom: 8 }}>Personal Information</h3>
            <div className="grid">
              <div className="form-group">
                <label>Name</label>
                <input name="name" value={profile.name} onChange={handleChange} disabled={!editMode} style={inputStyle} />
              </div>
              <div className="form-group">
                <label>Father Name</label>
                <input name="father_name" value={profile.father_name} onChange={handleChange} disabled={!editMode} style={inputStyle} />
              </div>
              <div className="form-group">
                <label>Mother Name</label>
                <input name="mother_name" value={profile.mother_name} onChange={handleChange} disabled={!editMode} style={inputStyle} />
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" name="date_of_birth" value={profile.date_of_birth} onChange={handleChange} disabled={!editMode} style={inputStyle} />
              </div>
              <div className="form-group full-width">
                <label>Address</label>
                <input name="address" value={profile.address} onChange={handleChange} disabled={!editMode} style={inputStyle} />
              </div>
            </div>

            <h3 style={{ color: '#2563eb', fontWeight: 700, fontSize: '1.15rem', margin: '1.2rem 0 8px 0' }}>Academic Information</h3>
            <div className="grid">
              <div className="form-group">
                <label>Department</label>
                {editMode ? (
                  <select 
                    name="department" 
                    value={profile.department} 
                    onChange={handleChange} 
                    style={inputStyle}
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept.code} value={dept.code}>
                        {dept.name} ({dept.code})
                      </option>
                    ))}
                  </select>
                ) : (
                  <input 
                    name="department" 
                    value={profile.department} 
                    disabled 
                    style={inputStyle} 
                  />
                )}
              </div>
              <div className="form-group">
                <label>Roll</label>
                <input name="roll" value={profile.roll} onChange={handleChange} disabled={!editMode} style={inputStyle} />
              </div>
              <div className="form-group">
                <label>Registration No</label>
                <input name="registration_no" value={profile.registration_no} onChange={handleChange} disabled={!editMode} style={inputStyle} />
              </div>
              <div className="form-group">
                <label>Session</label>
                {editMode ? (
                  <select 
                    name="session" 
                    value={profile.session} 
                    onChange={handleChange} 
                    style={inputStyle}
                  >
                    <option value="">Select Session</option>
                    {sessions.map(session => (
                      <option key={session} value={session}>
                        {session}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input 
                    name="session" 
                    value={profile.session} 
                    disabled 
                    style={inputStyle} 
                  />
                )}
              </div>
              <div className="form-group">
                <label>Total Earned Credit</label>
                <input type="number" step="0.01" name="total_earned_credit" value={profile.total_earned_credit} onChange={handleChange} disabled={!editMode} style={inputStyle} />
              </div>
              <div className="form-group">
                <label>CGPA</label>
                <input type="number" step="0.01" name="cgpa" value={profile.cgpa} onChange={handleChange} disabled={!editMode} style={inputStyle} />
              </div>
            </div>

            {error && <div style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginTop: '1rem', textAlign: 'center' }}>{success}</div>}

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              {!editMode ? (
                <button type="button" onClick={handleEditClick} style={buttonStyle}>
                  Edit Profile
                </button>
              ) : (
                <button type="button" onClick={handleSave} style={buttonStyle}>
                  Save Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <style>
        {`
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
          .form-group {
            display: flex;
            flex-direction: column;
          }
          .form-group.full-width {
            grid-column: span 2;
          }
          label {
            margin-bottom: 4px;
            color: #334155;
            font-weight: 600;
            font-size: 1rem;
          }
          @media (max-width: 600px) {
            .grid {
              grid-template-columns: 1fr;
            }
            .form-group.full-width {
              grid-column: span 1;
            }
          }
        `}
      </style>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.6rem',
  borderRadius: 8,
  border: '1px solid #cbd5e1',
  fontSize: '1rem',
  background: '#f1f5f9',
  marginBottom: 2
};

const buttonStyle = {
  padding: '0.7rem 2.2rem',
  background: 'linear-gradient(90deg, #2563eb 60%, #38bdf8 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  fontWeight: 700,
  fontSize: '1.08rem',
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
  transition: 'background 0.2s'
};

export default StudentProfile;