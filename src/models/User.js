import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import slug from "mongoose-slug-generator";
import jwt from "jsonwebtoken";

mongoose.plugin(slug);

const AuthSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["user", "admin"] },
    slug: { type: String, slug: "name" },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving the user
AuthSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
AuthSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Method to generate JWT
AuthSchema.methods.generateAuthToken = function () {
  const payload = {
    userId: this._id,
    role: this.role,
  };
  const token = jwt.sign(payload, process.env.SESSION_SECRET, { expiresIn: "1h" });
  return token;
};

const AuthModel = mongoose.model("Auth", AuthSchema);
export default AuthModel;
