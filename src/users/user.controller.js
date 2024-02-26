import { response, request } from "express";
import bcryptjs from "bcryptjs";
import User from "./user.model.js";

export const userPost = async (req = request, res = response) => {
    const { name, password, email, role} = req.body;
    const user = new User({ name, password, email, role});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        user
    });
}