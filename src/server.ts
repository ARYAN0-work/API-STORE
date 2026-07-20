import app from './app';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

dotenv.config();
const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    console.log('Connecting to mongoDB...');
    await connectDB();
    console.log('DB connected successfully!');
    app.listen(PORT, () => {
      console.log(`Server is Started`);
    });
  } catch (error) {
    console.error('failed to start server due to database connection ', error);
    process.exit(1);
  }
};

startServer();
