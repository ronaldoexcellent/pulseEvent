const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  // Pull the token from the cookie
  const token = req.cookies.token;

//   console.log("Cookies received:", req.cookies);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user info to the request object so routes can use it
    req.user = decoded; 
    next(); // Move to the next middleware or route
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

module.exports = { requireAuth };