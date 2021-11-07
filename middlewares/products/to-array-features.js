const { stringCapitalize } = require("../../helpers/string-capitalize");

/**
 * Realiza la validacion para que se pueda crear una categoria
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const toArrayFeatures = async( req = request, res = response, next ) => {
    try 
    {        
        const featuresString = req.body.features;
        let featuresArr = featuresString.split(',');
        featuresArr = featuresArr.map(feature => {
            return stringCapitalize( feature );
        });
        req.body.features = featuresArr;

        next();
    } 
    catch (error) 
    {
        console.log(error);
        res.status(401).json({
            error: 'Error validando caracteristicas del producto'
        });
    }
};

module.exports = {
    toArrayFeatures
};