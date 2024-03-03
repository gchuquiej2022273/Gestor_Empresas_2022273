import Jwt from 'jsonwebtoken';

export const generarJwt = (uid= '') =>{
    return new Promise((resolve, reject) =>{
        const payload = { uid };
        Jwt.sign(
            payload,
            process.env.privateKey,
            {
                expiresIn: '1h'
            },
            (err, token) => {
                err ? (console.log(err), reject('No se puedo generar el token')): resolve(token);
            }
        )
    });
}