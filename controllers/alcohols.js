const { response } = require('express');
const { Alcohol } = require('../models');

/**
 * Crea un nuevo % de alcohol en la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createAlcohol = async(req, res = response ) => {

    // Generar la data a guardar
    const data = {
        alcohol: Number( req.body.alcohol ),
        establishment: req.user.establishment
    }

    const alcohol = new Alcohol( data );

    // Guardar DB
    await alcohol.save();

    res.status(201).json( alcohol );
};

/**
 * Obtiene todos los % de alcohol registrados en un establecimiento.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAllAlcohols = async(req, res = response ) => {
    const { limit = 5, from = 0 } = req.query;
    const { establishment } = req.user;
    const query = { $and: [{ 'state': true }, { establishment }] };

    const [ total, alcohols ] = await Promise.all([
        Alcohol.countDocuments(query),
        Alcohol.find(query)
            .populate('establishment', 'name')
            .skip( Number( from ) )
            .limit( Number( limit ) )
    ]);

    res.json({
        total,
        alcohols
    });
};

/**
 * Obtiene un % de volumen alcoholico especifico de la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAlcoholById = async(req, res = response ) => {

    const { id } = req.params;
    const establishment = req.user.establishment;
    const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };
    const alcohol = await Alcohol.findOne( query )
                            .populate('establishment', 'name');

    res.json( alcohol );
};

/**
 * Actualiza un % de volumen alcoholico especifico de la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateAlcoholById = async( req, res = response ) => {

    const { id } = req.params;
    const { state, user, ...data } = req.body;
    const establishment = req.user.establishment;
    const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };

    data.establishment = establishment;

    const alcohol = await Alcohol.findOneAndUpdate(query, data, { new: true });

    res.json( alcohol );
};

/**
 * Elimina un % de volumen alcoholico especifico de la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteAlcoholById = async(req, res = response ) => {

    const { id } = req.params;
    const establishment = req.user.establishment;
    const query = { $and: [{ '_id': id }, { establishment }] };
    const alcoholDeleted = await Alcohol.findOneAndUpdate( query, { state: false }, {new: true });
    console.log(alcoholDeleted);
    res.json( alcoholDeleted );
};

module.exports = {
    createAlcohol,
    getAllAlcohols,
    getAlcoholById,
    updateAlcoholById,
    deleteAlcoholById
};