import mongoose from "mongoose";
import slug from "mongoose-slug-generator"


mongoose.plugin(slug);


const AuthModel = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
        slug: { type: String, slug: "title" }
    },
    {
        timestamps: true
    }
)

const AuthSchema = mongoose.model("Auth", AuthModel);

export default AuthSchema