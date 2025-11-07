import { useState } from "react";
import { useNavigate, useParams } from "react-router";
const NumberOfGuests = () => {
  const [guestCount, setGuestCount] = useState("");
  const navigate = useNavigate();
  const { tableNumber } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (guestCount && String(guestCount).trim()) {
      // after entering number of guests, go to the full payment page for this table
      navigate(`/table/${tableNumber}/options`);
    }
  };
  return (
    <div className="numberOfGuests-container">
      <header className="numberOfGuests-header">
        <img
          src="/ezsplit-logo.jpg"
          alt="EZSplit Logo"
          className="logo"
          style={{}}
          onError={(e) => {
            console.log("Image failed to load:", e.target.src);
            e.target.style.display = "none";
          }}
        />
        <h1 style={{ fontSize: "2.5rem", color: "" }}>Making Dining Fun</h1>
      </header>
      <div className="numberOfGuests-main" style={{}}>
        <form
          onSubmit={handleSubmit}
          className="numberOfGuests-form"
          style={{}}
        >
          <h2 style={{}}>Enter Number of Guests</h2>
          <input
            type="number"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            placeholder="e.g., 4"
            required
            min="1"
            className="guest-input"
            style={{}}
          />
          <button type="submit" className="submit-button" style={{}}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
export default NumberOfGuests;
