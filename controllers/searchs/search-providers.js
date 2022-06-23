const { response } = require("express");
const { request } = require("express");
const { Provider } = require("../../models");

/**
 * Busca las coincidencias con el dni de cliente en la base de datos.
 * @param {*} term dni que el usuario desea buscar.
 * @param {*} res 
 * @returns 
 */
 const searchProvidersByName = async( term = '', req = request, res = response ) => {

    const establishment = req.user.establishment;
    let basicQuery = [{ state: true }, { establishment }];
    
    // Buscar por coincidencia
    const regex = new RegExp( term, 'i' );
    
    const providerMatch = await Provider.find({
                                $or: [
                                    { name: regex }
                                ],
                                $and: basicQuery,                                
                            });
                            // .populate('category', 'name')
                            // .populate('unit', 'unit');
                            
    return res.json( providerMatch );
};

module.exports = {
    searchProvidersByName
};