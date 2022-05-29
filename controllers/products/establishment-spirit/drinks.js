const { response } = require('express');
const { Product } = require('../../../models');

/**
 * Crea una nueva bebida en la base de datos.
 */
 const createDrink = async (req, res = response ) => {
    const { state, user, establishment, file, ...body } = req.body;

    // Generar la data a guardar
    const data = {
        ...body,
        establishment: req.user.establishment,
        user: req.user._id,
        supercategory: '61d7a5ea2c38bdb5f64dcf7c'
    };

    const drink = new Product( data );

    try 
    {
        // Guardar DB
        await drink.save();
        return res.status(201).json( drink );
    } 
    catch (error) 
    {
        console.log(error)
        return res.status(401).json( {error: 'No se pudo crear la bebida en la base de datos'} );
    }    
};

/**
 * Obtiene todos los cigarrillos registrados en un establecimiento.
 */
 const getAllDrinks = async(req, res = response ) => {

    const { limit = 10, from = 0 } = req.query;
    // Establecimiento del que se desea obtener los licores
    const query = req.queryDrink;

    const [ total, products ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('establishment', 'name')
            .populate('category', 'name')
            .populate('unit', 'unit ml')
            .skip( Number( from ) )  // desde donde
            .limit( Number( limit ) ) // Cuantos
    ]);

    res.json({
        total,
        products
    });
};

/**
 * Obtiene una bebida de la base de datos.
 */
 const getDrinkById = async(req, res = response ) => {

    // Saqueme el producto de ese establecimiento que este activo cuyo id concuerde.
    const query = req.queryProduct;
    const drink = await Product.findOne( query )
                            .populate('establishment', 'name')
                            .populate('category', 'name')
                            .populate('unit', 'unit');

    return res.json( drink );
};

/**
 * Actualiza la información de una bebida en la base de datos.
 */
 const updateDrinkById = async( req, res = response ) => {

    const { id } = req.params;
    const { state, user, ...data } = req.body;
    const { establishment } = req.user;
    // Actualiceme la bebida cuyo id coincida, peertenezca al inventario del usuario y este activo
    const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };

    data.user = req.user._id;

    const drink = await Product.findOneAndUpdate(query, data, { new: true });    

    return res.json( drink );
};

/**
 * Elimina una bebida de la base de datos.
 * Se hace un borrado suave, se actualiza el campo state a false para indicar la eliminación.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const deleteDrinkById = async(req, res = response ) => {

    const { id } = req.params;
    const establishment = req.user.establishment;
    // Elimineme el producto cuyo id coincida, pertenezca al establecimiento del usuario y este activo
    const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };
    const productDeleted = await Product.findOneAndUpdate( query, { state: false }, {new: true });

    return res.json( productDeleted );
};

module.exports = {
    getAllDrinks,
    createDrink,
    getDrinkById,
    updateDrinkById,
    deleteDrinkById
};