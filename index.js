import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import publicRouter from './src/routes/public.route.js';
import privateRouter from './src/routes/private.route.js';
import connectDB from './src/database/db.js';
import authRouter from './src/routes/auth.route.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  }),
);
const PORT = Number(process.env.PORT);

app.get('/', (req, res) => {
  res.json({
    message: 'Boiler API',
  });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/public', publicRouter);
app.use('/api/v1/private', privateRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
