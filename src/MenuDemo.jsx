import MenuDisplay from './components/MenuDisplay';
import './components/MenuDisplay.css';

const MenuDemo = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>EZSplit Menu System Demo</h1>
        <p>This demonstrates how menu items and prices are displayed in the application.</p>
      </header>
      
      <main>
        <MenuDisplay tableNumber="1" />
      </main>
      
      <footer className="demo-footer">
        <div className="demo-info">
          <h3>How it works:</h3>
          <ul>
            <li><strong>Backend API:</strong> GET /menu or GET /menu/:table_id endpoints serve menu data</li>
            <li><strong>Database:</strong> Menu items stored with id, items (name), prices, and optional image_url</li>
            <li><strong>Frontend:</strong> React components fetch and display menu items with prices</li>
            <li><strong>Fallback:</strong> Mock data is used if backend is unavailable</li>
          </ul>
          
          <h3>Current Menu Data Structure:</h3>
          <pre>{`{
  id: number,
  items: string,    // Item name
  prices: number,   // Item price
  image_url?: string
}`}</pre>
        </div>
      </footer>
    </div>
  );
};

export default MenuDemo;