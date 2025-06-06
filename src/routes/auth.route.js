import User from '../model/users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { validateUser } from '../helpers/validate.helper.js';

const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const validateResult = await validateUser({ username, password });
  if (validateResult) {
    return res.status(validateResult.status).json({
      message: validateResult.message,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    password: hashedPassword,
    repository: [],
  });
  await newUser.save();
  return res.status(201).json({
    message: 'User created successfully',
  });
});

authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  const decryptedPassword = await bcrypt.compare(password, user.password);
  if (!decryptedPassword) {
    return res.status(401).json({
      message: 'Invalid password',
    });
  }
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
  return res.status(200).json({
    id: user._id,
    token,
  });
});

export default authRouter;
