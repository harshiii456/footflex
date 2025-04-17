const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token
exports.authenticateToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];  // Extract the token from the Authorization header

  if (!token) return res.sendStatus(401);  // If no token, send Unauthorized status

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {  // Verify the token using the secret
    if (err) return res.sendStatus(403);  // If error, send Forbidden status
    req.user = user;  // Store the decoded user data in the request object
    next();  // Proceed to the next middleware or route handler
  });
};

// Middleware to check if user is an admin
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {  // Check if the user is an admin
    return next();  // If admin, proceed to the next middleware/route handler
  }
  return res.sendStatus(403);  // If not admin, send Forbidden status
};
