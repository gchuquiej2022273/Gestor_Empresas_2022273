import mongoose from "mongoose"

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "The name is mandatory"],
    },

    password: {
        type: String,
        required: [true, "the password is mandatory"],
        unique: true,
    },

    email: {
        type: String,
        required: [true, "The mail is mandatory"],
    },

    status: {
        type: Boolean,
        default: true,
    },

    role: {
        type: String,
        required: true,
        enum: "ADMIN_ROLE"
    }

});

export default mongoose.model("cliente", userSchema);