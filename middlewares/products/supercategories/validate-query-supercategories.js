const { response, request } = require('express');
const { Category } = require('../../../models');

/**
 * Construye la consulta a la base de datos dependiendo los parametros enviados desde el cliente
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateQuerySupercategories = async( req = request, res = response, next ) => {

    let { supercategory = '', limit = 1000, from = 0 } = req.query;
    
    switch ( supercategory ) 
    {
        case 'spirit':
            supercategory = '61414fa3752e94b6aa171231';
        break;

        case 'cigarette':
            supercategory = '6141686c752e94b6aa17123f';
        break;

        case 'drink':
            supercategory = '61d7a5ea2c38bdb5f64dcf7c';
        break;

        case 'grocery':
            supercategory = '61d7b1a02c38bdb5f64dcfb0';
        break;
    
        default: break;        
    }

    let query = {};
    if( supercategory )
    {
        query = { $and: [{ 'state': true }, { supercategory }] }
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
    validateQuerySupercategories
};