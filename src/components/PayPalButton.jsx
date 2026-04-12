import React, { useEffect, useRef, useState } from 'react';
import { getLang } from '../i18n';
import { unlockReport } from '../utils/reportStorage';

// PayPal SDK URL：根据环境变量加载
// Sandbox: https://www.sandbox.com/sdk/js
// Live:   https://www.paypal.com/sdk/js
const getPayPalSDKUrl = (clientId) => {
  // 从环境变量读取，默认为 sandbox
  const base = import.meta.env.VITE_PAYPAL_SDK_URL || 'https://www.paypal.com/sdk/js';
  return `${base}?client-id=${clientId}&currency=USD&components=buttons`;
};

const PayPalButton = ({ resultId, onSuccess }) => {
  const containerRef = useRef(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paypalError, setPaypalError] = useState('');
  const lang = getLang();

  useEffect(() => {
    if (!resultId) return;

    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
    if (!clientId) {
      setPaypalError('PayPal Client ID not configured');
      return;
    }

    // 动态加载 PayPal SDK（只加载一次）
    if (window.paypal) {
      setSdkReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = getPayPalSDKUrl(clientId);
    script.onload = () => setSdkReady(true);
    script.onerror = () => setPaypalError('Failed to load PayPal SDK');
    document.body.appendChild(script);

    return () => {
      // 清理 script 标签
    };
  }, [resultId]);

  useEffect(() => {
    if (!sdkReady || !resultId || !containerRef.current) return;

    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
    
    // 调试：打印 API 地址
    console.log('[PayPal] API Base:', apiBase);
    console.log('[PayPal] ResultId:', resultId);

    const renderButton = () => {
      if (!window.paypal || !containerRef.current) return;

      // 防止重复渲染
      if (containerRef.current.querySelector('.paypal-button-container')) return;

      window.paypal
        .Buttons({
          style: {
            layout: 'horizontal',
            color: 'gold',
            shape: 'rect',
            label: 'pay',
            height: 48,
            width: 250,
          },

          // 1. 创建订单
          async createOrder() {
            setProcessing(true);
            setPaypalError('');
            try {
              const res = await fetch(`${apiBase}/api/paypal/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resultId }),
              });
              const data = await res.json();
              if (!res.ok || !data.success) {
                throw new Error(data.error || 'Failed to create order');
              }
              return data.orderID;
            } catch (err) {
              setProcessing(false);
              throw err;
            }
          },

          // 2. 用户批准后，捕获订单
          async onApprove(data) {
            try {
              const res = await fetch(`${apiBase}/api/paypal/capture-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderID: data.orderID, resultId }),
              });
              const json = await res.json();

              if (res.ok && json.success && json.paid) {
                unlockReport(resultId);
                setProcessing(false);
                onSuccess?.();
                return;
              }

              setProcessing(false);
              setPaypalError(
                lang === 'zh'
                  ? '支付未完成，请重试。'
                  : 'Payment was not completed. Please try again.'
              );
            } catch (err) {
              setProcessing(false);
              setPaypalError(
                lang === 'zh'
                  ? '支付处理出错，请重试。'
                  : 'Payment processing error. Please try again.'
              );
            }
          },

          onError(err) {
            setProcessing(false);
            setPaypalError(
              lang === 'zh'
                ? '支付出错，请重试。'
                : 'Payment error. Please try again.'
            );
          },

          onCancel() {
            setProcessing(false);
          },
        })
        .render(containerRef.current);
    };

    // 延迟渲染，等待 SDK 就绪
    const timer = setTimeout(renderButton, 100);
    return () => clearTimeout(timer);
  }, [sdkReady, resultId, lang]);

  // 环境未配置提示
  if (paypalError && paypalError.includes('not configured')) {
    return (
      <div style={{ textAlign: 'center', padding: '10px 0', color: '#d97706', fontSize: '0.9rem' }}>
        ⚠️ {lang === 'zh' ? 'PayPal 支付未配置（请设置 VITE_PAYPAL_CLIENT_ID）' : 'PayPal not configured (set VITE_PAYPAL_CLIENT_ID)'}
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Processing 遮罩 */}
      {processing && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(255,255,255,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '12px',
          zIndex: 10,
        }}>
          <span style={{ color: '#7c3aed', fontWeight: 600, fontSize: '1rem' }}>
            ⏳ {lang === 'zh' ? '支付处理中...' : 'Processing payment...'}
          </span>
        </div>
      )}

      {/* PayPal 按钮容器 */}
      <div
        ref={containerRef}
        style={{ minHeight: '48px', position: 'relative', display: 'flex', justifyContent: 'center' }}
      />

      {/* 错误提示 */}
      {paypalError && !paypalError.includes('not configured') && (
        <p style={{
          color: '#dc2626',
          textAlign: 'center',
          marginTop: '10px',
          fontSize: '0.9rem',
          fontWeight: 500,
        }}>
          {paypalError}
        </p>
      )}
    </div>
  );
};

export default PayPalButton;
