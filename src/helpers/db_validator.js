import Role from "../roles/roles.model.js";
import User from "../users/user.model.js";

export const roleValidado = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`the role ${role} is not exist in the data base`);
    }
}

export const existenEmail = async (email = '') => {
    const existeEmail = await User.findOne({ email });
    if (existeEmail) {
        throw new Error(`The email ${email} ya existe`);
    }
}

export const existeId = async (id = '') => {
    const existeUsuario = await User.findById({ id });
    if (!existeUsuario) {
        throw new Error(`The id ${email} do not exist `);
    }
}