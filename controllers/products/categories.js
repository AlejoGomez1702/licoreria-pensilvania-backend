const { response } = require('express');
const { stringCapitalize } = require('../../helpers/string-capitalize');
const { Category } = require('../../models');
const { deletePreviusImage } = require('../../helpers');

/**
 * Crea una nueva categoria en la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createCategory = async(req, res = response ) => {

    // Mediante middlewares se hacen todas las validaciones.
    // Generar la data a guardar
    const data = {
        name: req.body.name,
        img: req.body.img,
        establishment: req.user.establishment
    }

    const category = new Category( data );

    // Guardar DB
    await category.save();

    res.status(201).json(category);
};

/**
 * Obtiene todas las categorias de productos registradas en un establecimiento.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAllCategories = async(req, res = response ) => {

    const query = req.queryWithSupercategory.query;

    const [ total, categories ] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            // .populate('establishment', 'name')
            .skip( Number( req.queryWithSupercategory.from ) )
            .limit( Number( req.queryWithSupercategory.limit ) )
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
    const establishment = req.user.establishment;
    const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };
    const category = await Category.findOne( query )
                            .populate('establishment', 'name');

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
    const establishment = req.user.establishment;
    const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };

    data.name = stringCapitalize(data.name);
    data.user = req.user._id;

    const previus = await Category.findOne( query );
    deletePreviusImage( previus );

    const category = await Category.findOneAndUpdate(query, data, { new: true });
    
    res.json( category );
};

/**
 * Elimina una categoria de productos de la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteCategoryById = async(req, res = response ) => {

    const { id } = req.params;
    const establishment = req.user.establishment;
    const query = { $and: [{ '_id': id }, { establishment }] };
    const categoryDeleted = await Category.findOneAndUpdate( query, { state: false }, {new: true });

    res.json( categoryDeleted );
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
};