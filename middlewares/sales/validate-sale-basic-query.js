const { Establishment } = require("../../models");

/**
 * Realiza la validación para saber cual va ser la consulta para encontrar los productos(licores).
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateSaleBasicQuery = async( req = request, res = response, next ) => {

    const { establishment } = req.user;
    // Saqueme las ventas activas del establecimiento del usuario logueado
    const query = { $and: [{ 'state': true }, { establishment }] };

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