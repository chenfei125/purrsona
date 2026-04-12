require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3001;
const PAYPAL_BASE_URL = process.env.PAYPAL_BASE_URL || 'https://api-m.sandbox.paypal.com';
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;

// 支持多域名 CORS
const getAllowedOrigins = () => {
  const envOrigins = process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL || '';
  return envOrigins.split(',').map(o => o.trim()).filter(Boolean);
};

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5174';

// ─── Middleware ───────────────────────────────────────────────────────────────
// 打印请求来源日志
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} | Origin: ${req.headers.origin || 'none'}`);
  next();
});

// CORS 配置：支持多域名 + Vercel 预览域名
const corsOptions = {
  origin: function (origin, callback) {
    // 允许无 origin 的请求（如 Postman、本地 curl）
    if (!origin) return callback(null, true);
    
    const allowedOrigins = getAllowedOrigins();
    
    // 检查精确匹配
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // 允许所有 Vercel 预览域名 (purrsona-*.vercel.app)
    if (origin.match(/^https:\/\/purrsona-[a-z0-9-]+\.vercel\.app$/)) {
      return callback(null, true);
    }
    
    console.warn(`[CORS] Blocked origin: ${origin}`);
    callback(new Error(`CORS not allowed for: ${origin}`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// 显式处理 OPTIONS 预检请求 - 使用具体路径
app.options('/api/stripe/create-checkout-session', cors(corsOptions));
app.options('/api/stripe/verify-session/:sessionId', cors(corsOptions));

app.use(express.json());

// ─── PayPal Helper ────────────────────────────────────────────────────────────

/**
 * 获取 PayPal access token（每次请求都重新获取，简单可靠）
 */
async function getPayPalAccessToken() {
  const credentials = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');

  const res = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to get PayPal access token: ${err}`);
  }

  const data = await res.json();
  return data.access_token;
}

// ─── Routes ───────────────────────────────────────────────────────────────────

// 1. 健康检查
app.get('/api/health', (req, res) => {
  res.json({ 
    ok: true, 
    env: PAYPAL_BASE_URL.includes('sandbox') ? 'sandbox' : 'live',
    stripe: STRIPE_PUBLISHABLE_KEY ? 'configured' : 'not configured'
  });
});

// ─── Stripe Routes ────────────────────────────────────────────────────────────

// 获取 Stripe Publishable Key
app.get('/api/stripe/config', (req, res) => {
  res.json({ publishableKey: STRIPE_PUBLISHABLE_KEY });
});

// 创建 Stripe Checkout Session
app.post('/api/stripe/create-checkout-session', async (req, res) => {
  const { resultId } = req.body;

  if (!resultId) {
    return res.status(400).json({ success: false, error: 'resultId is required' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Purrsona Full Cat Report',
              description: 'Complete personality analysis for your cat',
            },
            unit_amount: 199, // $1.99 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${FRONTEND_URL}/results?resultId=${resultId}&payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/results?resultId=${resultId}&payment=cancelled`,
      metadata: {
        resultId: resultId,
      },
    });

    console.log(`[stripe-create-session] resultId=${resultId} sessionId=${session.id}`);
    return res.json({ success: true, sessionId: session.id, url: session.url });
  } catch (err) {
    console.error('[stripe-create-session] error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 验证 Stripe Checkout Session
app.get('/api/stripe/verify-session/:sessionId', async (req, res) => {
  const { sessionId } = req.params;

  if (!sessionId) {
    return res.status(400).json({ success: false, error: 'sessionId is required' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    console.log(`[stripe-verify-session] sessionId=${sessionId} status=${session.payment_status}`);
    
    if (session.payment_status === 'paid') {
      return res.json({
        success: true,
        paid: true,
        resultId: session.metadata.resultId,
        sessionId: session.id,
        amount: session.amount_total,
      });
    } else {
      return res.json({
        success: true,
        paid: false,
        status: session.payment_status,
      });
    }
  } catch (err) {
    console.error('[stripe-verify-session] error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 1.5 获取订单详情（包含审批链接，用于测试）
app.get('/api/paypal/order/:orderId', async (req, res) => {
  const { orderId } = req.params;
  if (!orderId) {
    return res.status(400).json({ success: false, error: 'orderId is required' });
  }

  try {
    const accessToken = await getPayPalAccessToken();
    const res2 = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res2.ok) {
      const err = await res2.text();
      throw new Error(`Failed to get order: ${err}`);
    }

    const order = await res2.json();
    return res.json({ success: true, order });
  } catch (err) {
    console.error('[get-order] error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 2. 创建订单
app.post('/api/paypal/create-order', async (req, res) => {
  const { resultId } = req.body;

  if (!resultId) {
    return res.status(400).json({ success: false, error: 'resultId is required' });
  }

  try {
    const accessToken = await getPayPalAccessToken();

    const orderPayload = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: resultId,           // 绑定报告 ID，capture 时可追溯
          description: 'Purrsona Full Cat Report',
          amount: {
            currency_code: 'USD',
            value: '1.99',
          },
        },
      ],
    };

    const res2 = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderPayload),
    });

    if (!res2.ok) {
      const err = await res2.text();
      throw new Error(`PayPal create order failed: ${err}`);
    }

    const order = await res2.json();
    console.log(`[create-order] resultId=${resultId} orderID=${order.id}`);

    return res.json({ success: true, orderID: order.id });
  } catch (err) {
    console.error('[create-order] error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 3. 捕获订单
app.post('/api/paypal/capture-order', async (req, res) => {
  const { orderID, resultId } = req.body;

  if (!orderID || !resultId) {
    return res.status(400).json({ success: false, error: 'orderID and resultId are required' });
  }

  try {
    const accessToken = await getPayPalAccessToken();

    const res2 = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res2.ok) {
      const err = await res2.text();
      throw new Error(`PayPal capture failed: ${err}`);
    }

    const capture = await res2.json();
    console.log(`[capture-order] orderID=${orderID} status=${capture.status}`);

    // 只有 COMPLETED 才算成功
    if (capture.status === 'COMPLETED') {
      return res.json({
        success: true,
        paid: true,
        resultId,
        orderID,
        captureStatus: capture.status,
      });
    } else {
      return res.status(402).json({
        success: false,
        paid: false,
        error: `Capture status: ${capture.status}`,
        captureStatus: capture.status,
      });
    }
  } catch (err) {
    console.error('[capture-order] error:', err.message);
    return res.status(500).json({ success: false, paid: false, error: err.message });
  }
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Purrsona backend running on http://localhost:${PORT}`);
  console.log(`   PayPal env: ${PAYPAL_BASE_URL.includes('sandbox') ? '🟡 Sandbox' : '🟢 Live'}`);
});
