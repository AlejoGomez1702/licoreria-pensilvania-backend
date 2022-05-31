/**
 * Verifica los campos especiales dependiendo del tipo de producto.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateExtraFieldsProduct = async( req = request, res = response, next ) => {
    try 
    {        
        const supercategoryName = req.supercategoryName;

        switch ( supercategoryName ) 
        {
            case 'spirit':
                const { vol_alcohol = 0 } = req.body;
                if( vol_alcohol >= 0 && vol_alcohol <= 100 )
                {
                    req.body.vol_alcohol = Number( req.body.vol_alcohol );                    
                }
                else
                {
                    return res.status(401).json({
                        error: 'Error con el volumen alcohólico del producto'
                    });
                }          
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


        

        next();
    } 
    catch (error) 
    {
        return res.status(401).json({
            error: 'Error capitalizando nombre del producto'
        });
    }
};

module.exports = {
    validateExtraFieldsProduct
};