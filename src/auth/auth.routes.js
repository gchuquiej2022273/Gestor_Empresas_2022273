import { Router } from "express";
import { check } from "express-validator";

import { login } from "./auth.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/login",
    [
        check("email", "the email is mandatory").isEmail(),
        check("password", "the password is mandatory").not().isEmpty(),
        validarCampos
    ],login);

export default router