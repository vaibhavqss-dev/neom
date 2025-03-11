import React, { useState, useEffect } from "react";
import "./Checkout.scss";
import { NavLink } from "react-router-dom";
import neom from "../../assets/img/neom.png";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutForm: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTransactionComplete, setIsTransactionComplete] = useState(false);
  const [isPaymentFailed, setIsPaymentFailed] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const transactionAmount = 500;
  const platformFee = 0;
  const bankCharges = 1000;
  const totalAmount = transactionAmount + bankCharges;

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      setIsRazorpayLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!window.Razorpay || !isRazorpayLoaded) {
      setPaymentError("Razorpay is not loaded yet. Please try again.");
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);
    setIsPaymentFailed(false);

    try {
      // Demo account details
      const options = {
        key: "rzp_test_1DP5mmOlF5G5ag", // This is a test key
        amount: totalAmount * 100, // Amount in paisa
        currency: "INR",
        name: "NEOM Experiences",
        description: "Experience Payment",
        image: neom,
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#0a7d8c",
        },
        handler: function (response: any) {
          // This function is called when payment is successful
          console.log("Payment successful", response);
          setIsProcessing(false);
          setIsTransactionComplete(true);
          setIsPaymentFailed(false);
        },
        modal: {
          ondismiss: function () {
            console.log("Payment modal closed");
            setIsProcessing(false);
            setIsPaymentFailed(true);
            setPaymentError("Payment was cancelled");
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response: any) {
        setIsProcessing(false);
        setIsPaymentFailed(true);
        setPaymentError(response.error.description || "Payment failed");
      });

      rzp.open();
    } catch (error) {
      setIsProcessing(false);
      setIsPaymentFailed(true);
      setPaymentError(
        error instanceof Error ? error.message : "Payment initialization failed"
      );
      console.error("Payment error:", error);
    }
  };

  const retryPayment = () => {
    setIsPaymentFailed(false);
    setPaymentError(null);
    handlePayment();
  };

  // Initial checkout view
  const renderCheckoutView = () => (
    <>
      <h2 className="checkout-title">Complete Your Payment</h2>
      <div className="checkoutBankName">
        <p className="checkoutBankName_title">Razorpay Payment</p>
        <p className="checkoutBankName_value">Secure Payment Processing</p>
      </div>
      <div className="transaction-details">
        <div className="detail-row">
          <span className="detail-label">Experience Fee:</span>
          <span className="detail-value">₹{transactionAmount}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">NEOM Platform Fee:</span>
          <span className="detail-value">₹{platformFee}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Payment Processing Fee:</span>
          <span className="detail-value">₹{bankCharges}</span>
        </div>
        <hr className="divider" />
        <div className="detail-row total">
          <span className="detail-label">Total Amount:</span>
          <span className="detail-value">₹{totalAmount}</span>
        </div>
      </div>

      <div className="payment-form">
        {paymentError && !isPaymentFailed && (
          <div className="error-message">{paymentError}</div>
        )}

        <button
          onClick={handlePayment}
          disabled={isProcessing || !isRazorpayLoaded}
          className="pay-button"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>

        <p className="secure-note">
          Payments are securely processed through Razorpay. Your payment details
          are protected by industry-standard encryption.
        </p>
      </div>
    </>
  );

  // Success view
  const renderSuccessView = () => (
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
  );

  // Failure view
  const renderFailureView = () => (
    <div className="confirmation failure">
      <div className="confirmation-icon failure-icon">✕</div>
      <h2 className="confirmation-title failure-title">Payment Failed</h2>
      <p className="confirmation-message failure-message">
        {paymentError || "Your payment couldn't be processed."}
      </p>
      <div className="confirmation-details">
        <p>Please try again or use a different payment method.</p>
        <p>No amount has been deducted from your account.</p>
      </div>

      <div className="action-buttons">
        <button onClick={retryPayment} className="retry-button">
          Retry Payment
        </button>
        <NavLink to={"/event-details"} className="cancel-button">
          Cancel
        </NavLink>
      </div>
    </div>
  );

  return (
    <div className="checkout-card">
      <div className="card-header">
        <img
          style={{ width: "3rem" }}
          src={neom}
          alt="NEOM"
          className="neom-image"
        />
        <div className="security-badge">
          <i className="security-icon">🔒</i>
          <span>Secure Transaction</span>
        </div>
      </div>

      {isTransactionComplete
        ? renderSuccessView()
        : isPaymentFailed
        ? renderFailureView()
        : renderCheckoutView()}
    </div>
  );
};

const Checkout: React.FC = () => {
  return (
    <div className="checkout-container">
      <CheckoutForm />
    </div>
  );
};

export default Checkout;
