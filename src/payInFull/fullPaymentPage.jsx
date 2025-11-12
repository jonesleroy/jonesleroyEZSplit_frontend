import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const FullPaymentPage = () => {
  const { tableNumber } = useParams();
  const navigate = useNavigate();

  // Menu items state
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Payment form state
  const [paymentInfo, setPaymentInfo] = useState({
    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
  });

  // Load menu items from backend
  useEffect(() => {
    const loadMenu = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log(
          "Fetching menu items from:",
          `http://localhost:3000/menu/${tableNumber}`
        );

        // First try the table-specific endpoint
        let response = await fetch(`http://localhost:3000/menu/${tableNumber}`);

        // If that fails, try the general menu endpoint
        if (!response.ok) {
          console.log(
            "Table-specific endpoint failed, trying general menu endpoint"
          );
          response = await fetch("http://localhost:3000/menu");
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const items = await response.json();
        setMenuItems(items);
        console.log(
          "✅ Loaded menu items for full payment:",
          items.length,
          "items"
        );
        console.log("First few items:", items.slice(0, 3));
      } catch (err) {
        console.error("❌ Error loading menu:", err);
        setError(`Failed to load menu items: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, [tableNumber]);

  // Calculate total amount based on selected items
  const calculateTotal = () => {
    return selectedItems.reduce(
      (total, item) => total + (parseFloat(item.prices) || 0),
      0
    );
  };

  // Handle item selection for payment
  const handleItemToggle = (item) => {
    setSelectedItems((prev) => {
      const isSelected = prev.some((selected) => selected.id === item.id);
      if (isSelected) {
        return prev.filter((selected) => selected.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  // Select all items
  const handleSelectAll = () => {
    if (selectedItems.length === menuItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...menuItems]);
    }
  };

  // Handle input changes with formatting
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value; // Default to raw value

    // Format card number (add spaces every 4 digits)
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s+/g, "") // Remove existing spaces
        .replace(/[^0-9]/gi, "") // Remove non-numeric characters
        .replace(/(.{4})/g, "$1 ") // Add space every 4 characters
        .trim(); // Remove trailing space
    }

    // Format expiration date (MM/YY)
    if (name === "expirationDate") {
      formattedValue = value
        .replace(/\D/g, "") // Remove non-digits
        .replace(/(\d{2})(\d)/, "$1/$2") // Add slash after 2 digits
        .substring(0, 5); // Limit to MM/YY format
    }

    // Update state
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: formattedValue, // Use formatted value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that items are selected
    if (selectedItems.length === 0) {
      alert("Please select at least one item to pay for.");
      return;
    }

    // In a real app, you would process the payment here
    console.log("Payment submitted:", {
      paymentInfo,
      selectedItems,
      totalAmount: calculateTotal(),
      tableNumber,
    });

    // Navigate to receipt page after payment processing
    navigate(`/table/${tableNumber}/receipt`, {
      state: {
        selectedItems,
        totalAmount: calculateTotal(),
        paymentInfo,
      },
    });
  };

  return (
    <div className="full-payment-container">
      {/* Header with Logo and Tagline */}
      <header className="payment-header">
        <div className="logo-container">
          <img src="/ezsplit-logo.jpg" alt="EZSplit Logo" className="logo" />
        </div>
        <h1 className="tagline">Making Dinning Fun</h1>
        <p className="table-info">Table #{tableNumber}</p>
      </header>

      {/* Main Content */}
      <main className="payment-main">
        <div className="payment-section">
          <h2>Making Full Payment</h2>

          {/* Menu Selection Section */}
          <div className="menu-selection">
            <div className="menu-header">
              <h3>Select Items to Pay For</h3>
              <button
                type="button"
                className="select-all-button"
                onClick={handleSelectAll}
              >
                {selectedItems.length === menuItems.length
                  ? "Deselect All"
                  : "Select All"}
              </button>
            </div>

            {loading && (
              <div className="loading-message">
                <p>🔄 Loading menu items for Table {tableNumber}...</p>
                <p style={{ fontSize: "0.9rem", color: "#666" }}>
                  Fetching from: http://localhost:3000/menu/{tableNumber}
                </p>
              </div>
            )}

            {error && (
              <div className="error-message">
                <p>❌ {error}</p>
                <p style={{ fontSize: "0.9rem", color: "#666" }}>
                  Backend URL: http://localhost:3000/menu/{tableNumber}
                </p>
                <button onClick={() => window.location.reload()}>
                  🔄 Retry
                </button>
              </div>
            )}

            {!loading && !error && menuItems.length === 0 && (
              <div className="error-message">
                <p>⚠️ No menu items found for Table {tableNumber}</p>
                <p style={{ fontSize: "0.9rem", color: "#666" }}>
                  The API returned an empty array. Check the database.
                </p>
                <button onClick={() => window.location.reload()}>
                  🔄 Retry
                </button>
              </div>
            )}

            {!loading && !error && menuItems.length > 0 && (
              <div className="menu-items-list">
                <div
                  style={{
                    padding: "10px",
                    backgroundColor: "#f0f8ff",
                    marginBottom: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <small>
                    ✅ Loaded {menuItems.length} menu items from backend
                  </small>
                </div>
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className={`menu-item ${
                      selectedItems.some((selected) => selected.id === item.id)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleItemToggle(item)}
                  >
                    <div className="item-info">
                      <span className="item-name">{item.items}</span>
                    </div>
                    <div className="item-price">
                      ${parseFloat(item.prices).toFixed(2)}
                    </div>
                    <div className="item-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedItems.some(
                          (selected) => selected.id === item.id
                        )}
                        onChange={() => handleItemToggle(item)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bill Display Section */}
          <div className="bill-display">
            <h3>Total Amount</h3>
            <div className="total-amount">${calculateTotal().toFixed(2)}</div>
            <p className="amount-description">
              {selectedItems.length} item(s) selected for Table #{tableNumber}
            </p>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="payment-form">
            <h3>Payment Information</h3>

            <div className="form-group">
              <label htmlFor="nameOnCard" className="form-label">
                Name on Credit Card
              </label>
              <input
                id="nameOnCard"
                type="text"
                name="nameOnCard"
                value={paymentInfo.nameOnCard}
                onChange={handleInputChange}
                placeholder="Enter cardholder name"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cardNumber" className="form-label">
                Card Number
              </label>
              <input
                id="cardNumber"
                type="text"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className="form-input"
                maxLength="23"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="expirationDate" className="form-label">
                Expiration Date
              </label>
              <input
                id="expirationDate"
                type="text"
                name="expirationDate"
                value={paymentInfo.expirationDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                className="form-input"
                maxLength="5"
                required
              />
            </div>

            <button
              type="submit"
              className={`payment-submit-button ${
                selectedItems.length === 0 ? "disabled" : ""
              }`}
              disabled={selectedItems.length === 0}
            >
              {selectedItems.length === 0
                ? "Select Items to Process Payment"
                : `Process Payment - $${calculateTotal().toFixed(2)}`}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="payment-footer">
        <button
          className="back-button"
          onClick={() => navigate(`/table/${tableNumber}/options`)}
        >
          ← Back to Options
        </button>
      </footer>
    </div>
  );
};

export default FullPaymentPage;
