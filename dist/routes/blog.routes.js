"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("../controllers/blog.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const validation_1 = require("../utils/validation");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
// Public routes
router.get('/', blog_controller_1.getAllBlogs);
router.get('/:id', blog_controller_1.getBlogById);
// Protected routes
router.use(auth_middleware_1.protect);
router.post('/', (0, validation_middleware_1.validate)(validation_1.createBlogSchema), blog_controller_1.createBlog);
router.put('/:id', (0, validation_middleware_1.validate)(validation_1.updateBlogSchema), blog_controller_1.updateBlog);
router.delete('/:id', blog_controller_1.deleteBlog);
router.get('/user/me', blog_controller_1.getMyBlogs);
exports.default = router;
