import mongoose from "mongoose"

const companySchema = mongoose.Schema({

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
    },

    status: {
        type: Boolean,
        default: true
    }


});

companySchema.methods.toJson = function(){
    const { __v,_id,...company } = this.toObject();
    company.uid = _id;
    return company;
}

export default mongoose.model("company", companySchema);