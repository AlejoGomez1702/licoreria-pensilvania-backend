const { response } = require('express');
const { Unit } = require('../../models');

/**
 * Crea una nueva unidad de medida en la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createUnit = async(req, res = response ) => {

    // Generar la data a guardar
    const data = {
        unit: req.body.unit,
        ml: Number( req.body.ml ),
        establishment: req.user.establishment
    }

    const unit = new Unit( data );

    // Guardar DB
    await unit.save();

    res.status(201).json( unit );
};

/**
 * Obtiene todas las unidades de medida registradas en un establecimiento.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAllUnits = async(req, res = response ) => {
    
    const { limit = 5, from = 0 } = req.query;
    const { establishment } = req.user;
    const query = { $and: [{ state: true }, { establishment }] };

    const [ total, units ] = await Promise.all([
        Unit.countDocuments(query),
        Unit.find(query)
            .populate('establishment', 'name')
            .skip( Number( from ) )
            .limit( Number( limit ) )
    ]);

    res.json({
        total,
        units
    });
};

/**
 * Obtiene una unidad de medida especifica de la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getUnitById = async(req, res = response ) => {

    const { id } = req.params;
    const establishment = req.user.establishment;
    const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };
    const unit = await Unit.findOne( query )
                            .populate('establishment', 'name');

    res.json( unit );
};

/**
 * Actualiza una unidad de medida especifica de la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateUnitById = async( req, res = response ) => {

    const { id } = req.params;
    const { state, user, ...data } = req.body;
    const establishment = req.user.establishment;
    const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };

    data.establishment = establishment;

    const unit = await Unit.findOneAndUpdate(query, data, { new: true });

    res.json( unit );
};

/**
 * Elimina una unidad de medida especifica de la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteUnitById = async(req, res = response ) => {

    const { id } = req.params;
    const establishment = req.user.establishment;
    const query = { $and: [{ '_id': id }, { establishment }] };
    const unitDeleted = await Unit.findOneAndUpdate( query, { state: false }, {new: true });
    res.json( unitDeleted );
};

module.exports = {
    createUnit,
    getAllUnits,
    getUnitById,
    updateUnitById,
    deleteUnitById
};