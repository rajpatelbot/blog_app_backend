import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });
console.log('Environment variables loaded');
console.log(`PORT: ${process.env.PORT}`);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
console.log('Middleware configured');

// Routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Simple Blog API is running...'
  });
});

console.log('Routes configured');

// Start server
try {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error('Error starting server:', error);
}
