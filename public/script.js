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
}

// Simulate requesting a farm plan
function requestPlan() {
  alert('Farm plan requested successfully!');
}

// Show weather prediction based on month selection
function showWeatherPrediction() {
  const month = document.getElementById('monthSelect').value;
  if (month) {
    document.getElementById('weatherResult').innerHTML = `Weather prediction for ${month}: Sunny`;
  }
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

// Close sign-up form
function closeSignup() {
  document.getElementById('signupForm').style.display = 'none';
}

// Handle user login
function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Login successful!');
        closeLogin();
      } else {
        alert('Invalid username or password.');
      }
    });
}

// Handle user sign-up
function signup() {
  const username = document.getElementById('signupUsername').value;
  const password = document.getElementById('signupPassword').value;

  fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Sign-up successful!');
        closeSignup();
      } else {
        alert('Username already exists.');
      }
    });
}

// Initialize chart on page load
window.onload = function() {
  loadFarmDataChart();
};
