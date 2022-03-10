const { response } = require("express");
const { request } = require("express");
const { isValidObjectId } = require("mongoose");
const { Product } = require("../../models");

/**
 * Busca las coincidencias con un producto en la base de datos.
 * @param {*} term Frase que el usuario desea buscar.
 * @param {*} res 
 * @returns 
 */
 const searchProducts = async( term = '', req = request, res = response ) => {

    const supercategory = req.supercategory;

    // Buscar por ID
    const isMongoID = isValidObjectId( term );

    if ( isMongoID ) // Si se esta buscando por ID
    {
        const product = await Product.findById( term );
        return res.json({
            results: ( product ) ? [ product ] : []
        });
    }

    const establishment = req.establishmentId;
    let basicQuery = [{ state: true }, { establishment }];
    
    if( supercategory )
    {
        basicQuery = [{ state: true }, { establishment }, { supercategory }];
    }
    
    // Buscar por coincidencia
    const regex = new RegExp( term, 'i' );
    
    const productsMatch = await Product.find({
                                $or: [
                                    { name: regex }, 
                                    { description: regex }
                                ],
                                $and: basicQuery,                                
                            })
                            .populate('category', 'name')
                            .populate('unit', 'unit');

    const querys = {
        category : { path: 'category', match: {name: regex}, select: 'name' },
        unit : { path: 'unit', match: {unit: regex}, select: 'unit' } 
    };

    // Saqueme los productos que coinciden con la categoria 
    let productsMatchCategory = await Product.find( { $and: basicQuery } )
                                            .populate( querys.category )
                                            .populate('unit', 'unit');
    // Los que no coinciden se borran.
    productsMatchCategory = productsMatchCategory.filter( product => (product.category !== null) );

    // Saqueme los productos que coinciden con la unidad de medida
    let productsMatchUnit = await Product.find( { $and: basicQuery } )
                                            .populate( querys.unit )
                                            .populate('category', 'name')
    // Los que no coinciden se borran.               
    productsMatchUnit = productsMatchUnit.filter( product => (product.unit !== null) );    
                
    productsMatch.push(...productsMatchCategory, ...productsMatchUnit);

    const products = [ ...new Set(productsMatch) ];

    return res.json({
        results: products,
        total: products.length
    });
};

module.exports = {
    searchProducts
};