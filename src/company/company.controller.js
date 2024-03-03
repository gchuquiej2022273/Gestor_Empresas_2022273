import { response } from "express";
import Company from "./company.model.js";
import Excel from "excel4node";


export const companyPost = async (req, res) => {
    const { nameCompany, trayectoria, levelImpacto, categiria, status } = req.body;
    const company = new Company({ nameCompany, trayectoria, levelImpacto, categiria, status });

    await company.save();

    res.status(200).json({
        company
    });
}

export const companyPut = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { _id, ...resto } = req.body;

        await Company.findByIdAndUpdate(id, resto);

        const company = await Company.findOne({ _id: id });

        res.status(200).json({
            msg: "compania actualizada correctamente",
            company
        });
    } catch (e) {
        console.log(e);
    }
}

export const comCategoriaGet = async (req, res) => {

    try {
        const query = { status: true };

        const categorias = await Company.distinct('categiria', query);

        categorias.sort();

        res.status(200).json({
            categorias: categorias
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            msg: "No es posible listar comunicarse con un administrador"
        })
    }
}


export const reportExcel = async (req, res) => {
    try {
        const query = { status: true };

        const empresas = await Company.find(query);

        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Empresas');

        const headers = ['Nombre de la Empresa', 'Trayectoria', 'Nivel de Impacto', 'Categoría'];
        headers.forEach((header, index) => {
            worksheet.cell(1, index + 1).string(header);
        });

        empresas.forEach((empresa, index) => {
            worksheet.cell(index + 2, 1).string(empresa.nameCompany);
            worksheet.cell(index + 2, 2).string(empresa.trayectoria);
            worksheet.cell(index + 2, 3).string(empresa.levelImpacto);
            worksheet.cell(index + 2, 4).string(empresa.categiria);
        });

        const excelBuffer = await workbook.writeToBuffer();

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=reporte_empresas.xlsx');

        res.send(excelBuffer);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "The excel has not been generated correctamente, hablar a un administrador"
        });
    }
}