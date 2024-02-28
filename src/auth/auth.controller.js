import bcryptjs from "bcryptjs";
import User from "../users/user.model.js";
import { generarJwt } from "../helpers/generar-jwt.js";

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: "Credenciales incorrectas"
            });
        }

        if (!user.status) {
            return res.status(400).json({
                msg: "El usuario no existe en la base de datos"
            });
        }

        const validarClave = bcryptjs.compareSync(password, user.password);
        if (!validarClave) {
            return res.status(400).json({
                msg: "Contraseña incorrecta"
            });
        }

        const token = await generarJwt(user.id);

        res.status(200).json({
            msg: "Bienvenido",
            user,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuniquese con el administrador"
        });
    }
}