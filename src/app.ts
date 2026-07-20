import express from 'express';
import { errorHandler } from './middlewares/error.middleware';
import rootRouter from './routes/root.routes';

const app = express();

app.use(express.json());

app.use('/api/v1', rootRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use(errorHandler);

export default app;
