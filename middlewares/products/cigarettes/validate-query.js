/**
 * Realiza la validación para saber cual va ser la consulta para encontrar los productos(Cigarrillos).
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateCigaretteQuery = async( req = request, res = response, next ) => {
    const { category = '', sercheable = false } = req.query;
    // Establecimiento del que se desea obtener los licores
    const establishment = req.establishmentId;
    // ID de la supercategoria -> Licores
    const supercategory = '6141686c752e94b6aa17123f';

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

    req.queryCigarette = query;
    next();
};

module.exports = {
    validateCigaretteQuery
};