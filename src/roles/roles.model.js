import mongoose from "mongoose";

const roleSchema = mongoose.Schema({

    role: {
        type: String,
        required: [true, "the role is mandatory"]
    }
});

export default mongoose.model("Role", roleSchema);