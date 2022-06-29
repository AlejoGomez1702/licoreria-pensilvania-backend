/**
 * Realiza la validación para saber cual va ser la consulta para encontrar los productos.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validateProductQuery = async( req = request, res = response, next ) => {
    
    const { category = '', nameSearch = '', sercheable = false, onlyWithPriceProblems = false } = req.query;
    // Establecimiento del que se desea obtener los licores
    const establishment = req.user.establishment;
    const supercategory = req.supercategory;

    let conditionsList = [
        { state: true },
        { supercategory }
    ];

    let query = {};
    if( sercheable ) // Se quiere buscar los productos de otros negocios.
    {
        conditionsList.push( { establishment : { $ne: establishment } } );
    }
    else
    {
        conditionsList.push( { establishment } );
    }

    if( category )
    {
        conditionsList.push( { category } );
    }

    console.log("onliWithSaleProblems: ", typeof(onlyWithPriceProblems));

    if( onlyWithPriceProblems == 'true' )
    {
        console.log("solo problemas");
        // Productos con problemas en los precios.
        // (purchase_price > sale_price) 
        // (purchase_price > second_sale_price)  
        // (purchase_price <= 1) 
        // (sale_price <= 1)
        conditionsList.push({
            $or: [
                // { $where : "this.purchase_price > this.sale_price" },
                // { $where: "this.purchase_price > this.sale_price" },
                { $expr: { $gt: [ '$purchase_price', '$sale_price' ] } },
                { purchase_price: { $lt: 2 } },
                { sale_price: { $lt: 2 } }
            ]
        });
    }

    query = { $and: conditionsList };
    req.queryProduct = query;
    next();
};

module.exports = {
    validateProductQuery,
    // validateSpiritByIdQuery
};