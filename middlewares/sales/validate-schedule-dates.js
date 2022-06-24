const { Establishment } = require("../../models");

/**
 * Realiza la validación para saber cual va ser la consulta para encontraQueryr los productos(licores).
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateScheduleDates = async( req = request, res = response, next ) => {
  
    req.anotherSchedule = false; // ***** Indica si el establecimiento tiene un horario establecido **** //

    const establishmentDB = await Establishment.findById( req.user.establishment );     
    if( establishmentDB.schedule ) // si el establecimiento tiene un horario de trabajo diferente al normal.
    {
        req.anotherSchedule = true;
        // Horario del negocio
        const { 
            start_time: startTimeEstablishment,  // Hora de inicio del negocio
            end_time: endTimeEstablishment  // Hora en la que finaliza de laborar el negocio
        } = establishmentDB.schedule;

        // Horario de inicio del negocio
        const [ 
            hoursEstablishment, 
            minutesEstablishment,
            secondsEstablishment
        ] = startTimeEstablishment.split(':');

        // Horario de cierre del negocio
        const [ 
            hoursEstablishmentEnd, 
            minutesEstablishmentEnd,
            secondsEstablishmentEnd
        ] = endTimeEstablishment.split(':');

        req.anotherScheduleData = { // ***** Información de la hora de inicio y cierre del negocio **** //
            startTimeEstablishment: {
                hours: +hoursEstablishment,
                minutes: +minutesEstablishment,
                seconds: +secondsEstablishment
            },
            endTimeEstablishment: {
                hours: +hoursEstablishmentEnd,
                minutes: +minutesEstablishmentEnd,
                seconds: +secondsEstablishmentEnd
            }
        };
    }    

    next();
};

module.exports = {
    validateScheduleDates
};