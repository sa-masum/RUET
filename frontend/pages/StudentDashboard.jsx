import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentHeader from '../components/StudentHeader';
import { FaBook, FaClipboardList, FaChartLine, FaMoneyBillWave, FaFileAlt, FaBuilding } from 'react-icons/fa';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const options = [
    { 
      name: 'Course Management', 
      icon: <FaBook size={40} color="#2563eb" />,
      path: '/student/course-manage'
    },
    { 
      name: 'Exam Registration', 
      icon: <FaClipboardList size={40} color="#2563eb" />,
      path: '/student/exam-reg'
    },
    { 
      name: 'Result', 
      icon: <FaChartLine size={40} color="#2563eb" />,
      path: '/student/result'
    },
    { 
      name: 'Pay', 
      icon: <FaMoneyBillWave size={40} color="#2563eb" />,
      path: '/student/pay'
    },
    { 
      name: 'Hall Management', 
      icon: <FaBuilding size={40} color="#2563eb" />,
      path: '/student/hall-manage'
    },
    { 
      name: 'Certificates', 
      icon: <FaFileAlt size={40} color="#2563eb" />,
      path: '/student/certificates'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)' }}>
      <StudentHeader />
      <main style={{ padding: '2rem' }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: '#2563eb',
          marginBottom: '2rem'
        }}>
          Welcome to the Dashboard
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '1rem'
        }}>
          {options.map((option, index) => (
            <div 
              key={index}
              style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                textAlign: 'center',
                minHeight: '180px'
              }}
              className="dashboard-option"
              onClick={() => navigate(option.path)}
            >
              <div style={{ marginBottom: '1rem' }}>
                {option.icon}
              </div>
              <h3 style={{ 
                color: '#2563eb',
                margin: 0,
                fontSize: '1.1rem',
                fontWeight: 600
              }}>
                {option.name}
              </h3>
            </div>
          ))}
        </div>
      </main>

      <style>
        {`
          .dashboard-option:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(37,99,235,0.12);
          }
          
          @media (max-width: 600px) {
            main {
              padding: 1rem !important;
            }
            
            .dashboard-option {
              min-height: 140px !important;
              padding: 1rem !important;
            }
          }
          
          @media (max-width: 400px) {
            .dashboard-option {
              min-height: 120px !important;
              padding: 0.8rem !important;
            }
            
            h3 {
              font-size: 1rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default StudentDashboard;