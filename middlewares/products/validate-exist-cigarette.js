const { response, request } = require('express');
const { stringCapitalize } = require('../../helpers/string-capitalize');
const { Product } = require('../../models');

/**
 * Realiza la validacion de que exista ya un licor que se intenta crear
 */
const validateExistCigarette = async( req = request, res = response, next ) => {
    try 
    {        
        req.body.name = stringCapitalize(req.body.name);
        const establishment = req.user.establishment;
        // Si existe un licor con los mismos atributos en la base de datos.
        let fields = [
            { name: req.body.name },
            { category: req.body.category },
            { unit: req.body.unit },
            { establishment }
        ];

        const { barcode, stock, purchase_price, sale_price, current_existence } = req.body;
        if( barcode ) fields.push( {barcode} );
        if( stock ) fields.push( {stock} );
        if( purchase_price ) fields.push( {purchase_price} );
        if( sale_price ) fields.push( {sale_price} );
        if( current_existence ) fields.push( {current_existence} );

        const query = { $and: fields}; 
    
        const spiritDB = await Product.findOne( query );
         
        if ( spiritDB ) 
        {
            if( !req.body.img )
            {
                next();
                return;
            }

            return res.status(400).json({
                error: `El producto ya existe!`
            });
        }

        next();
    } 
    catch (error) 
    {
        console.log(error);
        res.status(400).json({
            error: 'Error validando producto',
        });
    }
};

module.exports = {
    validateExistCigarette
};