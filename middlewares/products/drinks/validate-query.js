/**
 * Realiza la validación para saber cual va ser la consulta para encontrar los productos(Cigarrillos).
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateDrinkQuery = async( req = request, res = response, next ) => {
    const { category = '', sercheable = false } = req.query;
    // Establecimiento del que se desea obtener los licores
    const establishment = req.establishmentId;
    // ID de la supercategoria -> Licores
    const supercategory = '61d7a5ea2c38bdb5f64dcf7c';

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

    req.queryDrink = query;
    next();
};

module.exports = {
    validateDrinkQuery
};