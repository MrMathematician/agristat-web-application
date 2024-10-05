







// COMPLETELY USELESS
const farmData = {
  labels: ["Soil Moisture", "Temperature", "Crop Growth"],
  datasets: [{
    label: 'Farm Data',
    data: [70, 30, 90],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
  }]
};






// THIS CODE IS KEPT AS IT MIGHT BE NEEDED LATER 
function loadFarmDataChart() {
  const ctx = document.getElementById('farmChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: farmData,
  });
}



function showLogin() {
  document.getElementById('loginForm').style.display = 'block';
}

function closeLogin() {
  document.getElementById('loginForm').style.display = 'none';
}

function showSignup() {
  document.getElementById('signupForm').style.display = 'block';
}

function closeSignup() {
  document.getElementById('signupForm').style.display = 'none';
}



window.onload = function() {
  loadFarmDataChart();
};


// Smooth scrolling to sections
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Dialog box for "More Control" button
const infoDialog = document.getElementById('info-dialog');
const openDialogBtn = document.getElementById('open-more-control');
const closeDialogBtn = document.getElementById('close-dialog');

openDialogBtn.addEventListener('click', () => {
    infoDialog.showModal();
});

closeDialogBtn.addEventListener('click', () => {
    infoDialog.close();
});

