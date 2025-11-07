import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";

const CustomSplitPaymentPage = () => {
  const { tableNumber } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedItems, totalAmount, guestIndex, guestCount } = location.state || {};

  const [paymentForm, setPaymentForm] = useState({
    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number (add spaces every 4 digits)
    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\s+/g, '') // Remove existing spaces
        .replace(/[^0-9]/gi, '') // Remove non-numeric characters
        .replace(/(.{4})/g, '$1 ') // Add space every 4 characters
        .trim(); // Remove trailing space
    }

    // Format expiration date (MM/YY)
    if (name === 'expirationDate') {
      formattedValue = value
        .replace(/\D/g, '') // Remove non-digits
        .replace(/(\d{2})(\d)/, '$1/$2') // Add slash after 2 digits
        .substring(0, 5); // Limit to MM/YY format
    }

    setPaymentForm(prev => ({
      ...prev,
      [name]: formattedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };



  const validateForm = () => {
    const newErrors = {};

    if (!paymentForm.nameOnCard.trim()) {
      newErrors.nameOnCard = "Please enter cardholder name";
    }

    if (!paymentForm.cardNumber || paymentForm.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number";
    }

    if (!paymentForm.expirationDate || !/^\d{2}\/\d{2}$/.test(paymentForm.expirationDate)) {
      newErrors.expirationDate = "Please enter expiration date in MM/YY format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Store current guest's payment info
      const currentPayment = {
        guestIndex,
        selectedItems,
        totalAmount,
        paymentMethod: `**** **** **** ${paymentForm.cardNumber.slice(-4)}`,
        transactionId: Math.random().toString(36).substr(2, 9).toUpperCase(),
      };

      // Check if there are more guests to process
      const nextGuestIndex = guestIndex + 1;
      
      if (nextGuestIndex < guestCount) {
        // More guests remaining - go to next guest's item selection
        navigate(`/table/${tableNumber}/select-items`, {
          state: {
            guestCount,
            guestIndex: nextGuestIndex,
            completedPayments: location.state?.completedPayments ? 
              [...location.state.completedPayments, currentPayment] : 
              [currentPayment]
          },
        });
      } else {
        // All guests have completed - go to receipt page
        const allPayments = location.state?.completedPayments ? 
          [...location.state.completedPayments, currentPayment] : 
          [currentPayment];
          
        navigate(`/table/${tableNumber}/receipt`, {
          state: {
            allPayments,
            guestCount,
            isCustomSplit: true,
            totalBill: allPayments.reduce((sum, payment) => sum + payment.totalAmount, 0),
          },
        });
      }
    }, 2000);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!selectedItems) {
    return (
      <div className="error-container">
        <p>No items selected. Please go back and select items first.</p>
        <button onClick={() => navigate(`/table/${tableNumber}/select-items`)}>
          Back to Item Selection
        </button>
      </div>
    );
  }

  return (
    <div className="custom-split-payment-page">
      <div className="payment-container">
        <header className="payment-header">
          <div className="logo-container">
            <img
              src="/ezsplit-logo.jpg"
              alt="EZSplit Logo"
              className="logo"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
          <h1 className="tagline">Making Dining Fun!</h1>
          <h2 className="payment-title">Custom Split Payment</h2>
          <p className="table-info">
            Table #{tableNumber} — Guest {guestIndex + 1} of {guestCount}
          </p>
        </header>

        <main className="payment-main">
          <div className="payment-content">
            {/* Order Summary */}
            <div className="order-summary">
              <h3>Your Selected Items</h3>
              <div className="selected-items-list">
                {selectedItems.map((item, index) => (
                  <div key={index} className="summary-item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="total-amount">
                <strong>Total: ${totalAmount.toFixed(2)}</strong>
              </div>
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
                  value={paymentForm.nameOnCard}
                  onChange={handleInputChange}
                  placeholder="Enter cardholder name"
                  className={errors.nameOnCard ? "error" : ""}
                  required
                />
                {errors.nameOnCard && <span className="error-message">{errors.nameOnCard}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="cardNumber" className="form-label">
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  name="cardNumber"
                  value={paymentForm.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="23"
                  className={errors.cardNumber ? "error" : ""}
                  required
                />
                {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="expirationDate" className="form-label">
                  Expiration Date
                </label>
                <input
                  id="expirationDate"
                  type="text"
                  name="expirationDate"
                  value={paymentForm.expirationDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  className={errors.expirationDate ? "error" : ""}
                  required
                />
                {errors.expirationDate && <span className="error-message">{errors.expirationDate}</span>}
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleBack}
                  className="back-button"
                  disabled={isProcessing}
                >
                  ← Back to Items
                </button>
                
                <button
                  type="submit"
                  className="submit-payment-button"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomSplitPaymentPage;
