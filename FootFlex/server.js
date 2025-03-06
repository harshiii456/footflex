// server.js (Node.js with Express)
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// In-memory user storage (replace with a database in a real application)
let users = []; // Corrected line: Initialize as an empty array

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to retrieve a list of all users
app.get('/users', (req, res) => {
  res.json(users);
});

// API endpoint to add a new user (using query parameters)
app.get('/add-user', (req, res) => {
  const { username, email, password } = req.query;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required.' });
  }

  // Check if the username or email already exists
  if (users.some(user => user.username === username || user.email === email)) {
    return res.status(400).json({ error: 'Username or email already exists.' });
  }

  const newUser = {
    username,
    email,
    password,
  };

  users.push(newUser);
  res.json({ message: 'User added successfully.', user: newUser });
});

// Basic Login functionality (very insecure for production)
app.get('/login', (req, res) => {
  const { username, password } = req.query;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    res.json({ message: 'Login successful.', user: user });
  } else {
    res.status(401).json({ error: 'Invalid username or password.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});