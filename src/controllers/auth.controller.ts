import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import mongoose, { Document } from 'mongoose';

// Interface for user document with _id
interface UserDocument extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Generate JWT token
const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET || 'fallback_secret';
  return jwt.sign({ id }, secret, {
    expiresIn: '7d'
  });
};

// Register user
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'User already exists',
      });
      return;
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
    });
    
    const user = await newUser.save();
    // Cast user to UserDocument type to access _id properly
    const typedUser = user as unknown as UserDocument;
    const userId = typedUser._id.toString();

    // Generate token
    const token = generateToken(userId);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: userId,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
      return;
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
      return;
    }

    // Cast user to UserDocument type to access _id properly
    const typedUser = user as unknown as UserDocument;
    const userId = typedUser._id.toString();
    
    // Generate token
    const token = generateToken(userId);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: userId,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Get current user
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user;
    // Cast user to UserDocument type to access _id properly
    const typedUser = user as unknown as UserDocument;
    const userId = typedUser._id.toString();

    res.status(200).json({
      success: true,
      user: {
        id: userId,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
