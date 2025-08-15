"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Create a simple Express server
const app = (0, express_1.default)();
const PORT = 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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
}
catch (error) {
    console.error('Error starting test server:', error);
}
