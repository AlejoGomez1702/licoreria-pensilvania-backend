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

    // const startDate = new Date( startDateString );
    // const endDate = new Date( endDateString );

    // const { start, end } = req.queryEstablishmentDate;
    // req.startDateFull = startDateFull;
    // req.endDateFull = endDateFull;
    console.log("Fecha inicio: ", startDate);
    console.log("Fecha final: ", endDate);

    const { establishment } = req.user;
    // Saqueme las ventas activas del establecimiento del usuario logueado
    let query = {
        $and: [
            { 'state': true }, 
            { establishment }
        ]
    };

    let queryWithDate = {};

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

        // queryWithDate = {
        //     $and: [
        //         { 'state': true }, 
        //         { establishment },
        //         { created_at: { $gte: start, $lte: end } }
        //     ]
        // };

        // req.queryWithDate = queryWithDate;
    }

    req.querySale = query;    
    next();
};

module.exports = {
    validateSaleBasicQuery
};