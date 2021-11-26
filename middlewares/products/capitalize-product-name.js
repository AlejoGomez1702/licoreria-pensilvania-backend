const { stringCapitalize } = require("../../helpers/string-capitalize");

/**
 * Realiza la validacion para que se pueda crear una categoria
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const capitalizeProductName = async( req = request, res = response, next ) => {
    try 
    {        
        const name = req.body.name;

        const transformName = stringCapitalize(name);
        req.body.name = transformName;

        next();
    } 
    catch (error) 
    {
        console.log(error);
        res.status(401).json({
            error: 'Error capitalizando nombre del producto'
        });
    }
};

module.exports = {
    capitalizeProductName
};