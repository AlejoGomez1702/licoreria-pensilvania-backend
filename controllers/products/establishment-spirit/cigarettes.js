const { response } = require('express');
const { Product } = require('../../../models');

/**
 * Crea un nuevo cigarrillo en la base de datos.
 */
 const createCigarette = async (req, res = response ) => {
    const { state, user, establishment, file, ...body } = req.body;

    // Generar la data a guardar
    const data = {
        ...body,
        establishment: req.user.establishment,
        user: req.user._id,
        supercategory: '6141686c752e94b6aa17123f'
    };

    const cigarette = new Product( data );

    try 
    {
        // Guardar DB
        await cigarette.save();
        return res.status(201).json( cigarette );
    } 
    catch (error) 
    {
        console.log(error)
        return res.status(401).json( {error: 'No se pudo crear el cigarrillo en la base de datos'} );
    }    
};

/**
 * Obtiene todos los cigarrillos registrados en un establecimiento.
 */
 const getAllCigarettes = async(req, res = response ) => {

    const { limit = 10, from = 0 } = req.query;
    const query = req.queryProduct;

    const [ total, products ] = await Promise.all([
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
        products
    });
};

/**
 * Obtiene un cigarrillo de la base de datos.
 */
 const getCigaretteById = async(req, res = response ) => {

    // Saqueme el producto de ese establecimiento que este activo cuyo id concuerde.
    const query = req.queryProduct;
    const cigarette = await Product.findOne( query )
                            .populate('establishment', 'name')
                            .populate('category', 'name')
                            .populate('unit', 'unit');

    return res.json( cigarette );
};

/**
 * Actualiza la información de un cigarrillo en la base de datos.
 */
 const updateCigaretteById = async( req, res = response ) => {

    const { id } = req.params;
    const { state, user, ...data } = req.body;
    const { establishment } = req.user;
    // Actualiceme el cigarrillo cuyo id coincida, peertenezca al inventario del usuario y este activo
    const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };

    data.user = req.user._id;

    const cigarette = await Product.findOneAndUpdate(query, data, { new: true });    

    return res.json( cigarette );
};

/**
 * Elimina un cigarrillo de la base de datos.
 * Se hace un borrado suave, se actualiza el campo state a false para indicar la eliminación.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const deleteCigaretteById = async(req, res = response ) => {

    const { id } = req.params;
    const establishment = req.user.establishment;
    // Elimineme el producto cuyo id coincida, pertenezca al establecimiento del usuario y este activo
    const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };
    const productDeleted = await Product.findOneAndUpdate( query, { state: false }, {new: true });

    return res.json( productDeleted );
};

module.exports = {
    createCigarette,
    getAllCigarettes,
    getCigaretteById,
    updateCigaretteById,
    deleteCigaretteById
};