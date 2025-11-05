import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';

const NumberOfGuests = () => {
  const { tableNumber } = useParams();
  const navigate = useNavigate();
  const [showPopup] = useState(true);
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const guestCount = parseInt(numberOfGuests);
    
    if (!numberOfGuests || guestCount < 2 || guestCount > 20) {
      setError('Please enter a valid number of guests (2-20)');
      return;
    }
    
    setError('');
    // Navigate to the EZSplit Payment page
    navigate(`/table/${tableNumber}/ezsplit-payment/${guestCount}`);
  };

  const handleCancel = () => {
    navigate(`/table/${tableNumber}/options`);
  };

  return (
    <div className="number-of-guests-container">
      {/* Header with Logo and Tagline */}
      <header className="guests-header">
        <div className="logo-container">
          <img 
            src="/ezsplit-logo.jpg" 
            alt="EZSplit Logo" 
            className="logo"
          />
        </div>
        <h1 className="tagline">Making Dining Fun!</h1>
        <p className="table-info">Table #{tableNumber}</p>
      </header>

      {/* Main Content */}
      <main className="guests-main">
        <div className="background-content">
          <h2>EZSplit Payment</h2>
          <p>We&apos;ll help you split the bill fairly among your group!</p>
        </div>

        {/* Popup Modal */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-container">
              <div className="popup-header">
                <h3>Number of Guests</h3>
              </div>
              
              <div className="popup-content">
                <p>How many people will be splitting the bill?</p>
                
                <div className="input-container">
                  <input
                    type="number"
                    min="2"
                    max="20"
                    value={numberOfGuests}
                    onChange={(e) => {
                      setNumberOfGuests(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter number of guests"
                    className="guests-input"
                    autoFocus
                  />
                </div>
                
                {error && (
                  <div className="error-message">
                    {error}
                  </div>
                )}
                
                <div className="popup-buttons">
                  <button 
                    className="cancel-button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button 
                    className="continue-button"
                    onClick={handleSubmit}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default NumberOfGuests;
