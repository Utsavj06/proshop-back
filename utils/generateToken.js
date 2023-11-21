import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Set JWT as an HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: false,
    // domain: 'http://localhost:3000',
    secure: false, //process.env.NODE_ENV === 'development', // Use secure cookies in production
    // sameSite: 'Lax', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  // return token;
};

export default generateToken;