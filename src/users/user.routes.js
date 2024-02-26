import { Router } from "express";
import { check } from "express-validator";
import { userPost } from "./user.controller.js";

const router = Router();

router.post(
    "/",
    [
        check("name", "the name is mandatory").not().isEmpty(),
        check("password", "The password is mandatory").isLength({ min: 6, }),
        check("email", "the mail is mandatory").isEmail(),
    ], userPost);


export default router;