import { useState } from 'react';

const TestPage = () => {
  const [message, setMessage] = useState('React is working!');
  
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: 'white', 
      margin: '20px', 
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#667eea' }}>EZSplit Test Page</h1>
      <p>{message}</p>
      <button 
        onClick={() => setMessage('Button clicked! React is definitely working!')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Test React State
      </button>
      
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p>Current URL: {window.location.href}</p>
        <p>Timestamp: {new Date().toLocaleString()}</p>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <a href="/table/5/options" style={{ color: '#667eea', textDecoration: 'none' }}>
          Go to Table 5 Options →
        </a>
      </div>
    </div>
  );
};

export default TestPage;