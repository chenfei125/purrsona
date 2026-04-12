import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const StripePayment = ({ resultId, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // 创建 Checkout Session
      const response = await fetch(`${API_BASE_URL}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resultId }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // 跳转到 Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      console.error('Stripe payment error:', err);
      setError(err.message);
      onError?.(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stripe-payment">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="stripe-pay-button"
        style={{
          background: '#635BFF',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? (
          'Processing...'
        ) : (
          <>
            <span>💳</span>
            <span>Pay with Card (Stripe)</span>
          </>
        )}
      </button>

      {error && (
        <div style={{ color: '#e74c3c', marginTop: '12px', fontSize: '14px' }}>
          {error}
        </div>
      )}

      <div style={{ 
        marginTop: '16px', 
        fontSize: '12px', 
        color: '#666',
        textAlign: 'center'
      }}>
        Secure payment powered by Stripe
      </div>
    </div>
  );
};

export default StripePayment;
