const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const host = '0.0.0.0';


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve HTML, CSS, and JS files from the public folder

// Sample user data (temporary in-memory storage)
const users = {};

// User login endpoint
app.post('/login', (req, res) => { // THIS WILL REQUIRE A DATABASE
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

// User sign-up endpoint
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    res.json({ success: false, message: 'Username already exists' });
  } else {
    users[username] = password; // Store user credentials
    res.json({ success: true, message: 'Sign-up successful' });
  }
});

// AI prediction endpoint (placeholder for Google Cloud integration)
app.get('/predict', (req, res) => { // THESE NUMBERS WILL VARY BASED ON THE MODEL
  const prediction = {
    humidity: '60%',
    temperature: '30°C',
    pressure: '1012 hPa',
    moisture: '70%',
    wind_speed: '15 km/h',
  };
  res.json(prediction);
});

// Default route to serve the main page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // Serve index.html
});

// Route to serve the farm information page
app.get('/farm-info', (req, res) => {
  res.sendFile(__dirname + '/public/farm-info.html');
});

// Route to serve the contact page
app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/public/contact.html');
});

// Route to serve the about page
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/public/about.html');
});

// Route to serve the sign-up page
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});

// Route to serve the dashboard page
app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/public/dashboard.html');
});

// Start server
app.listen(port, host, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
