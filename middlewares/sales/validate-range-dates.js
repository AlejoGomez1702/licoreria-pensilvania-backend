const moment = require('moment');

/**
 * Realiza la validación para saber cual va ser la consulta para encontraQueryr los productos(licores).
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateRangeDates = async( req = request, res = response, next ) => {

    const isDateRangeSelected = req.isDateRangeSelected;  
    let startDateFull = undefined; // Fecha inicial de selección
    let endDateFull = undefined; // Fecha final (Si es undefined NO se a seleccionado un rango de fechas)

    // Hay un rango de fechas seleccionado para sacar las ventas
    if( isDateRangeSelected )
    {
        const { starDateFrontend, endDateFrontend } = req.rangeSelected;
        
        startDateFull = moment( starDateFrontend );
        endDateFull = moment( endDateFrontend );
    }
    else
    {
        const todayDate = moment().startOf('day');
        const daysToSubstract = todayDate.get('D') - 1;
        startDateFull = todayDate.subtract( daysToSubstract, 'days' ); // 2022-06-01T00:00:00-05:00
    }

    req.startDateFull = startDateFull;
    req.endDateFull = endDateFull;
    next();
};

module.exports = {
    validateRangeDates
};