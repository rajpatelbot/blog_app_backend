import { Request, Response } from 'express';
import Blog from '../models/blog.model';
import mongoose from 'mongoose';
import { IUser } from '../models/user.model';

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Create a new blog
export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;
    const userId = req.user._id;

    const blog = await Blog.create({
      title,
      content,
      author: userId,
    });

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Get all blogs
export const getAllBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error('Get all blogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Get blog by ID
export const getBlogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');

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
  } catch (error) {
    console.error('Get blog by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Update blog
export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;
    const userId = req.user._id;

    let blog = await Blog.findById(req.params.id);

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

    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Delete blog
export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;
    const blog = await Blog.findById(req.params.id);

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

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Get blogs by current user
export const getMyBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;
    
    const blogs = await Blog.find({ author: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error('Get my blogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
