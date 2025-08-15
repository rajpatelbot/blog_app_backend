import express from 'express';
import { 
  createBlog, 
  getAllBlogs, 
  getBlogById, 
  updateBlog, 
  deleteBlog, 
  getMyBlogs 
} from '../controllers/blog.controller';
import { validate } from '../middlewares/validation.middleware';
import { createBlogSchema, updateBlogSchema } from '../utils/validation';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

// Public routes
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

// Protected routes
router.use(protect);
router.post('/', validate(createBlogSchema), createBlog);
router.put('/:id', validate(updateBlogSchema), updateBlog);
router.delete('/:id', deleteBlog);
router.get('/user/me', getMyBlogs);

export default router;
