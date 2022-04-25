const { response } = require("express");
const { request } = require("express");
const { isValidObjectId } = require("mongoose");
const { Provider } = require("../../models");

/**
 * Busca las coincidencias con el dni de cliente en la base de datos.
 * @param {*} term dni que el usuario desea buscar.
 * @param {*} res 
 * @returns 
 */
 const searchProvidersByDni = async( term = '', req = request, res = response ) => {

    // Buscar por ID
    // const isMongoID = isValidObjectId( term );

    // if ( isMongoID ) // Si se esta buscando por ID
    // {
    //     const product = await Product.findById( term );
    //     return res.json({
    //         results: ( product ) ? [ product ] : []
    //     });
    // }

    const establishment = req.establishmentId;
    let basicQuery = [{ state: true }, { establishment }];
    
    // Buscar por coincidencia
    const regex = new RegExp( term, 'i' );
    
    const providerMatch = await Provider.find({
                                $or: [
                                    { dni: regex }
                                ],
                                $and: basicQuery,                                
                            });
                            // .populate('category', 'name')
                            // .populate('unit', 'unit');

    return res.json( providerMatch );
};

module.exports = {
    searchProvidersByDni
};