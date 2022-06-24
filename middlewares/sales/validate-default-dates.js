const { Establishment } = require("../../models");
const moment = require('moment');

/**
 * Realiza la validación para saber cual va ser la consulta para encontraQueryr los productos(licores).
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateDefaultDates = async( req = request, res = response, next ) => {
  
    const anotherSchedule = req.anotherSchedule;
    let startDateFull = req.startDateFull; // Fecha inicial de selección
    let endDateFull = req.endDateFull; // Fecha final (Si es undefined NO se a seleccionado un rango de fechas)

    if( anotherSchedule ) // El negocio tiene otro horario establecido.
    {
        const originStartDate = startDateFull.clone();
        const scheduleData = req.anotherScheduleData;
        const { hours, minutes, seconds } = scheduleData.startTimeEstablishment;
        const { hours: hoursEnd, minutes: minutesEnd, seconds: secondsEnd } = scheduleData.endTimeEstablishment;
        // Sumarle el número de horas de la hora inicial del negocio.
        startDateFull = startDateFull.clone().add( hours, 'h' ).add( minutes, 'm' ).add( seconds, 's' );
        
        // Si la hora de cierre es -12, quiere decir que se deben tener en
        // cuenta las ventas del dia siguiente por ejemplo 3 de la mañana
        if( hoursEnd < 12)
        {
            endDateFull = originStartDate.clone().add( 1, 'month').add( hoursEnd, 'hours' )
                                            .add( minutesEnd, 'minutes' ).add( secondsEnd, 'seconds' );
        }
        // Si la hora de cierre es +12, quiere decir que se le debe 
        // sumar el tiempo y se trabaja en el mismo dia
        else
        {
            endDateFull = originStartDate.clone().add( 1, 'month').subtract( 1, 'day' ).add( hoursEnd, 'hours' )
                                            .add( minutesEnd, 'minutes' ).add( secondsEnd, 'seconds' );
        }     
    }
    else
    {
        startDateFull = startDateFull.clone();
        endDateFull = startDateFull.clone().add( 1, 'month' );
    }   

    req.startDateFull = startDateFull;
    req.endDateFull = endDateFull;
    console.log("startDateFull: ", startDateFull);
    console.log("endDateFull: ", endDateFull);


    next();
};

module.exports = {
    validateDefaultDates
};