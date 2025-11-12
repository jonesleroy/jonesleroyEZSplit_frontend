import { useState } from "react";
import { useNavigate, useParams } from "react-router";

const NumberOfGuests = () => {
  const [guestCount, setGuestCount] = useState("");
  const navigate = useNavigate();
  const { tableNumber } = useParams();
  
  console.log("NumberOfGuests component rendered, tableNumber:", tableNumber);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (guestCount && String(guestCount).trim() && parseInt(guestCount) > 0) {
      // Navigate to EZSplit payment page with guest count
      navigate(`/table/${tableNumber}/ezsplit-payment/${guestCount}`);
    }
  };

  const handleCancel = () => {
    navigate(`/table/${tableNumber}/options`);
  };

  return (
    <div className="numberOfGuests-overlay">
      <div className="numberOfGuests-container">
        {/* Header with Logo and Tagline */}
        <header className="numberOfGuests-header">
          <img
            src="/ezsplit-logo.jpg"
            alt="EZSplit Logo"
            className="logo"
            onError={(e) => {
              console.log("Image failed to load:", e.target.src);
              e.target.style.display = "none";
            }}
          />
          <h1 className="tagline">Making Dining Fun!</h1>
        </header>

        {/* Modal Content */}
        <div className="numberOfGuests-modal">
          <form onSubmit={handleSubmit} className="numberOfGuests-form">
            <h2>Enter Number of Guests</h2>
            <p className="subtitle">How many people are splitting the bill?</p>
            
            <input
              type="number"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              placeholder="e.g., 4"
              required
              min="1"
              max="20"
              className="guest-input"
              autoFocus
            />
            
            <div className="button-group">
              <button type="button" onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
              <button type="submit" className="submit-button">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NumberOfGuests;
