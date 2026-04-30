const express = require('express');
const { add, subtract, multiply, divide } = require('./calculator');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.post('/calculate', (req, res) => {
  const { operation, a, b } = req.body;
  const ops = { add, subtract, multiply, divide };
  if (!ops[operation]) return res.status(400).json({ error: 'Unknown operation' });
  try {
    res.json({ result: ops[operation](a, b) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
