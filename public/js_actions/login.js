const {connection} = require("../../server.js");





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





// user login function
function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  if(username === ""){
    alert("Please enter your email!");
  }
  if(password === ""){
    alert("Please enter your password!");
  }

  if(checkUsernameExists(username) && checkPasswordCorrect(password)){
    // PERFORM ACTION
    alert("Logged In successfully!");
  }
  else if(checkUsernameExists(username) && !checkPasswordCorrect(password)){
    alert("Password Incorrect!");
  }
}





// event action

