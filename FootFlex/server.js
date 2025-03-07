const express = require('express');
const path = require('path');
const fs = require('fs');
const { console } = require('inspector');

const app = express();
const port = 3000;
const usersFile = 'users.json';

// Load users from file at startup
let users = [];
if (fs.existsSync(usersFile)) {
  users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/users', (req, res) => {
  res.json(users);
});

// API to add a user and save to file
app.get('/add-user', (req, res) => {
  const { username, email, password } = req.query;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required.' });
  }

  if (users.some(user => user.username === username || user.email === email)) {
    return res.status(400).json({ error: 'Username or email already exists.' });
  }

  const newUser = { username, email, password };
  users.push(newUser);

  // Save users to the file
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.json({ message: 'User added successfully.', user: newUser }); 
});

// Basic login
app.get('/login', (req, res) => {
  const { username, password } = req.query;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    res.json({ message: 'Login successful.', user });
  } else {
    res.status(401).json({ error: 'Invalid username or password.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
