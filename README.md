# Blog App API

A RESTful API for a blog application with user authentication and blog post management.

## Features

- User authentication (signup, login)
- JWT-based authentication
- Blog post CRUD operations
- Data validation using Joi

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- JWT for authentication
- Bcrypt for password hashing
- Joi for data validation

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user (protected)

### Blog Posts

- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:id` - Get a specific blog post
- `POST /api/blogs` - Create a new blog post (protected)
- `PUT /api/blogs/:id` - Update a blog post (protected)
- `DELETE /api/blogs/:id` - Delete a blog post (protected)
- `GET /api/blogs/user/me` - Get all blog posts by the current user (protected)

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the src directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blog_app
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## Build and Production

To build the application for production:

```
npm run build
```

To run the production build:

```
npm start
```
