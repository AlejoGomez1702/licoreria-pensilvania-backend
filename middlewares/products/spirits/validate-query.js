/**
 * Realiza la validación para saber cual va ser la consulta para encontrar los productos(licores).
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateSpiritQuery = async( req = request, res = response, next ) => {
    const { category = '', sercheable = false } = req.query;
    // Establecimiento del que se desea obtener los licores
    const establishment = req.establishmentId;
    let query = {};
    if( sercheable ) // Se quiere buscar los productos de otros negocios.
    {
        query = { 
            $and : [{state: true}],
            establishment : { $ne: establishment }
        }
    }
    else
    {
        // Saqueme los productos de ese establecimiento que esten activos
        query = { $and : [{establishment}, {state: true}] };
        if( category ) // si se desean buscar licores por categoria.
        {
            query = { $and : [{establishment}, {state: true}, {category}] };
        }
    }

    req.querySpirit = query;
    next();
};

/**
 * Realiza la validación para saber cual va ser la consulta para encontrar los productos(licores).
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateSpiritByIdQuery = async( req = request, res = response, next ) => {
    const { sercheable = false } = req.query;
    const { id } = req.params;
    // Establecimiento del que se desea obtener los licores
    const establishment = req.establishmentId;
    let query = {
        $and: [
            { '_id': id },
            { 'establishment': (sercheable) ? { $ne: establishment } : establishment },
            { 'state': true }
        ]
    };

    req.querySpirit = query;
    next();
};

module.exports = {
    validateSpiritQuery,
    validateSpiritByIdQuery
};