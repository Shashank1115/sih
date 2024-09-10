const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/message', (req, res) => {
  const { message } = req.body;
  // Perform any processing, like fetching a reply
  const reply = `You said: ${message}`;
  res.json({ reply });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
