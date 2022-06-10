const { Establishment } = require("../../models");

/**
 * Realiza la validación para saber cual va ser la consulta para encontrar los productos(licores).
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateSaleBasicQuery = async( req = request, res = response, next ) => {

    const { start = '', end = '' } = req.query;
    console.log("start: ", req.query);

    const { establishment } = req.user;
    // Saqueme las ventas activas del establecimiento del usuario logueado
    let query = {
        $and: [
            { 'state': true }, 
            { establishment }
        ]
    };

    // Si hay un rango de fechas en especifico en el que se desean las ventas
    if( start && end )
    {
        query = {
            $and: [
                { 'state': true }, 
                { establishment },
                { created_at: { $gte: start, $lte: end } }
            ]
        };
    }

    // Verificar si las ventas se realizan en  horario diferente
    // si el establecimiento tieno el campo schedule 
    const establishmentDB = await Establishment.findById( establishment );
    if( establishmentDB.schedule )
    {
        console.log(establishmentDB.schedule);
    }


    // // const { sercheable = false } = req.query;
    // const { id } = req.params;
    // // Establecimiento del que se desea obtener los licores
    // const establishment = req.user.establishment;
    // let query = {
    //     $and: [
    //         { '_id': id },
    //         { establishment },
    //         { 'state': true }
    //     ]
    // };

    req.querySale = query;
    next();
};

module.exports = {
    validateSaleBasicQuery
};