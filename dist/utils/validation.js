"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.createBlogSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// User validation schemas
exports.registerSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(2).max(50),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required().min(6),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
// Blog validation schemas
exports.createBlogSchema = joi_1.default.object({
    title: joi_1.default.string().required().min(3).max(100),
    content: joi_1.default.string().required().min(10),
});
exports.updateBlogSchema = joi_1.default.object({
    title: joi_1.default.string().min(3).max(100),
    content: joi_1.default.string().min(10),
}).min(1); // At least one field must be provided for update
