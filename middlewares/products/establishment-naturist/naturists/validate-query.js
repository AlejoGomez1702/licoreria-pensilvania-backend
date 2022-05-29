/**
 * Realiza la validación para saber cual va ser la consulta para encontrar los productos(Cigarrillos).
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateNaturistQuery = async( req = request, res = response, next ) => {
    const { category = '', sercheable = false } = req.query;
    // Establecimiento del que se desea obtener los productos naturistas
    const establishment = req.establishmentId;
    // ID de la supercategoria -> productos naturistas
    const supercategory = '628ee88875cf2ef75b1209fc';

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
        if( category ) // si se desean buscar productos naturistas por categoria.
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
 * Realiza la validación para saber cual va ser la consulta para encontrar los productos(productos naturistas).
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateCigarreteByIdQuery = async( req = request, res = response, next ) => {
    const { sercheable = false } = req.query;
    const { id } = req.params;
    // Establecimiento del que se desea obtener los productos naturistas
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
    validateNaturistQuery,
    validateCigarreteByIdQuery
};