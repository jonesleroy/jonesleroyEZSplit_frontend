import { useParams, useNavigate } from "react-router";
const EZSplitOptions = () => {
  const { tableNumber } = useParams();
  const navigate = useNavigate();
  const handlePayInFull = () => {
    // Navigate to Pay in Full page
    // App routes use /table/:tableNumber/guests for number of guests
    navigate(`/table/${tableNumber}/FullPaymentPage`);
  };
  const handleSplitEvenly = () => {
    // Navigate to the Split Evenly page (top-level route)
    navigate(`/SplitEvenlyPayment`);
  };

  const handleCustomSplit = () => {
    // Navigate to item selection for custom split (table-scoped)
    if (tableNumber) navigate(`/table/${tableNumber}/select-items`);
    else navigate(`/table/1/select-items`);
  };
  return (
    <div className="ezsplit-options-container">
      {/* Header with Logo and Tagline */}
      <header className="options-header">
        <div className="logo-container">
          <img src="/ezsplit-logo.jpg" alt="EZSplit Logo" className="logo" />
        </div>
        <h1 className="tagline">Making Dining Fun</h1>
        <p className="table-info">Table #{tableNumber}</p>
      </header>
      {/* Main Content */}
      <main className="options-main">
        <div className="options-section">
          <h2>Choose Your Payment Option</h2>
          <p className="options-subtitle">
            How would you like to handle your bill?
          </p>
          <div className="button-container">
            <button
              className="option-button pay-full-button"
              onClick={handlePayInFull}
            >
              <div className="button-icon">💳</div>
              <div className="button-content">
                <h3>Pay in Full</h3>
                <p>One person pays the entire bill</p>
              </div>
            </button>
            <button
              className="option-button ezsplit-button"
              onClick={handleSplitEvenly}
            >
              <div className="button-icon">💳</div>
              <div className="button-content">
                <h3>EZSplit</h3>
                <p>Split the bill among multiple people</p>
              </div>
            </button>
          </div>
          <div className="button-container">
            <button
              className="option-button custom-split-button"
              onClick={handleCustomSplit}
            >
              <div className="button-icon">💳</div>
              <div className="button-content">
                <h3>Custom Split</h3>
                <p>Select items for each guest</p>
              </div>
            </button>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="options-footer">
        <button className="back-button" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </footer>
    </div>
  );
};
export default EZSplitOptions;
