import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY;
const refreshKey = process.env.JWT_REFRESH_KEY;

// membuat token
export const createToken = (admin) => {
  return jwt.sign({ name: admin.name, username: admin.username }, secretKey, { expiresIn: '15m' });
}

// membuat refresh token
export const createRefreshToken = (admin) => {
  return jwt.sign({ name: admin.name, email: admin.email }, refreshKey, { expiresIn: '7d' });
}