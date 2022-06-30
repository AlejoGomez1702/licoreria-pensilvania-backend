const { response } = require('express');
const { Product, Category } = require('../../models');

const refreshProduct = async (req, res = response ) => {

    const products = await Product.find();
    let category;
    let p;
    for (const product of products) 
    {
        p = await Product.findById(product.id).populate('category', 'name').populate('unit', 'unit');
        p.full_name = `${p.category.name} ${p.name} ${p.unit.units}`;
        await p.save();
        // break;
    }

    return res.status(201).json( p );
};

/**
 * Crea un nuevo producto en la base de datos.
 */
 const createProduct = async (req, res = response ) => {

    const { state, user, establishment, file, ...body } = req.body;

    // Generar la data a guardar
    const data = {
        ...body,
        establishment: req.user.establishment,
        user: req.user._id,
        supercategory: req.supercategory
    };

    const product = new Product( data );

    try 
    {
        // Guardar DB
        await product.save();
        return res.status(201).json( product );
    } 
    catch (error) 
    {
        console.log(error);
        return res.status(401).json({
            error: 'No se pudo crear el producto en la base de datos'
        });
    }    
};

/**
 * Obtiene todos los producto naturistas registrados en un establecimiento.
 */
 const getAllProducts = async(req, res = response ) => {

    const { limit = 10, from = 0 } = req.query;
    console.log("Limit: ", limit, "from", from);
    const query = req.queryProduct;

    const [ total, products ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
                        .populate('establishment', 'name')
                        .populate('category', 'name')
                        .populate('unit', 'unit ml units grams')
                        .skip( Number( from ) )  // desde donde
                        .limit( Number( limit ) ) // Cuantos
    ]);

    return res.json({
        total,
        products
    });
};

/**
 * Obtiene un producto de la base de datos.
 */
 const getProductById = async(req, res = response ) => {

    // Saqueme el producto de ese establecimiento que este activo cuyo id concuerde.
    const query = req.queryProduct;
    const product = await Product.findOne( query )
                            .populate('establishment', 'name')
                            .populate('category', 'name')
                            .populate('unit', 'unit');

    return res.json( product );
};

/**
 * Actualiza la información de un producto en la base de datos.
 */
 const updateProductById = async( req, res = response ) => {

    const { id } = req.params;
    const { state, user, ...data } = req.body;
    const { establishment } = req.user;
    // Actualiceme el producto cuyo id coincida, pertenezca al inventario del usuario y este activo
    const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };

    data.user = req.user._id;

    const product = await Product.findOneAndUpdate(query, data, { new: true });    

    return res.json( product );
};

/**
 * Elimina un producto de la base de datos.
 * Se hace un borrado suave, se actualiza el campo state a false para indicar la eliminación.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 const deleteProductById = async(req, res = response ) => {

    const { id } = req.params;
    const establishment = req.user.establishment;
    // Elimineme el producto cuyo id coincida, pertenezca al establecimiento del usuario y este activo
    const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };
    const productDeleted = await Product.findOneAndUpdate( query, { state: false }, {new: true });

    return res.json( productDeleted );
};

module.exports = {
    refreshProduct,
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
};