const { response } = require('express');
const { Product } = require('../../models');

/**
 * Crea un nuevo comestible en la base de datos.
 */
 const createGrocery = async (req, res = response ) => {
    const { state, user, establishment, file, ...body } = req.body;

    // Generar la data a guardar
    const data = {
        ...body,
        establishment: req.user.establishment,
        user: req.user._id,
        supercategory: '61d7b1a02c38bdb5f64dcfb0'
    };

    const grocery = new Product( data );

    try 
    {
        // Guardar DB
        await grocery.save();
        return res.status(201).json( grocery );
    } 
    catch (error) 
    {
        console.log(error)
        return res.status(401).json( {error: 'No se pudo crear el comestible en la base de datos'} );
    }    
};

/**
 * Obtiene todos los comestibles registrados en un establecimiento.
 */
 const getAllGroceries = async(req, res = response ) => {

    const { limit = 10, from = 0 } = req.query;
    const query = req.queryProduct;

    const [ total, groceries ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
                        .populate('establishment', 'name')
                        .populate('category', 'name')
                        .populate('unit', 'unit units')
                        .skip( Number( from ) )  // desde donde
                        .limit( Number( limit ) ) // Cuantos
    ]);

    return res.json({
        total,
        groceries
    });
};

/**
 * Obtiene un comestible de la base de datos.
 */
 const getGroceryById = async(req, res = response ) => {

    // Saqueme el producto de ese establecimiento que este activo cuyo id concuerde.
    const query = req.queryProduct;
    const grocery = await Product.findOne( query )
                            .populate('establishment', 'name')
                            .populate('category', 'name')
                            .populate('unit', 'unit');

    return res.json( grocery );
};

/**
 * Actualiza la información de un comestible en la base de datos.
 */
 const updateGroceryById = async( req, res = response ) => {

    const { id } = req.params;
    const { state, user, ...data } = req.body;
    const { establishment } = req.user;
    // Actualiceme el comestible cuyo id coincida, peertenezca al inventario del usuario y este activo
    const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };

    data.user = req.user._id;

    const grocery = await Product.findOneAndUpdate(query, data, { new: true });    

    return res.json( grocery );
};

/**
 * Elimina un comestible de la base de datos.
 * Se hace un borrado suave, se actualiza el campo state a false para indicar la eliminación.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const deleteGroceryById = async(req, res = response ) => {

    const { id } = req.params;
    const establishment = req.user.establishment;
    // Elimineme el producto cuyo id coincida, pertenezca al establecimiento del usuario y este activo
    const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };
    const productDeleted = await Product.findOneAndUpdate( query, { state: false }, {new: true });

    return res.json( productDeleted );
};

module.exports = {
    createGrocery,
    getAllGroceries,
    getGroceryById,
    updateGroceryById,
    deleteGroceryById
};