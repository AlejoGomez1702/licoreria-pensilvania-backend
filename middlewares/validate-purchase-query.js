/**
 * Realiza la validación para saber cual va ser la consulta para encontrar los productos(licores).
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validatePurchaseByIdQuery = async( req = request, res = response, next ) => {
    // const { sercheable = false } = req.query;
    const { id } = req.params;
    // Establecimiento del que se desea obtener los licores
    const establishment = req.establishmentId;
    let query = {
        $and: [
            { '_id': id },
            { establishment },
            { 'state': true }
        ]
    };

    req.queryPurchase = query;
    next();
};

module.exports = {
    validatePurchaseByIdQuery
};