const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json()); // لقراءة البيانات من body

// نقطة النهاية التي ستستقبل الكود
app.post('/oauth/token', async (req, res) => {
  const { code } = req.body; // الكود الذي أرسلناه من JavaScript في الصفحة

  try {
    // إرسال الكود إلى GHL أو PayTabs لتحويله إلى Access Token
    const response = await axios.post('https://services.leadconnectorhq.com/oauth/token', {
      client_id: '6819336b8469fa4b134e1c24-mabouuaq', // Client ID الخاص بك
      client_secret: 'e845e751-96ac-4bfd-b948-916d59695a07', // Client Secret الخاص بك
      grant_type: 'authorization_code',
      code: req.body.code, // الكود الذي استلمناه
      redirect_uri: 'https://www.funnelflake.com/oauthcallback-page' // نفس URL الذي استخدمته في إعدادات OAuth
    });

    // إرجاع الـ Access Token
    res.json({
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token
    });

  } catch (error) {
    console.error('Error during token exchange:', error);
    res.status(500).json({ error: 'An error occurred while exchanging the code for an access token' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
