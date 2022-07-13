const moment = require('moment');

/**
 * Realiza la validación para saber cual va ser la consulta para encontraQueryr los productos(licores).
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateSendDates = async( req = request, res = response, next ) => {

    let {
        start: startDateFrontend = '', // Fecha inicial pedida desde el frontend Hora:(00:00:00)
        end: endDateFrontend = '',  // Fecha final pedida desde el frontend Hora:(00:00:00)
        // Time
        startTime: startDateTimeFrontend = '',
        endTime: endDateTimeFrontend = ''
    } = req.query;

    req.isDateRangeSelected = false;
    req.isDateTimeRangeSelected = false;

    if(startDateFrontend && endDateFrontend)
    {
        req.isDateRangeSelected = true;
        req.rangeSelected = {
            startDateFrontend,
            endDateFrontend
        };

        if(startDateTimeFrontend && endDateTimeFrontend)
        {
            req.isDateTimeRangeSelected = true;
            req.rangeTimeSelected = {
                startDateTimeFrontend: moment(startDateTimeFrontend),
                endDateTimeFrontend: moment(endDateTimeFrontend)
            };
        }
    }

    console.log("Range time Selected:: ", req.rangeTimeSelected );

    next();
};

module.exports = {
    validateSendDates
};