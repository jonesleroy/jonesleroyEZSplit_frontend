const SimpleHome = () => {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: 'white', 
      color: 'black',
      fontSize: '18px',
      textAlign: 'center'
    }}>
      <h1>🎉 EZ Split is Working!</h1>
      <p>This is a simplified home page to test if React is rendering.</p>
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#f0f8ff', 
        borderRadius: '8px' 
      }}>
        <p><strong>✅ React is working</strong></p>
        <p><strong>✅ Routing is working</strong></p>
        <p><strong>✅ Styles are working</strong></p>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <a href="/api-test" style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          margin: '5px'
        }}>
          Test API Connection
        </a>
        
        <a href="/table/5/options" style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          margin: '5px'
        }}>
          Test EZ Split Options
        </a>
      </div>
    </div>
  );
};

export default SimpleHome;