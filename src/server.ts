import app from './app';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

dotenv.config();
console.log(process.env.MONGO_URI);
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Database connected successfully!');
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server due to database connection error:', error);
    process.exit(1);
  }
};

startServer();
