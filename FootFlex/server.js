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
app.use(express.json()); // To parse JSON bodies

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// POST a new user
app.post('/users', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required.' });
  }

  if (users.some(user => user.username === username || user.email === email)) {
    return res.status(400).json({ error: 'Username or email already exists.' });
  }

  const newUser = { username, email, password };
  users.push(newUser);

  // Save users to the file
  try {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    res.json({ message: 'User added successfully.', user: newUser });
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ error: 'An error occurred while saving the user.' });
  }
});


// PUT to update a user
app.put('/users/:username', (req, res) => {
  const { username } = req.params;
  const { email, password } = req.body;

  const user = users.find(user => user.username === username);

  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  if (email) user.email = email;
  if (password) user.password = password;

  // Save users to the file
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.json({ message: 'User updated successfully.', user });
});

// DELETE a user
app.delete('/users/:username', (req, res) => {
  const { username } = req.params;

  const userIndex = users.findIndex(user => user.username === username);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found.' });
  }

  users.splice(userIndex, 1);

  // Save users to the file
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.json({ message: 'User deleted successfully.' });
});

// Basic login
app.get('/login', (req, res) => {
  const { username, password } = req.query;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    res.json({ success: true, message: 'Login successful.' });
  } else {
    res.status(401).json({ success: false, error: 'Invalid username or password.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
