"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const validation_1 = require("../utils/validation");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
// Register route
router.post('/register', (0, validation_middleware_1.validate)(validation_1.registerSchema), auth_controller_1.register);
// Login route
router.post('/login', (0, validation_middleware_1.validate)(validation_1.loginSchema), auth_controller_1.login);
// Get current user route (protected)
router.get('/me', auth_middleware_1.protect, auth_controller_1.getCurrentUser);
exports.default = router;
