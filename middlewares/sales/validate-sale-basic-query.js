const moment = require('moment');

/**
 * Realiza la validación para saber cual va ser la consulta para encontrar los productos(licores).
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateSaleBasicQuery = async( req = request, res = response, next ) => {

    const startDate = req.startDateFull.toDate();
    const endDate = req.endDateFull.toDate();

    const { establishment } = req.user;
    // Saqueme las ventas activas del establecimiento del usuario logueado
    let query = {
        $and: [
            { 'state': true }, 
            { establishment }
        ]
    };
    
    // Si hay un rango de fechas en especifico en el que se desean las ventas
    if( startDate && endDate )
    {
        query = {
            $and: [
                { 'state': true }, 
                { establishment },
                { created_at: { $gte: startDate, $lte: endDate } }
            ]
        };
    }

    req.querySale = query;    
    next();
};

module.exports = {
    validateSaleBasicQuery
};