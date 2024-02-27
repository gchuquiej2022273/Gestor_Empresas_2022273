import { validationResult } from "express-validator";

export const validarCampos = (req, res, next) =>{
    const error = validationResult(req);
    if (!error) {
        return res.status(400).json(error);
    }

    next();
}