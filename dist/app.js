"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const connection_1 = __importDefault(require("./db/connection"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const blog_routes_1 = __importDefault(require("./routes/blog.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
// Load environment variables
dotenv_1.default.config({ path: path_1.default.join(__dirname, '.env') });
console.log('Environment variables loaded');
console.log(`PORT: ${process.env.PORT}`);
console.log(`MONGODB_URI: ${process.env.MONGODB_URI}`);
// Connect to MongoDB
try {
    console.log('Attempting to connect to MongoDB...');
    (0, connection_1.default)();
    console.log('MongoDB connection initialized');
}
catch (error) {
    console.error('Error connecting to MongoDB:', error);
}
// Initialize Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
console.log('Middleware configured');
// Routes
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Blog API is running',
    });
});
app.use('/api/auth', auth_routes_1.default);
app.use('/api/blogs', blog_routes_1.default);
console.log('Routes configured');
// Error handling middleware
app.use(error_middleware_1.errorHandler);
console.log('Error handler configured');
// Start server
try {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
catch (error) {
    console.error('Error starting server:', error);
}
exports.default = app;
