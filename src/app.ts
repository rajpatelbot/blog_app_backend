import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './db/connection';
import authRoutes from './routes/auth.routes';
import blogRoutes from './routes/blog.routes';
import { errorHandler } from './middlewares/error.middleware';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });
console.log('Environment variables loaded');
console.log(`PORT: ${process.env.PORT}`);
console.log(`MONGODB_URI: ${process.env.MONGODB_URI}`);

// Connect to MongoDB
try {
  console.log('Attempting to connect to MongoDB...');
  connectDB();
  console.log('MongoDB connection initialized');
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
}

// Initialize Express app
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log('Middleware configured');

// Routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Blog API is running',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
console.log('Routes configured');

// Error handling middleware
app.use(errorHandler);
console.log('Error handler configured');

// Start server
try {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error('Error starting server:', error);
}

export default app;