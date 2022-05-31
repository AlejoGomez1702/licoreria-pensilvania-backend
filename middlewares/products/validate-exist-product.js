const { response, request } = require('express');
const { stringCapitalize } = require('../../helpers/string-capitalize');
const { Product } = require('../../models');

/**
 * Realiza la validacion de que exista ya un licor que se intenta crear
 */
const validateExistProduct = async( req = request, res = response, next ) => {
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

        switch ( req.supercategoryName ) 
        {
            case 'spirit':
                fields.push( { vol_alcohol: req.body.vol_alcohol } )
            break;

            // case 'cigarette':
            //     supercategory = '6141686c752e94b6aa17123f';
            // break;

            // case 'drink':
            //     supercategory = '61d7a5ea2c38bdb5f64dcf7c';
            // break;

            // case 'grocery':
            //     supercategory = '61d7b1a02c38bdb5f64dcfb0';
            // break;
        
            // case 'naturist':
            //     supercategory = '628ee88875cf2ef75b1209fc';
            // break;

            // case 'sexshop':
            //     supercategory = '628ee89c75cf2ef75b1209fd';
            // break;
        
            default: break;          
        }


        const query = { $and: fields}; 
    
        const product = await Product.findOne( query );
         
        if ( product ) 
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
            error: 'Error validando el producto',
        });
    }
};

module.exports = {
    validateExistProduct
};