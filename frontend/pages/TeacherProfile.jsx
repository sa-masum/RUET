import React, { useEffect, useState } from 'react';
import TeacherHeader from '../components/TeacherHeader';

const BACKEND_URL = 'http://localhost:8000';

const initialProfile = {
  name: '',
  department: '',
  designation: '',
  email: '',
  created_at: ''
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

const designations = [
  'Professor',
  'Associate Professor',
  'Assistant Professor',
  'Lecturer',
  'Senior Lecturer',
  'Research Associate'
];

const TeacherProfile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/accounts/get_profile/teacher`, {
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
      const res = await fetch(`${BACKEND_URL}/api/accounts/update_profile/teacher`, {
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
          }}>Teacher Profile</h2>
          
          <div style={{ width: '100%' }}>
            <h3 style={{ color: '#2563eb', fontWeight: 700, fontSize: '1.15rem', marginBottom: 8 }}>Personal Information</h3>
            <div className="grid">
              <div className="form-group">
                <label>Name</label>
                <input name="name" value={profile.name} onChange={handleChange} disabled={!editMode} style={inputStyle} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="email" value={profile.email} disabled style={inputStyle} />
              </div>
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
                <label>Designation</label>
                {editMode ? (
                  <select 
                    name="designation" 
                    value={profile.designation} 
                    onChange={handleChange} 
                    style={inputStyle}
                  >
                    <option value="">Select Designation</option>
                    {designations.map(designation => (
                      <option key={designation} value={designation}>
                        {designation}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input 
                    name="designation" 
                    value={profile.designation} 
                    disabled 
                    style={inputStyle} 
                  />
                )}
              </div>
              <div className="form-group">
                <label>Member Since</label>
                <input 
                  name="created_at" 
                  value={profile.created_at ? new Date(profile.created_at).toLocaleDateString() : ''} 
                  disabled 
                  style={inputStyle} 
                />
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

export default TeacherProfile;