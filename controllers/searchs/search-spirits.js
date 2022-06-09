const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Product } = require('../../models');

/**
 * Busca las coincidencias con un usuario en la base de datos.
 * @param {*} term 
 * @param {*} res 
 * @returns 
 */
 const searchSpirits = async( term = '', res = response, other = false, user.establishment ) => {

    // Buscar por ID
    const isMongoID = ObjectId.isValid( term );

    if ( isMongoID ) // Si se esta buscando por ID
    {
        const product = await Product.findById( term );
        return res.json({
            results: ( product ) ? [ product ] : []
        });
    }

    // Buscar por coincidencia
    const regex = new RegExp( term, 'i' );

    let establishmentValidation = (other) ? { $ne: user.establishment } : user.establishment;
    let query = {
                            $or: [
                                { name: regex }, 
                                { description: regex }
                            ],
                            $and: [{ state: true }],
                            establishment : establishmentValidation                   
                        };
    
    const productsMatch = await Product.find( query )
                            .populate('category', 'name')
                            .populate('unit', 'unit');

    const querys = {
        category : { path: 'category', match: {name: regex}, select: 'name' },
        unit : { path: 'unit', match: {unit: regex}, select: 'unit' } 
    };

    // Saqueme los productos que coinciden con la categoria 
    let productsMatchCategory = await Product.find({ establishment: establishmentValidation })
                                            .populate( querys.category )
                                            .populate('unit', 'unit');
    // Los que no coinciden se borran.
    productsMatchCategory = productsMatchCategory.filter( product => (product.category !== null) );

    // Saqueme los productos que coinciden con la unidad de medida
    let productsMatchUnit = await Product.find({ establishment: establishmentValidation })
                                            .populate( querys.unit )
                                            .populate('category', 'name')
    // Los que no coinciden se borran.               
    productsMatchUnit = productsMatchUnit.filter( product => (product.unit !== null) );    
                
    productsMatch.push(...productsMatchCategory, ...productsMatchUnit);

    const products = [ ...new Set(productsMatch) ];

    res.json( products );
};

module.exports = {
    searchSpirits
};