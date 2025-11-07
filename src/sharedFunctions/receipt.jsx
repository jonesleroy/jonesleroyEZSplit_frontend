import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';

const ReceiptPage = () => {
  const { tableNumber } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get payment data from location state
  const { allPayments, guestCount, isCustomSplit, totalBill } = location.state || {};
  
  // State for receipt delivery method
  const [receiptMethod, setReceiptMethod] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  
  // Handle receipt method selection
  const handleMethodChange = (method) => {
    setReceiptMethod(method);
    setContactInfo(''); // Clear contact info when method changes
  };
  
  // Handle contact info input
  const handleContactInfoChange = (e) => {
    setContactInfo(e.target.value);
  };
  
  // Validate phone number format (basic validation)
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
  };
  
  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (receiptMethod === 'text') {
      if (!contactInfo || !validatePhoneNumber(contactInfo)) {
        alert('Please enter a valid phone number.');
        return;
      }
      console.log('Sending receipt via text to:', contactInfo);
    } else if (receiptMethod === 'email') {
      if (!contactInfo || !validateEmail(contactInfo)) {
        alert('Please enter a valid email address.');
        return;
      }
      console.log('Sending receipt via email to:', contactInfo);
    }
    
    // Navigate to Thank You page after processing receipt request
    navigate(`/table/${tableNumber}/thank-you`);
  };

  return (
    <div className="receipt-container">
      {/* Header with Logo and Tagline */}
      <header className="receipt-header">
        <div className="logo-container">
          <img 
            src="/ezsplit-logo.jpg" 
            alt="EZSplit Logo" 
            className="logo"
          />
        </div>
        <h1 className="tagline">Making Dinning Fun</h1>
        <p className="table-info">Table #{tableNumber}</p>
      </header>

      {/* Main Content */}
      <main className="receipt-main">
        <div className="receipt-section">
          <h2>Payment Successful!</h2>
          <p className="success-message">
            {isCustomSplit && allPayments ? 
              `All ${guestCount} guests have completed their payments successfully.` :
              'Your payment has been processed successfully.'
            }
          </p>
          
          {/* Payment Summary for Custom Split */}
          {isCustomSplit && allPayments && (
            <div className="payment-summary">
              <h3>Payment Summary</h3>
              <div className="guest-payments">
                {allPayments.map((payment, index) => (
                  <div key={index} className="guest-payment">
                    <h4>Guest {payment.guestIndex + 1}</h4>
                    <div className="payment-details">
                      <div className="selected-items">
                        {payment.selectedItems.map((item, itemIndex) => (
                          <div key={itemIndex} className="item-row">
                            <span className="item-name">{item.name}</span>
                            <span className="item-price">${item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="payment-total">
                        <strong>Total: ${payment.totalAmount.toFixed(2)}</strong>
                      </div>
                      <div className="payment-method">
                        Card: {payment.paymentMethod}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grand-total">
                <h3>Grand Total: ${totalBill ? totalBill.toFixed(2) : '0.00'}</h3>
              </div>
            </div>
          )}
          
          {/* Receipt Options */}
          <div className="receipt-options">
            <h3>Would you like a receipt?</h3>
            
            <form onSubmit={handleSubmit} className="receipt-form">
              {/* Text Receipt Option */}
              <div className="receipt-option">
                <input
                  type="radio"
                  id="text-receipt"
                  name="receiptMethod"
                  value="text"
                  checked={receiptMethod === 'text'}
                  onChange={() => handleMethodChange('text')}
                  className="receipt-radio"
                />
                <label htmlFor="text-receipt" className="receipt-label">
                  📱 Text Receipt
                </label>
                {receiptMethod === 'text' && (
                  <div className="contact-input-group">
                    <input
                      type="tel"
                      value={contactInfo}
                      onChange={handleContactInfoChange}
                      placeholder="Enter your phone number"
                      className="contact-input"
                      required
                    />
                  </div>
                )}
              </div>

              {/* Email Receipt Option */}
              <div className="receipt-option">
                <input
                  type="radio"
                  id="email-receipt"
                  name="receiptMethod"
                  value="email"
                  checked={receiptMethod === 'email'}
                  onChange={() => handleMethodChange('email')}
                  className="receipt-radio"
                />
                <label htmlFor="email-receipt" className="receipt-label">
                  📧 Email Receipt
                </label>
                {receiptMethod === 'email' && (
                  <div className="contact-input-group">
                    <input
                      type="email"
                      value={contactInfo}
                      onChange={handleContactInfoChange}
                      placeholder="Enter your email address"
                      className="contact-input"
                      required
                    />
                  </div>
                )}
              </div>

              {/* No Receipt Option */}
              <div className="receipt-option">
                <input
                  type="radio"
                  id="no-receipt"
                  name="receiptMethod"
                  value="none"
                  checked={receiptMethod === 'none'}
                  onChange={() => handleMethodChange('none')}
                  className="receipt-radio"
                />
                <label htmlFor="no-receipt" className="receipt-label">
                  🚫 No Receipt Needed
                </label>
              </div>

              {/* Submit Button - Show only when an option is selected */}
              {receiptMethod && (
                <button type="submit" className="receipt-submit-button">
                  {receiptMethod === 'none' ? 'Continue' : 'Send Receipt'}
                </button>
              )}
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="receipt-footer">
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

export default ReceiptPage;
