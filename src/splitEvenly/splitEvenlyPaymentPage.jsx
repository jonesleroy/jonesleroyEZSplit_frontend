import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const SplitEvenlyPaymentPage = () => {
  const { tableNumber, guestCount } = useParams();
  const navigate = useNavigate();

  const numberOfGuests = parseInt(guestCount);

  // Menu items state
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Payment workflow state
  const [currentStep, setCurrentStep] = useState("menu-selection"); // 'menu-selection', 'payment-details'
  const [currentGuestIndex, setCurrentGuestIndex] = useState(0);
  const [guestPayments, setGuestPayments] = useState(
    Array.from({ length: numberOfGuests }, (_, i) => ({
      guestNumber: i + 1,
      paymentInfo: {
        nameOnCard: "",
        cardNumber: "",
        expirationDate: "",
      },
      isPaid: false,
    }))
  );

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

        const response = await fetch(
          `https://ezsplit.onrender.com/menu/${tableNumber}`
        );

        if (!response.ok) {
          // Try general menu endpoint if table-specific fails
          const generalResponse = await fetch(
            "https://ezsplit.onrender.com/menu"
          );
          if (!generalResponse.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const items = await generalResponse.json();
          setMenuItems(items);
        } else {
          const items = await response.json();
          setMenuItems(items);
        }

        console.log("✅ Loaded menu items for split evenly");
      } catch (err) {
        console.error("❌ Error loading menu:", err);
        setError(`Failed to load menu items: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, [tableNumber]);

  // Calculate totals
  const calculateTotal = () => {
    return selectedItems.reduce(
      (total, item) => total + (parseFloat(item.prices) || 0),
      0
    );
  };

  const splitAmount = calculateTotal() / numberOfGuests;

  // Handle item selection
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

  // Current guest payment info
  const currentPaymentInfo = guestPayments[currentGuestIndex]?.paymentInfo || {
    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
  };

  // Handle input changes with formatting
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

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

    // Update current guest's payment info
    setGuestPayments((prev) => {
      const updated = [...prev];
      updated[currentGuestIndex] = {
        ...updated[currentGuestIndex],
        paymentInfo: {
          ...updated[currentGuestIndex].paymentInfo,
          [name]: formattedValue,
        },
      };
      return updated;
    });
  };

  // Handle menu selection completion
  const handleMenuSelectionComplete = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one menu item to proceed.");
      return;
    }
    setCurrentStep("payment-details");
  };

  // Handle individual guest payment
  const handleGuestPayment = (e) => {
    e.preventDefault();

    // Mark current guest as paid
    setGuestPayments((prev) => {
      const updated = [...prev];
      updated[currentGuestIndex] = {
        ...updated[currentGuestIndex],
        isPaid: true,
      };
      return updated;
    });

    // Check if all guests have paid
    const allGuestsPaid = currentGuestIndex >= numberOfGuests - 1;

    if (allGuestsPaid) {
      // Navigate to receipt if all guests have paid
      console.log("All guests paid! Proceeding to receipt...");
      console.log("Payment details:", guestPayments);
      console.log("Selected items:", selectedItems);
      console.log("Total amount:", calculateTotal());

      navigate(`/table/${tableNumber}/receipt`, {
        state: {
          selectedItems,
          totalAmount: calculateTotal(),
          splitAmount,
          numberOfGuests,
          guestPayments,
          paymentType: "split-evenly",
        },
      });
    } else {
      // Move to next guest
      setCurrentGuestIndex((prev) => prev + 1);
    }
  };
  return (
    <div className="split-evenly-payment-container">
      {/* Header with Logo and Tagline */}
      <header className="payment-header">
        <div className="logo-container">
          <img src="/ezsplit-logo.jpg" alt="EZSplit Logo" className="logo" />
        </div>
        <h1 className="tagline">Making Dining Fun!</h1>
        <p className="table-info">
          Table #{tableNumber} • {numberOfGuests} Guests
        </p>
      </header>

      {/* Main Content */}
      <main className="payment-main">
        <div className="payment-section">
          {currentStep === "menu-selection" && (
            <>
              <h2>Split Evenly - Select Menu Items</h2>

              {/* Menu Selection Section */}
              <div className="menu-selection">
                <div className="menu-header">
                  <h3>Select Items to Split Evenly</h3>
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
                  </div>
                )}

                {error && (
                  <div className="error-message">
                    <p>❌ {error}</p>
                    <button onClick={() => window.location.reload()}>
                      🔄 Retry
                    </button>
                  </div>
                )}

                {!loading && !error && menuItems.length === 0 && (
                  <div className="error-message">
                    <p>⚠️ No menu items found for Table {tableNumber}</p>
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
                      <small>✅ Loaded {menuItems.length} menu items</small>
                    </div>
                    {menuItems.map((item) => (
                      <div
                        key={item.id}
                        className={`menu-item ${
                          selectedItems.some(
                            (selected) => selected.id === item.id
                          )
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

              {/* Selected Items Summary */}
              {selectedItems.length > 0 && (
                <div className="selection-summary">
                  <h4>Selected Items ({selectedItems.length})</h4>
                  <div className="total-amount">
                    Total: ${calculateTotal().toFixed(2)}
                  </div>
                  <div className="split-preview">
                    Split evenly among {numberOfGuests} guests:{" "}
                    <strong>${splitAmount.toFixed(2)} each</strong>
                  </div>
                </div>
              )}

              {/* Continue Button */}
              <button
                className={`continue-button ${
                  selectedItems.length === 0 ? "disabled" : ""
                }`}
                onClick={handleMenuSelectionComplete}
                disabled={selectedItems.length === 0}
              >
                {selectedItems.length === 0
                  ? "Select Items to Continue"
                  : `Continue to Payment - ${numberOfGuests} Guest${
                      numberOfGuests > 1 ? "s" : ""
                    }`}
              </button>
            </>
          )}

          {currentStep === "payment-details" && (
            <>
              <h2>
                Split Evenly Payment - Guest {currentGuestIndex + 1} of{" "}
                {numberOfGuests}
              </h2>

              {/* Bill Breakdown Display */}
              <div className="bill-display">
                <h3>Payment Breakdown</h3>
                <div className="breakdown-item">
                  <span className="breakdown-label">Total Bill:</span>
                  <span className="breakdown-value">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-label">Number of Guests:</span>
                  <span className="breakdown-value">{numberOfGuests}</span>
                </div>
                <div className="breakdown-calculation">
                  <span className="calculation-text">
                    ${calculateTotal().toFixed(2)} ÷ {numberOfGuests} = $
                    {splitAmount.toFixed(2)}
                  </span>
                </div>
                <div className="split-amount">
                  <strong>Your Share: ${splitAmount.toFixed(2)}</strong>
                </div>
              </div>

              {/* Guest Progress Indicator */}
              <div className="guest-progress">
                <h4>Payment Progress</h4>
                <div className="progress-indicators">
                  {guestPayments.map((guest, index) => (
                    <div
                      key={guest.guestNumber}
                      className={`guest-indicator ${
                        index === currentGuestIndex
                          ? "current"
                          : guest.isPaid
                          ? "completed"
                          : "pending"
                      }`}
                    >
                      Guest {guest.guestNumber}
                      {guest.isPaid && <span className="checkmark">✓</span>}
                      {index === currentGuestIndex && (
                        <span className="current-arrow">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Form */}
              <form onSubmit={handleGuestPayment} className="payment-form">
                <div className="form-group">
                  <label htmlFor="nameOnCard" className="form-label">
                    Name on Credit Card
                  </label>
                  <input
                    id="nameOnCard"
                    type="text"
                    name="nameOnCard"
                    value={currentPaymentInfo.nameOnCard}
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
                    value={currentPaymentInfo.cardNumber}
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
                    value={currentPaymentInfo.expirationDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    className="form-input"
                    maxLength="5"
                    required
                  />
                </div>

                <button type="submit" className="payment-submit-button">
                  {currentGuestIndex < numberOfGuests - 1
                    ? `Pay ${splitAmount.toFixed(2)} & Continue to Next Guest`
                    : `Pay ${splitAmount.toFixed(2)} & Complete Order`}
                </button>
              </form>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="payment-footer">
        <button
          className="back-button"
          onClick={() => navigate(`/table/${tableNumber}/options`)}
        >
          ← Back to Payment Options
        </button>
      </footer>
    </div>
  );
};

export default SplitEvenlyPaymentPage;
