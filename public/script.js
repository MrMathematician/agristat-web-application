const {createUserstable} = require("../server.js");
const {connection} = require("../server.js");





const farmData = {
  labels: ["Soil Moisture", "Temperature", "Crop Growth"],
  datasets: [{
    label: 'Farm Data',
    data: [70, 30, 90],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
  }]
};

// Display farm data in charts
function loadFarmDataChart() {
  const ctx = document.getElementById('farmChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: farmData,
  });
  // LOAD FROM DATABASE
}

// Simulate requesting a farm plan
function requestPlan() {
  // USE NODE MAILER
  alert('Farm plan requested successfully!');
}

// Show weather prediction based on month selection
function showWeatherPrediction() {
  /*
  const month = document.getElementById('monthSelect').value;
  if (month) {
    document.getElementById('weatherResult').innerHTML = `Weather prediction for ${month}: Sunny`;
  }
  */
  //  
}

// Show login form
function showLogin() {
  document.getElementById('loginForm').style.display = 'block';
}

// Close login form
function closeLogin() {
  document.getElementById('loginForm').style.display = 'none';
}

// Show sign-up form
function showSignup() {
  document.getElementById('signupForm').style.display = 'block';
}


function closeSignup() {
  document.getElementById('signupForm').style.display = 'none';
}





function checkUsernameExists(username){
  const query = 'SELECT COUNT(*) AS count FROM Users WHERE email = ?';
  connection.query(query, [username], (error, results) => {
    if(error){
      console.error('Error executing query: ', error);
      alert("checkUsernameExists went wrong!");
      return;
    }
    const userExists = results[0].count > 0 ? 1 : 0; // CHECK IF NUMBER OF USERS IS GREATER THAN zero

    if(userExists){
      return 1;
    }
    else{
      alert("User doesn't exist!") ;
      return 0;
    }
  });
}

function checkPasswordCorrect(username, password){
  const query = `SELECT password FROM Users WHERE username = ?`;
  connection.query(query, [username], function(error, results) {
    if (error) {
      console.error('Error executing query: ', error);
      return;
    }
    if (results.length > 0) {
      // Compare the input password with the stored plain text password
      const storedPassword = results[0].password;
      const userExists = (password === storedPassword) ? 1 : 0;
      return userExists;

    } else {
      alert("Password is incorrect!");
      return 0;
    }
  });
}





// Handle user login
function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  if(username === ""){
    alert("Please enter your email")
  }
  if(password === ""){

  }

  if(checkUsernameExists(username) && checkPasswordCorrect(password)){
    // PERFORM ACTION
    alert("Logged In successfully!");
  }
  else if(checkUsernameExists(username) && !checkPasswordCorrect(password)){
    alert("Password Incorrect!");
  }
}





// Initialize chart on page load
window.onload = function() {
  loadFarmDataChart();
};
