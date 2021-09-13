const jwt = require('jsonwebtoken');
//Es recomendable no poner en el payload del JWT informacion sensible del usuario

const generateJWT = ( uid= '' ) => {

    return new Promise ( (resolve, reject ) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if( err ) {
                console.log(err);
                reject( ' El token no pudo ser generado');
            }else{
                resolve( token );
            }
        })

    });
};


module.exports = {
    generateJWT
}