import { useState, useEffect } from "react";
import { mockApiService } from "./api/mockApi";

const MenuDisplay = ({ tableNumber = "1" }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMenu = async () => {
      setLoading(true);
      setError(null);

      try {
        // Try to fetch from backend API first
        const backendUrl = `http://localhost:3000/menu/${tableNumber}`;
        let menu;

        try {
          const response = await fetch(backendUrl);
          if (response.ok) {
            menu = await response.json();
            console.log("Loaded menu from backend:", menu);
          } else {
            throw new Error("Backend not available");
          }
        } catch (backendError) {
          console.log(
            "Backend not available, using mock data:",
            backendError.message
          );
          // Fallback to mock data
          menu = await mockApiService.getMenuByTable(tableNumber);
        }

        setMenuItems(menu);
      } catch (err) {
        setError("Failed to load menu items");
        console.error("Error loading menu:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, [tableNumber]);

  const calculateTotal = () => {
    return menuItems.reduce(
      (total, item) => total + (parseFloat(item.prices || item.price) || 0),
      0
    );
  };

  if (loading) {
    return (
      <div className="menu-display loading">
        <p>Loading menu items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-display error">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="menu-display">
      <div className="menu-header">
        <h2>Restaurant Menu - Table #{tableNumber}</h2>
        <p className="menu-subtitle">Choose from our delicious selection</p>
      </div>

      <div className="menu-items">
        {menuItems.length > 0 ? (
          <>
            {menuItems.map((item, index) => (
              <div key={item.id || index} className="menu-item">
                <div className="item-info">
                  <h3 className="item-name">
                    {item.items || item.name || "Unnamed Item"}
                  </h3>
                  {item.description && (
                    <p className="item-description">{item.description}</p>
                  )}
                </div>
                <div className="item-price">
                  ${(parseFloat(item.prices || item.price) || 0).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="menu-summary">
              <div className="total-items">Total Items: {menuItems.length}</div>
              <div className="price-range">
                Price Range: $
                {Math.min(
                  ...menuItems.map(
                    (item) => parseFloat(item.prices || item.price) || 0
                  )
                ).toFixed(2)}{" "}
                - $
                {Math.max(
                  ...menuItems.map(
                    (item) => parseFloat(item.prices || item.price) || 0
                  )
                ).toFixed(2)}
              </div>
              <div className="menu-total">
                Total Menu Value: ${calculateTotal().toFixed(2)}
              </div>
            </div>
          </>
        ) : (
          <p className="no-items">No menu items available for this table.</p>
        )}
      </div>
    </div>
  );
};

export default MenuDisplay;
