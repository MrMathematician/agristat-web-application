const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable or fallback to port 3000

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'pub')));

// Route for the home page (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pub', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});