import { useParams, useNavigate } from 'react-router';

const EZSplitPaymentPage = () => {
  const { tableNumber, guestCount } = useParams();
  const navigate = useNavigate();

  const handleSplitEvenly = () => {
    // Navigate to the split evenly payment page
    navigate(`/table/${tableNumber}/split-evenly/${guestCount}`);
  };

  const handleCustomSplit = () => {
    // Navigate to the select items page for custom split
    navigate(`/table/${tableNumber}/select-items`, {
      state: {
        guestCount,
        guestIndex: 0 // Start with first guest
      }
    });
  };

  const handleBack = () => {
    // Navigate back to number of guests page
    navigate(`/table/${tableNumber}/number-of-guests`);
  };

  return (
    <div className="ezsplit-payment-container">
      {/* Header with Logo and Tagline */}
      <header className="payment-header">
        <div className="logo-container">
          <img 
            src="/ezsplit-logo.jpg" 
            alt="EZSplit Logo" 
            className="logo"
          />
        </div>
        <h1 className="tagline">Making Dining Fun!</h1>
        <p className="table-info">Table #{tableNumber} • {guestCount} Guests</p>
      </header>

      {/* Main Content */}
      <main className="payment-main">
        <div className="payment-content">
          <h2>EZSplit Payment Options</h2>
          <p className="subtitle">Choose how you&apos;d like to split your bill</p>

          <div className="payment-options">
            <div className="option-card">
              <div className="option-icon">
                <span>⚖️</span>
              </div>
              <h3>Split Evenly</h3>
              <p>Divide the total bill equally among all {guestCount} guests</p>
              <button 
                className="option-button split-evenly-btn"
                onClick={handleSplitEvenly}
              >
                Split Evenly
              </button>
            </div>

            <div className="option-card">
              <div className="option-icon">
                <span>🎯</span>
              </div>
              <h3>Custom Split</h3>
              <p>Choose specific items or amounts for each person</p>
              <button 
                className="option-button custom-split-btn"
                onClick={handleCustomSplit}
              >
                Custom Split
              </button>
            </div>
          </div>

          <div className="navigation-buttons">
            <button 
              className="back-button"
              onClick={handleBack}
            >
              ← Back to Guest Count
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EZSplitPaymentPage;
