const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
<<<<<<< HEAD
// const { Product } = require('../models');
const { Spirit } = require('../models'); 
=======
const { Product } = require('../models');
>>>>>>> e5a7df9ae1539b1f940a5da42071944b9649f4eb

const validCollections = [
    'products'
];

/**
 * Busca las coincidencias con un usuario en la base de datos.
 * @param {*} term 
 * @param {*} res 
 * @returns 
 */
const searchProducts = async( term = '', res = response ) => {

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
    
    const productsMatch = await Product.find({
                                $or: [
                                    { name: regex }, 
                                    { description: regex },
                                    { features: regex }
                                ],
                                $and: [{ state: true }],                                
                            })
                            .populate('inventory', 'description')
                            .populate('category', 'name')
                            .populate('alcohol', 'alcohol')
                            .populate('unit', 'unit');

    const querys = {
        category : { path: 'category', match: {name: regex}, select: 'name' },
        unit : { path: 'unit', match: {unit: regex}, select: 'unit' } 
    };

    // Saqueme los productos que coinciden con la categoria 
    let productsMatchCategory = await Product.find()
                                            .populate( querys.category )
                                            .populate('inventory', 'description')
                                            .populate('alcohol', 'alcohol')
                                            .populate('unit', 'unit');
    // Los que no coinciden se borran.
    productsMatchCategory = productsMatchCategory.filter( product => (product.category !== null) );

    // Saqueme los productos que coinciden con la unidad de medida
    let productsMatchUnit = await Product.find()
                                            .populate( querys.unit )
                                            .populate('inventory', 'description')
                                            .populate('category', 'name')
                                            .populate('alcohol', 'alcohol');
    // Los que no coinciden se borran.               
    productsMatchUnit = productsMatchUnit.filter( product => (product.unit !== null) );    
                
    productsMatch.push(...productsMatchCategory, ...productsMatchUnit);

    const products = [ ...new Set(productsMatch) ];

    res.json({
        results: products
    });
};

/**
 * Busca información de una colección en especifico por coincidencia.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const search = ( req, res = response ) => {
    
    const { collection, term  } = req.params;

    if ( !validCollections.includes( collection ) ) 
    {
        return res.status(400).json({
            error: `Las colecciones permitidas para busquedas son: ${ validCollections }`
        })
    }

    switch (collection) 
    {
        case 'products':
            searchProducts(term, res);
        break;
        // case 'categorias':
        //     buscarCategorias(termino, res);
        // break;
        // case 'productos':
        //     buscarProductos(termino, res);
        // break;

        default:
            res.status(500).json({
                error: 'Se le olvido hacer esta búsqueda'
            });
        break;
    }
};

/**
 * Busca un producto en la base de datos con el código de barras.
 * 1. Se debe buscar en los licores(spirits).
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const searchBarcode = async( req, res = response ) => {
    
    // Buscar por código de barras
    const { code } = req.params; 

    // 1. Licores
    const spiritMatch = await Spirit.findOne({ barcode: code }); 
    if( spiritMatch )
    {
        return res.json( spiritMatch );
    }
    else
    {
        return res.status(204).json({
            msg: 'No se encontró el producto con el código de barras dado!'
        });
    }
};


module.exports = {
    search,
    searchBarcode
};