import Jwt from 'jsonwebtoken';

 export 
 const generarJwt = (id= '') =>{
    return new Promise((resolve, reject) =>{
        const payload = { id };
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