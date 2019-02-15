async function login(event) {
    event.preventDefault(); // prevent default form submission
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const credentials = {
      username, // username: value of the variable
      password
    }
  
    const res = await fetch('http://localhost:3300/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
  
    if (res.status === 200) {
      window.location = '../home/welcome.html';
    } else {
      console.log('Login Failed');
      document.getElementById('inputPassword').value = '';
      document.getElementById('error-message').innerText = 'Failed to Login';
    }}