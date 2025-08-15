import express from 'express';
import cors from 'cors';

// Create a simple Express server
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Test server is running!'
  });
});

// Start server
try {
  app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
  });
} catch (error) {
  console.error('Error starting test server:', error);
}
