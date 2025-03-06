import React, { useState } from "react";
import "./Checkout.scss";
import { NavLink } from "react-router-dom";
import underwater from "../../assets/img/neom-underwater.jpg";
import neom from "../../assets/img/neom.png";

const Checkout: React.FC = () => {
  const [isTransactionComplete, setIsTransactionComplete] = useState(false);
  const transactionAmount = 500;
  const BankCharges = 1000;

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setIsTransactionComplete(true);
    }, 1000);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <div className="card-header">
          <img
            style={{ width: "3rem" }}
            src={neom}
            alt="NEOM Underwater"
            className="neom-image"
          />
          <div className="security-badge">
            <i className="security-icon">🔒</i>
            <span>Secure Transaction</span>
          </div>
        </div>

        {!isTransactionComplete ? (
          <>
            <h2 className="checkout-title">Vaibhav Payment Gateway
            </h2>
            <div className="checkoutBankName">
              <p className="checkoutBankName_title">Vaibhav Bank</p>
              <p className="checkoutBankName_value">The Rick People Bank's</p>
            </div>
            <div className="transaction-details">
              <div className="detail-row">
                <span className="detail-label">Experience Fee:</span>
                <span className="detail-value">₹{transactionAmount}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">NEOM Platform Fee:</span>
                <span className="detail-value">₹0</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Bank Transaction Fee</span>
                <span className="detail-value">₹{BankCharges}</span>
              </div>
              <hr className="divider" />
              <div className="detail-row total">
                <span className="detail-label">Total Amount:</span>
                <span className="detail-value">
                  ₹{transactionAmount + BankCharges}
                </span>
              </div>
            </div>

            <div className="payment-section">
              <button className="pay-button" onClick={handlePayment}>
                Paisa do
              </button>
              <p className="secure-note">
                We Can use your data as we want, by using our services we
                deserve the right to use your money on our behalf.
              </p>
            </div>
          </>
        ) : (
          <div className="confirmation">
            <div className="confirmation-icon">✓</div>
            <h2 className="confirmation-title">Booking Confirmed!</h2>
            <p className="confirmation-message">
              Your NEOM experience has been scheduled successfully.
            </p>
            <div className="confirmation-details">
              <p>You will receive a confirmation notification shortly.</p>
              <p>Prepare for an extraordinary journey!</p>
            </div>

            <NavLink to={"/event-details"} className="back-home">
              Back to Home
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
