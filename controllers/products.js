const { response } = require('express');
const { Product } = require('../models');

/**
 * Crea un nuevo producto en la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createProduct = async(req, res = response ) => {

    const { state, user, file, ...body } = req.body;

    // Generar la data a guardar
    const data = {
        ...body,
        inventory: req.inventory,
        user: req.user._id
    }

    const product = new Product( data );

    // Guardar DB
    await product.save();

    res.status(201).json(product);
};

/**
 * Obtiene todos los productos registrados en un establecimiento.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const getAllProducts = async(req, res = response ) => {

    const { limit = 1000, from = 0, category = '' } = req.query;
    // Saqueme el inventario cuyo establecimiento sea el del usuario logueado.
    // const inventory = req.inventory;
    const inventory = '611d49ba779e79be7ea589a2';
    // Saqueme los productos de ese inventario que esten activos
    let query = { $and : [{inventory}, {state: true}] };
    if( category ) // si se desean buscar productos por categoria.
    {
        query = { $and : [{inventory}, {state: true}, {category}] };
    }

    const [ total, products ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('inventory', 'description')
            .populate('category', 'name')
            .populate('alcohol', 'alcohol')
            .populate('unit', 'unit')
            .skip( Number( from ) )
            .limit( Number( limit ) )
    ]);

    res.json({
        total,
        products
    });
};

/**
 * Obtiene un producto de la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const getProductById = async(req, res = response ) => {

    const { id } = req.params;
    // Saqueme el inventario cuyo establecimiento sea el del usuario logueado.
    const inventory = req.inventory;
    // Saqueme el producto de ese inventario que este activo cuyo id concuerde.
    const query = { $and: [{ '_id': id }, { inventory }, { 'state': true }] };
    const product = await Product.findOne( query )
                            .populate('inventory', 'description');

    res.json( product );
};

/**
 * Actualiza la información de un producto en la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const updateProductById = async( req, res = response ) => {

    const { id } = req.params;
    const { state, user, ...data } = req.body;
    const inventory = req.inventory;
    // Actualiceme el producto cuyo id coincida, peertenezca al inventario del usuario y este activo
    const query = { $and: [{ '_id': id }, { inventory }, { 'state': true }] };

    data.user = req.user._id;

    const product = await Product.findOneAndUpdate(query, data, { new: true });    

    res.json( product );
};

/**
 * Elimina un producto de la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const deleteProductById = async(req, res = response ) => {

    const { id } = req.params;
    const inventory = req.inventory;
    // Elimineme el producto cuyo id coincida, pertenezca al inventario del usuario y este activo
    const query = { $and: [{ '_id': id }, { inventory }, { 'state': true }] };
    const productDeleted = await Product.findOneAndUpdate( query, { state: false }, {new: true });

    res.json( productDeleted );
};

/**
 * Obtiene todas las caracteristicas de los productos registrados en un establecimiento.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const getAllFeatures = async(req, res = response ) => {

    // const { limit = 100, from = 0 } = req.query;
    // Saqueme el inventario cuyo establecimiento sea el del usuario logueado.
    const inventory = req.inventory;
    // Saqueme los productos de ese inventario que esten activos
    const query = { $and : [{inventory}, {state: true}] };
    const featuresData = await Product.find( query ).select('features');

    let features = [];
    for (const feature of featuresData) 
    {
        const featuresEspecifics = feature.features;
        for (const f of featuresEspecifics) 
        {
            if(f)
            {
                features.push( f );
            }                
        }        
    }

    features = [...new Set( features )];

    res.json({
        features
    });
};


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    // *** Especiales ***//
    getAllFeatures

};