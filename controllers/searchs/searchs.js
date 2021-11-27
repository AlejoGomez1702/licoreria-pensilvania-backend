const { response } = require('express');
const { searchSpirits } = require('./search-spirits');

const validCollections = [
    'products',
    'spirits'
];

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

        case 'spirits':
            const { other = false } = req.query;
            searchSpirits(term, res, other, req.establishmentId);
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