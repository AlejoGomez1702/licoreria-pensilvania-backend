const { response, request } = require('express');
const { Category } = require('../../../models');

/**
 * Construye la consulta a la base de datos dependiendo los parametros enviados desde el cliente
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateQueryCategories = async( req = request, res = response, next ) => {

    let { limit = 1000, from = 0 } = req.query;

    let query = {};
    if( req.supercategory )
    {
        query = { $and: [{ 'state': true }, { supercategory: req.supercategory }] }
    }
    else
    {
        query = { $and: [{ 'state': true }] }
    }

    req.queryWithSupercategory = {};
    req.queryWithSupercategory.query = query;
    req.queryWithSupercategory.limit = limit;
    req.queryWithSupercategory.from = from;
    next();
};

module.exports = {
    validateQueryCategories
};