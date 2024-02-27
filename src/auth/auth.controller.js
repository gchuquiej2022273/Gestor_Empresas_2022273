import bcryptjs from "bcryptjs";
import User from "../users/user.model.js";


export const login = async (req, res) => {

    const { email, password} = req.body;

    try {
        const user = await User.findOne({ email });
        
        if(!user){
            return res.status(400).json({
                msg: "Credenciales incorrectas"
            });
        }

        if(!user.status){
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

        res.status(200).json({
            msg: "Bienvenido",
            user
        });
    } catch (error) {
        
    }
}