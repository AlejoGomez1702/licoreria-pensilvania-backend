/**
 * Realiza la validación para saber cual va ser la consulta para encontrar los productos(Cigarrillos).
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateGroceryQuery = async( req = request, res = response, next ) => {
    const { category = '', sercheable = false } = req.query;
    // Establecimiento del que se desea obtener los comestibles
    const establishment = req.establishmentId;
    // ID de la supercategoria -> comestibles
    const supercategory = '61d7b1a02c38bdb5f64dcfb0';

    let query = {};
    if( sercheable ) // Se quiere buscar los productos de otros negocios.
    {
        query = { 
            $and : [
                { state: true },
                { establishment : { $ne: establishment } },
                { supercategory }
            ]
        }
    }
    else
    {
        // Saqueme los productos de ese establecimiento que esten activos
        query = {
            $and : [
                { establishment }, 
                { state: true }, 
                { supercategory }
            ]
        };
        if( category ) // si se desean buscar licores por categoria.
        {
            query = {
                $and : [
                    { establishment }, 
                    { state: true }, 
                    { category },
                    { supercategory }
                ]
            };
        }
    }

    req.queryProduct = query;
    next();
};

/**
 * Realiza la validación para saber cual va ser la consulta para encontrar los productos(licores).
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateGroceryByIdQuery = async( req = request, res = response, next ) => {
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

    req.queryProduct = query;
    next();
};

module.exports = {
    validateGroceryQuery,
    validateGroceryByIdQuery
};