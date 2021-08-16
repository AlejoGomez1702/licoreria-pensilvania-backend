const { response } = require('express');
const { stringCapitalize } = require('../helpers/string-capitalize');
const { Product } = require('../models');

/**
 * Crea un nuevo producto en la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createProduct = async(req, res = response ) => {

    const { state, user, ...body } = req.body;
    body.name = stringCapitalize(body.name);

    const productDB = await Product.findOne({ name: body.name });
     
    if ( productDB ) 
    {
        return res.status(400).json({
            msg: `El producto ${ productDB.name }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        user: req.user._id
    }

    const product = new Product( data );

    // Guardar DB
    await product.save();

    res.status(201).json(product);
};

module.exports = {
    createProduct
};