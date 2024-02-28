import Jwt from 'jsonwebtoken'
import Usuario from '../users/user.model.js'

export const validarJwt = async(req, res, next) =>{
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No hay token el la peticion",
        });
    }

    try {
        const { uid } = Jwt.verify(token, process.env.privateKey);
        const user = await Usuario.findById(uid);

        if (!user){
            return res.status(400).json({
                msg: "Usuario no existe en la base de datos"
            });
        }

        if (!user.status) {
            return res.status(401).json({
                msg: "El usuario no existe en la base de datos"
            });
        }        

        req.user = user;

        next();
    } catch (e) {
        console.log(e),
        res.status(401).json({
            msg: "Token no valido",
        });
        
    }

}