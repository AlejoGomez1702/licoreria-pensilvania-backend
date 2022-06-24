/**
 * Realiza la validación para saber cual va ser la consulta para encontraQueryr los productos(licores).
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateSendDates = async( req = request, res = response, next ) => {

    let {
        start: starDateFrontend = '', // Fecha inicial pedida desde el frontend Hora:(00:00:00)
        end: endDateFrontend = ''  // Fecha final pedida desde el frontend Hora:(00:00:00)
    } = req.query;

    req.isDateRangeSelected = false;

    if(starDateFrontend && endDateFrontend)
    {
        req.isDateRangeSelected = true;
        req.rangeSelected = {
            starDateFrontend,
            endDateFrontend
        };
    }

    next();
};

module.exports = {
    validateSendDates
};