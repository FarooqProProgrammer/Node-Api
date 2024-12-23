import BlogController from "../controller/blog-controller.js";
import express from "express";
import { authenticateJWT } from "../middleware/index.js";

const blogRouter = express.Router();

// Route for creating a new blog post
blogRouter.post("/blogs",authenticateJWT, BlogController.createBlog);

// Route for getting all blog posts
blogRouter.get("/blogs", BlogController.getAllBlogs);

// Route for getting a single blog post by slug
blogRouter.get("/blogs/:slug", BlogController.getBlogBySlug);

// Route for updating a blog post by slug
blogRouter.put("/blogs/:slug", BlogController.updateBlog);

// Route for deleting a blog post by slug
blogRouter.delete("/blogs/:slug", BlogController.deleteBlog);

export default blogRouter;

