"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyBlogs = exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.getAllBlogs = exports.createBlog = void 0;
const blog_model_1 = __importDefault(require("../models/blog.model"));
// Create a new blog
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const userId = req.user._id;
        const blog = yield blog_model_1.default.create({
            title,
            content,
            author: userId,
        });
        res.status(201).json({
            success: true,
            data: blog,
        });
    }
    catch (error) {
        console.error('Create blog error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});
exports.createBlog = createBlog;
// Get all blogs
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blog_model_1.default.find()
            .populate('author', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs,
        });
    }
    catch (error) {
        console.error('Get all blogs error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});
exports.getAllBlogs = getAllBlogs;
// Get blog by ID
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blog_model_1.default.findById(req.params.id).populate('author', 'name email');
        if (!blog) {
            res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: blog,
        });
    }
    catch (error) {
        console.error('Get blog by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});
exports.getBlogById = getBlogById;
// Update blog
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const userId = req.user._id;
        let blog = yield blog_model_1.default.findById(req.params.id);
        if (!blog) {
            res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
            return;
        }
        // Check if user is the author of the blog
        if (blog.author.toString() !== userId.toString()) {
            res.status(403).json({
                success: false,
                message: 'Not authorized to update this blog',
            });
            return;
        }
        blog = yield blog_model_1.default.findByIdAndUpdate(req.params.id, { title, content }, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            data: blog,
        });
    }
    catch (error) {
        console.error('Update blog error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});
exports.updateBlog = updateBlog;
// Delete blog
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const blog = yield blog_model_1.default.findById(req.params.id);
        if (!blog) {
            res.status(404).json({
                success: false,
                message: 'Blog not found',
            });
            return;
        }
        // Check if user is the author of the blog
        if (blog.author.toString() !== userId.toString()) {
            res.status(403).json({
                success: false,
                message: 'Not authorized to delete this blog',
            });
            return;
        }
        yield blog_model_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Blog deleted successfully',
        });
    }
    catch (error) {
        console.error('Delete blog error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});
exports.deleteBlog = deleteBlog;
// Get blogs by current user
const getMyBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const blogs = yield blog_model_1.default.find({ author: userId })
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs,
        });
    }
    catch (error) {
        console.error('Get my blogs error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});
exports.getMyBlogs = getMyBlogs;
