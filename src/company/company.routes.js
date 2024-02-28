import Router from "express";
import check from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import validarJwt from "../middlewares/validar-jwt.js"
import companyPost from "../company/company.controller.js"

const router = Router();

router.post(
    "/new",
    [
        validarJwt,
        check("nameCompany", "El nombre de la compania es obligatoria"),
        check("trayectoria", "La trayectoria es obligatoria"),
        check("levelImpacto", "EL nivel es obligatorio"),
        check("categiria", "la categoria es obligatoria"),
        validarCampos,
    ],companyPost);

export default router;