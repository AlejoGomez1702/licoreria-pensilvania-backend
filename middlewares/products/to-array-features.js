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
        const featuresArr = featuresString.split(',');
        req.body.features = featuresArr;

        next();
    } 
    catch (error) 
    {
        res.status(401).json({
            error: 'Error validando imagen del producto'
        });
    }
};

module.exports = {
    toArrayFeatures
};