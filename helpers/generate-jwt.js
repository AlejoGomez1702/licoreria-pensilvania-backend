const jwt = require('jsonwebtoken');

const generateJWT = ( payload, remember = false ) => {

    return new Promise( (resolve, reject) => {

        // const payload = { id };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: remember ? '20d' : '5h'
        }, ( err, token ) => {
            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        });
    });
};

module.exports = {
    generateJWT
};

