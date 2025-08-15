import Joi from 'joi';

// User validation schemas
export const registerSchema = Joi.object({
  name: Joi.string().required().min(2).max(50),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Blog validation schemas
export const createBlogSchema = Joi.object({
  title: Joi.string().required().min(3).max(100),
  content: Joi.string().required().min(10),
});

export const updateBlogSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  content: Joi.string().min(10),
}).min(1); // At least one field must be provided for update
