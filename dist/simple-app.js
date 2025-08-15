"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables
dotenv_1.default.config({ path: path_1.default.join(__dirname, '.env') });
console.log('Environment variables loaded');
console.log(`PORT: ${process.env.PORT}`);
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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
}
catch (error) {
    console.error('Error starting server:', error);
}
