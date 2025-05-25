import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.split(' ')[1];
  if (token == null || undefined) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403);
    req.user = user;
    next();
  });
};

export default authMiddleware;
