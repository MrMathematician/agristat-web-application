const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');









const app = express(); const port = 8080; const host = '0.0.0.0';


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









const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'MadMan',
  user: 'elshafei',
  password: '123456789',
  database: 'agrisat_db'
});

connection.connect((err) => {
  if (err) {
    console.error('SQL DATABASE FAILED TO CONNECT! REASON LISTED: \n', err);
    return;
  }
  console.log('DATABASE SUCCESSFULLY CONNECTED!');
});







const createUsersTable = 
`CREATE TABLE IF NOT EXISTS Users (
    chipID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);
`;



const createJsonDataTable = 
`
CREATE TABLE IF NOT EXISTS UserJsonData (
    chipID INT PRIMARY KEY,
    jsonData1 JSON,
    jsonData2 JSON,
    jsonData3 JSON,
    jsonData4 JSON,
    jsonData5 JSON,
    jsonData6 JSON,
    jsonData7 JSON,
    jsonData8 JSON,
    jsonData9 JSON,
    jsonData10 JSON,
    jsonData11 JSON,
    jsonData12 JSON,
    jsonData13 JSON,
    jsonData14 JSON,
    jsonData15 JSON,
    jsonData16 JSON,
    jsonData17 JSON,
    jsonData18 JSON,
    jsonData19 JSON,
    jsonData20 JSON,
    jsonData21 JSON,
    jsonData22 JSON,
    jsonData23 JSON,
    jsonData24 JSON,
    jsonData25 JSON,
    jsonData26 JSON,
    jsonData27 JSON,
    jsonData28 JSON,
    jsonData29 JSON,
    jsonData30 JSON,
    FOREIGN KEY (chipID) REFERENCES Users(chipID)
);`;





connection.query(createUsersTable, (err, results) => {
  if (err) {
    console.error('Error creating users table:', err);
    return;
  }
  console.log('Users table created successfully');
});



connection.query(createJsonDataTable, (err, results) => {
  if (err) {
    console.error('Error creating users table:', err);
    return;
  }
  console.log('Users table created successfully');
});

let temp_min = 100000;
let temp_max = -100000;

// FOR TESTING
let jsonPackets = [];

const { spawn } = require('child_process');
const json = require('body-parser/lib/types/json');



const pythonProcess1 = spawn('python3', ['./model_runner.py', jsonPackets[0], jsonPackets[2], jsonPackets[1], jsonPackets[0], jsonPackets[0], jsonPackets[3], jsonPackets[4], 0, 0]);

pythonProcess1.stdout.on('data', (data) => {
    console.log(`Output: ${data}`);
});
pythonProcess1.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
});
pythonProcess1.on('close', (code) => {
    console.log(`Process exited with code ${code}`);
});





// RECEIVE JSON POST FROM ARDUINO
app.post('/upload-json', (req, res) => {
    const packet = req.body;

    // Extract values from the packet and store them as strings in jsonPackets
    const values = Object.values(packet).map(value => value.toString());
    jsonPackets.push(...values);

    // Save the packet to a JSON file
    const fileName = `packet_${Date.now()}.json`;
    fs.writeFileSync(fileName, JSON.stringify(packet, null, 2));

    res.send('POST request received and stored');
    displayRainfall();
    displayPlantDisease();
    displayVegetationHealth();
    displayFarmingSuitability();
});


/*
const filePath1 = './ml_models/rain_prediction_model.pkl';
const filePath2 = './ml_models/vegetation_health_model.pkl';
const filePath3 = './ml_models/suitable_for_farming_model.pkl';
const filePath4 = './ml_models/plant_disease.pkl';
*/

const filePath5 = './ml_models/rain_prediction_model.txt';
const filePath6 = './ml_models/vegetation_health_model.txt';
const filePath7 = './ml_models/suitable_for_farming_model.txt';
const filePath8 = './ml_models/plant_disease.txt';


document.getElementById("RAIN").innerText = "It won't rain soon!";
document.getElementById("SUIT").innerText = "The conditions may not be ideal for farming at this time!";
document.getElementById("DISEASE").innerText = "Your plants are healthy and undiseased!";
document.getElementById("HEALTH").innerText = "Your plants are healthy and vegetated well!";

function displayRainfall(){
  fs.readFile(filePath5, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading the file:', err);
          return;
      }
      // Save the file contents into a variable
      const fileContents = data;
      if(fileContents == '0'){
        document.getElementById("RAIN").innerText = "It won't rain soon!";
      }
      else{
        document.getElementById("RAIN").innerText = "It is going to rain soon. You may consider utilizing the rain for natural irrigation!";
      }
      console.log('File contents:', fileContents);
  });
}

function displayFarmingSuitability(){
  fs.readFile(filePath6, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading the file:', err);
          return;
      }
      // Save the file contents into a variable
      const fileContents = data;
      if(fileContents == '0'){
        document.getElementById("SUIT").innerText = "The conditions may not be ideal for farming at this time!";
      }
      else{
        document.getElementById("SUIT").innerText = "The conditions are just right to start seeding!";
      }
      console.log('File contents:', fileContents);
  });
}

function displayPlantDisease(){
  fs.readFile(filePath7, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading the file:', err);
          return;
      }
      // Save the file contents into a variable
      const fileContents = data;
      if(fileContents == '0'){
        document.getElementById("DISEASE").innerText = "Your plants are healthy and undiseased!";
      }
      else if(fileContents == '1'){
        document.getElementById("DISEASE").innerText = "Please inspect your crops as soon as possible as they most likely suffer from a powdry disease!";
      }
      else{
        document.getElementById("DISEASE").innerText = "Please inspect your crops as soon as possible as they most likely suffer fom a rusty ddisease!";
      }
      console.log('File contents:', fileContents);
  });
}

function displayVegetationHealth(){
  fs.readFile(filePath8, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading the file:', err);
          return;
      }
      // Save the file contents into a variable
      const fileContents = data;
      if(fileContents == '0'){
        document.getElementById("HEALTH").innerText = "Your plants are healthy and vegetated well!";
      }
      else if(fileContents == '1'){
      document.getElementById("HEALTH").innerText = "Your plants may need better vegetation!";
      }
      console.log('File contents:', fileContents);
  });
}


