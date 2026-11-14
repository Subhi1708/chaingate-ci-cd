const express = require('express');
const cors = require('cors');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
const gateRoutes = require('../routes/gate');

app.use('/gate', gateRoutes);

// ✅ Health check (IMPORTANT)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ✅ Test route (optional)
app.get('/', (req, res) => {
  res.send("ChainGate Backend Running ✅");
});

// ✅ Start server
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get('/health', (req, res) => {
  res.send('OK');
});
