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
    const { limit = 8, from = 0 } = req.query;

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
    console.log("Termino::: ", term);
    let termSplited = term.split(' ');
    const termProductCategory = termSplited.shift();
    const regexProductCategory = new RegExp( termProductCategory, 'i' );
    const termProductName = termSplited.toString().replace( ',',' ' );
    const regexProductName = new RegExp( termProductName, 'i' );

    const regex = new RegExp( term, 'i' );
    const querys = {
        category : { path: 'category', match: {name: regexProductCategory}, select: 'name' },
        category2 : { path: 'category', match: {name: regexProductName}, select: 'name' },
        unit : { path: 'unit', match: {unit: regex}, select: 'unit' } 
    };

    let productsTotal = [];

    let [ 
        productsMatch, 
        productsMatch2, 
        productsMatchCategory, 
        productsMatchCategory2
    ] = await Promise.all([
        // ProductsMatch
        Product.find({
                    $or: [
                        { name: regexProductName }, 
                        { description: regexProductName }
                    ],
                    $and: basicQuery,                                
                })
                .populate('category', 'name')
                .populate('unit', 'unit'),
        // productsMatch2
        Product.find({
                    $or: [
                        { name: regexProductCategory }, 
                        { description: regexProductCategory }
                    ],
                    $and: basicQuery,                                
                })
                .populate('category', 'name')
                .populate('unit', 'unit'),
        // productsMatchCategory
        Product.find( { $and: basicQuery } )
                .populate( querys.category )
                .populate('unit', 'unit'),
        // productsMatchCategory2
        Product.find( { $and: basicQuery } )
                .populate( querys.category2 )
                .populate('unit', 'unit')

    ]);
    
    // const productsMatch = await Product.find({
    //                             $or: [
    //                                 { name: regexProductName }, 
    //                                 { description: regexProductName }
    //                             ],
    //                             $and: basicQuery,                                
    //                         })
    //                         .populate('category', 'name')
    //                         .populate('unit', 'unit');

    // console.log(productsMatch);
    // Saqueme los productos que coinciden con la categoria 
    // let productsMatch2 = await Product.find({
    //                                             $or: [
    //                                                 { name: regexProductCategory }, 
    //                                                 { description: regexProductCategory }
    //                                             ],
    //                                             $and: basicQuery,                                
    //                                         })
    //                                         .populate('category', 'name')
    //                                         .populate('unit', 'unit');
    // Los que no coinciden se borran.
    // productsMatch = productsMatch.filter( product => (product.category !== null) );
    // productsMatch2 = productsMatch2.filter( product => (product.category !== null) );
    productsMatchCategory = productsMatchCategory.filter( product => (product.category !== null) );
    productsMatchCategory2 = productsMatchCategory2.filter( product => (product.category !== null) );

    

    // Saqueme los productos que coinciden con la categoria 
    // let productsMatchCategory = await Product.find( { $and: basicQuery } )
    //                                         .populate( querys.category )
    //                                         .populate('unit', 'unit');
    // Los que no coinciden se borran.
    // productsMatchCategory = productsMatchCategory.filter( product => (product.category !== null) );

    // Saqueme los productos que coinciden con la categoria 
    // let productsMatchCategory2 = await Product.find( { $and: basicQuery } )
    //                                         .populate( querys.category2 )
    //                                         .populate('unit', 'unit');
    // Los que no coinciden se borran.
    // productsMatchCategory2 = productsMatchCategory.filter( product => (product.category2 !== null) );

    // // Saqueme los productos que coinciden con la unidad de medida
    // let productsMatchUnit = await Product.find( { $and: basicQuery } )
    //                                         .populate( querys.unit )
    //                                         .populate('category', 'name')
    // // Los que no coinciden se borran.               
    // productsMatchUnit = productsMatchUnit.filter( product => (product.unit !== null) );    
                
    productsTotal.push( 
        ...productsMatch, 
        ...productsMatch2, 
        ...productsMatchCategory, 
        ...productsMatchCategory2
    );

    const products = [ ...new Set(productsTotal) ];

    // Hay que sacar del arreglo de productos desde "from" hasta "from + limit"
    const productsPaginate = products.slice( from, (from + limit) );

    return res.json({
        results: products,
        total: products.length
    });
};

module.exports = {
    searchProducts
};