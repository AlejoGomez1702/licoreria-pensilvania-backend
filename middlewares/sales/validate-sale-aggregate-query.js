const moment = require('moment');

/**
 * Realiza la validación para saber cual va ser la consulta para encontrar los productos(licores).
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateSaleAggregateQuery = async( req = request, res = response, next ) => {

    const query = req.querySale;

    const saleAggregateQuery = [
        {
            $match: query
        },
        {
            $group: {
                _id: { day: { $dayOfYear: "$created_at"}, year: { $year: "$created_at" } },
                totalAmount: { $sum: '$total' },  // Valor total de las ventas del dia
                count: { $sum: 1 } // Cuantas ventas se hicieron en el dia
            }
        }
    ]

    req.saleAggregateQuery = saleAggregateQuery;
    console.log("Query agregate: ", req.saleAggregateQuery);    
    next();
};

module.exports = {
    validateSaleAggregateQuery
};