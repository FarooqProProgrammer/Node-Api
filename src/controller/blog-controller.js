import Blog from "../models/Blog.js";
import { StatusCodes } from "http-status-codes"; // Import StatusCodes for consistent status codes

class BlogController {
  // Create a new blog post
  static async createBlog(req, res) {
    try {
      const { title, content, author, category } = req.body;

      // Validate input
      if (!title || !content || !author || !category) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "All fields are required" });
      }

      // Create a new blog post
      const newBlog = new Blog({
        title,
        content,
        author,
        category,
      });

      // Save the new blog post
      await newBlog.save();

      // Respond with success and the saved blog
      res.status(StatusCodes.CREATED).json({
        message: "Blog created successfully",
        blog: newBlog,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  // Get all blog posts
  static async getAllBlogs(req, res) {
    try {
      const blogs = await Blog.find().populate("author", "name email").exec();

      // Respond with the list of blogs
      res.status(StatusCodes.OK).json({ blogs });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  // Get a single blog post by slug
  static async getBlogBySlug(req, res) {
    try {
      const { slug } = req.params;

      const blog = await Blog.findOne({ slug }).populate("author", "name email").exec();
      if (!blog) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Blog not found" });
      }

      // Respond with the blog
      res.status(StatusCodes.OK).json({ blog });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  // Update a blog post by slug
  static async updateBlog(req, res) {
    try {
      const { slug } = req.params;
      const { title, content, category, published, publishedAt } = req.body;

      const updatedBlog = await Blog.findOneAndUpdate(
        { slug },
        { title, content, category, published, publishedAt },
        { new: true } // Return the updated blog
      ).exec();

      if (!updatedBlog) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Blog not found" });
      }

      // Respond with the updated blog
      res.status(StatusCodes.OK).json({ message: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  // Delete a blog post by slug
  static async deleteBlog(req, res) {
    try {
      const { slug } = req.params;

      const deletedBlog = await Blog.findOneAndDelete({ slug }).exec();

      if (!deletedBlog) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Blog not found" });
      }

      // Respond with a success message
      res.status(StatusCodes.OK).json({ message: "Blog deleted successfully" });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}

export default BlogController;
