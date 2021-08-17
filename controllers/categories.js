const { response } = require('express');
const { stringCapitalize } = require('../helpers/string-capitalize');
const { Category } = require('../models');

/**
 * Crea una nueva categoria en la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createCategory = async(req, res = response ) => {

    const name = stringCapitalize(req.body.name);

    const categoryDB = await Category.findOne({ name });

    if ( categoryDB ) 
    {
        return res.status(400).json({
            msg: `La categoria ${ categoryDB.name } ya existe!`
        });
    }

    // Generar la data a guardar
    const data = {
        name,
        user: req.user._id
    }

    const category = new Category( data );

    // Guardar DB
    await category.save();

    res.status(201).json(category);
};

/**
 * Obtiene todas las categorias de productos de la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAllCategories = async(req, res = response ) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const [ total, categories ] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'name')
            .skip( Number( from ) )
            .limit(Number( limit ))
    ]);

    res.json({
        total,
        categories
    });
};

/**
 * Obtiene una categoria de productos de la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getCategoryById = async(req, res = response ) => {

    const { id } = req.params;
    const category = await Category.findById( id )
                            .populate('user', 'name');

    res.json( category );
};

/**
 * Actualiza la información de una categoria de productos de la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateCategoryById = async( req, res = response ) => {

    const { id } = req.params;
    const { state, user, ...data } = req.body;

    data.name = stringCapitalize(data.name);
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, { new: true });

    res.json( category );
}

/**
 * Elimina una categoria de productos de la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteCategoryById = async(req, res =response ) => {

    const { id } = req.params;
    const categoryDeleted = await Category.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( categoryDeleted );
}

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
};