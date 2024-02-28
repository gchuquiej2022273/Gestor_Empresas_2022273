import { Response, request } from "express";
import Company from "./company.model.js"

export const companyPost = async (req, res) => {
    const { nameCompany, trayectoria, levelImpacto, categiria } = req.body;
    const company = new Company({ nameCompany, trayectoria, levelImpacto, categiria });

    await company.save();

    res.status(200).json({
        company
    });
}