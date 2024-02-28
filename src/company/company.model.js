import mongoose from "mongoose";

export const companySchema = mongoose.Schema({

    nameCompany: {
        type: String,
        required: [true, "The name company is mandatory"]
    },

    trayectoria: {
        type: String,
        required: [true, "La trayectoria es obligatoria"]
    },

    levelImpacto: {
        type: String,
        required: [true, "El nivel de impacto es obligatorio"]
    },

    categiria: {
        type: String,
        required: [true, "La categoria es obligatoria"]
    }

});

export default model("company", companySchema);