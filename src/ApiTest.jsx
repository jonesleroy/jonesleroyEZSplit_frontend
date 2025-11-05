import { useState, useEffect } from 'react';

const ApiTest = () => {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('Testing API connection...');
        const response = await fetch('http://localhost:3000/menu');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API data received:', data.length, 'items');
        setMenuData(data);
      } catch (err) {
        console.error('API Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    testAPI();
  }, []);
  
  if (loading) {
    return (
      <div style={{ padding: '20px', backgroundColor: 'white', margin: '20px', borderRadius: '8px' }}>
        <h2>Testing API Connection...</h2>
        <p>Loading menu data from backend...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#ffe6e6', margin: '20px', borderRadius: '8px' }}>
        <h2 style={{ color: '#d00' }}>API Connection Failed</h2>
        <p><strong>Error:</strong> {error}</p>
        <p><strong>Backend URL:</strong> http://localhost:3000/menu</p>
        <p><strong>Possible issues:</strong></p>
        <ul>
          <li>Backend server not running</li>
          <li>CORS policy blocking requests</li>
          <li>Network connectivity issue</li>
        </ul>
      </div>
    );
  }
  
  return (
    <div style={{ padding: '20px', backgroundColor: 'white', margin: '20px', borderRadius: '8px' }}>
      <h2 style={{ color: '#667eea' }}>✅ API Connection Successful!</h2>
      <p><strong>Menu items loaded:</strong> {menuData?.length || 0}</p>
      
      <div style={{ marginTop: '20px' }}>
        <h3>First 5 Menu Items:</h3>
        {menuData?.slice(0, 5).map((item, index) => (
          <div key={item.id} style={{ 
            padding: '10px', 
            margin: '5px 0', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>{index + 1}. {item.items}</span>
            <span style={{ fontWeight: 'bold', color: '#28a745' }}>${item.prices.toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <a href="/table/5/select-items" style={{ 
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#667eea',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Test Select Items Page →
        </a>
      </div>
    </div>
  );
};

export default ApiTest;