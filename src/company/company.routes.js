import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJwt } from "../middlewares/validar-jwt.js"
import {
    companyPost,
    companyPut,
    comCategoriaGet,
    reportExcel
    } from "../company/company.controller.js"

const router = Router();

router.get("/", comCategoriaGet)

router.get("/report",reportExcel)
router.post(
    "/new",
    [
        validarJwt,
        check("nameCompany", "El nombre de la compania es obligatoria"),
        check("trayectoria", "La trayectoria es obligatoria"),
        check("levelImpacto", "EL nivel es obligatorio"),
        check("categiria", "la categoria es obligatoria"),
        validarCampos,
    ], companyPost);

router.put(
    "/:id",
    [
        validarJwt,
        check("nameCompany", "El nombre de la compania es obligatoria"),
        check("trayectoria", "La trayectoria es obligatoria"),
        check("levelImpacto", "EL nivel es obligatorio"),
        check("categiria", "la categoria es obligatoria"),
        validarCampos,
    ], companyPut);

export default router;