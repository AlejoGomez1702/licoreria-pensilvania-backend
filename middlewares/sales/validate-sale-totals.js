/**
 * Realiza la validación para saber cual va ser la consulta para encontraQueryr los productos(licores).
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 const validateSaleTotals = async( req = request, res = response, next ) => {

    let countSecondPrice = 0;
    // Valor total de todos los productos en la venta.
    let total = 0;
    // Valor de la inversión total en los productos de la venta.
    let total_inversion = 0;

    console.log("Venta: ", req.body);
    const products = req.body.products;
    // Revisando los productos de la venta uno a uno.
    products.forEach( (product) => {
        if( product.is_second_price ) // Si vienen productos con precio secundario
        {
            // Obtengo la cantidad de productos CON precio secundario y calculó el total
            countSecondPrice = product.count_second_price;
            const secondPrices = countSecondPrice * product.second_sale_price;

            // Obtengo la cantidad de productos SIN precio secundario y calculó el total
            // Incluyendo el caso en que el se ingrese otro precio de venta al producto.
            const otherPrice = (product.other_price) ? product.other_price : product.sale_price;
            const normalPrices = (product.count - countSecondPrice) * otherPrice;

            total += secondPrices + normalPrices;
        }
        else // Todos los productos se vendieron con el precio principal
        {
            // Si se modifica el precio unitario del producto al crear la venta en el frontend.
            if( product.other_price )
            {
                total += product.count * product.other_price;     
            }
            else
            {
                total += product.count * product.sale_price;     
            }                   
        }

        total_inversion += product.count * product.purchase_price;
    });

    req.saleData = {
        products,
        user: req.user._id,
        establishment: req.user.establishment,
        total,
        total_inversion
    }

    next();
};

module.exports = {
    validateSaleTotals
};