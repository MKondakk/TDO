const express = require('express');
const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
  const currentDateTime = new Date();
  res.json({ datetime: currentDateTime.toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
