import { Router } from "express";
import { check } from "express-validator";
import { userPost } from "./user.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import {
    existenEmail,
    existeId,
    roleValidado
    } from "../helpers/db_validator.js";

const router = Router();

router.post(
    "/",
    [
        check("email").custom(existenEmail),
        check("role").custom(roleValidado),
        check("name", "the name is mandatory").not().isEmpty(),
        check("password", "The password is mandatory").isLength({ min: 6, }),
        check("email", "the email is mandatory").isEmail(),
        validarCampos,
    ], userPost);


export default router;