import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

// Initialize the slug plugin
mongoose.plugin(slug);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true, // Ensure each blog title is unique
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
    category: {
      type: String,
      enum: ["Technology", "Health", "Lifestyle", "Business", "Entertainment"], 
    },
    slug: {
      type: String,
      slug: "title", // Create a slug based on the title field
      unique: true,  // Ensure each slug is unique
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, 
  }
);

// Create the Blog model
const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
