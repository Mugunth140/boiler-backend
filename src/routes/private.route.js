import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
const privateRouter = Router();

privateRouter.get('/', authMiddleware, (req, res) => {
  res.json({
    message: 'Private route',
  });
});

export default privateRouter;
