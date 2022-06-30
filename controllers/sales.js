const { response } = require('express');
const { Sale, Product } = require('../models');


const refreshSales = async( req, res = response ) => {

    

    const salesList = req.body;
    let saleDB = {};
    let productDB = {};
    try {
        for (const sale of salesList) {
            const id = sale._id.id;
            saleDB = await Sale.findById( id );
            for (let i = 0; i < saleDB.products.length; i++) {
                const idProduct = saleDB.products[i].product;
                productDB = await Product.findById( idProduct );
                saleDB.products[i].purchase_price = productDB.purchase_price;
                saleDB.products[i].sale_price = productDB.sale_price;
    
                saleDB.total = saleDB.products[i].count * saleDB.products[i].sale_price;
                saleDB.total_inversion = saleDB.products[i].count * saleDB.products[i].purchase_price;                
            }

            await saleDB.save();
        }

        return res.status(201).json( saleDB.products );
    } catch (error) {
        return res.status(401).json( error );
    }


    // let countSecondPrice = 0;
    // // Valor total de todos los productos en la venta.
    // let total = 0;
    // // Valor de la inversión total en los productos de la venta.
    // let total_inversion = 0;

    // console.log("Venta: ", req.body);
    // const products = req.body.products;
    // // Revisando los productos de la venta uno a uno.
    // products.forEach( (product) => {
    //     if( product.is_second_price ) // Si vienen productos con precio secundario
    //     {
    //         // Obtengo la cantidad de productos CON precio secundario y calculó el total
    //         countSecondPrice = product.count_second_price;
    //         const secondPrices = countSecondPrice * product.second_sale_price;

    //         // Obtengo la cantidad de productos SIN precio secundario y calculó el total
    //         // Incluyendo el caso en que el se ingrese otro precio de venta al producto.
    //         const otherPrice = (product.other_price) ? product.other_price : product.sale_price;
    //         const normalPrices = (product.count - countSecondPrice) * otherPrice;

    //         total += secondPrices + normalPrices;
    //     }
    //     else // Todos los productos se vendieron con el precio principal
    //     {
    //         // Si se modifica el precio unitario del producto al crear la venta en el frontend.
    //         if( product.other_price )
    //         {
    //             total += product.count * product.other_price;     
    //         }
    //         else
    //         {
    //             total += product.count * product.sale_price;     
    //         }                   
    //     }

    //     total_inversion += product.count * product.purchase_price;
    // });

    // req.saleData = {
    //     products,
    //     user: req.user._id,
    //     establishment: req.user.establishment,
    //     total,
    //     total_inversion
    // }

    // const data = req.saleData;

    // if( req.body.clientId )
    // {
    //     data.client = req.body.clientId;
    // }

    // if( req.body.deposit )
    // {
    //     data.deposit = req.body.deposit;
    // }

    // const sale = new Sale( data );

    // // Refrescar el inventario, restando los productos de la venta.
    // try 
    // {
    //     const products = req.body.products;
    //     // Por cada uno de los productos de la venta
    //     for (const product of products) 
    //     {
    //         const productDB = await Product.findById( product.product );
    //         const updateData = { current_existence: (productDB.current_existence - product.count ) };
    //         // Saqueme el producto del inventario y actualice la existencia
    //         await Product.findByIdAndUpdate(product.product, updateData);
    //     }

    //     // Guardar DB
    //     await sale.save();
        
    // } catch (error) 
    // {
    //     console.log(error);        
    // }

    // return res.status(201).json( sale );

};

/**
 * Crea una nueva venta en la base de datos.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createSale = async(req, res = response ) => {

    const data = req.saleData;

    if( req.body.clientId )
    {
        data.client = req.body.clientId;
    }

    if( req.body.deposit )
    {
        data.deposit = req.body.deposit;
    }

    const sale = new Sale( data );

    // Refrescar el inventario, restando los productos de la venta.
    try 
    {
        const products = req.body.products;
        // Por cada uno de los productos de la venta
        for (const product of products) 
        {
            const productDB = await Product.findById( product.product );
            const updateData = { current_existence: (productDB.current_existence - product.count ) };
            // Saqueme el producto del inventario y actualice la existencia
            await Product.findByIdAndUpdate(product.product, updateData);
        }

        // Guardar DB
        await sale.save();
        
    } catch (error) 
    {
        console.log(error);        
    }

    return res.status(201).json( sale );
};

/**
 * Obtiene todas las ventas que tiene registradas el negocio del usuario logueado.
 * Solo pueden mostrarsen a los administradores.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAllSales = async(req, res = response ) => {

    const { limit = 10, from = 0 } = req.query;
    // Saqueme las ventas activas del establecimiento del usuario logueado y este en el rango de fechas
    const query = req.querySale;
    const saleTotalQuery = req.saleTotalQuery;
    const saleInversionQuery = req.saleInversionQuery;

    let [ total, sales, statistics, statisticsInversion ] = await Promise.all([
        Sale.countDocuments(query),
        Sale.find(query)
                    .populate('establishment', 'name')
                    .populate('user', 'name')
                    .populate ('client', 'name' )
                    .skip( Number( from ) )
                    .limit( Number( limit ) ),
        // Agrupar las ventas por dias.
        Sale.aggregate( saleTotalQuery ),
        // Agrupar las ventas por dias y sacar la inversion.
        Sale.aggregate( saleInversionQuery )
    ]);

    statistics = statistics.map(element => {
        return {
            totalAmount: element.totalAmount,
            count: element.count,
            ...element._id
        };
    });

    statisticsInversion = statisticsInversion.map(element => {
        return {
            totalAmount: element.totalAmount,
            count: element.count,
            ...element._id
        };
    });

    return res.json({
        total,
        sales,
        statistics,
        statisticsInversion
    });
};

/**
 * Obtiene una venta de la base de datos.
 */
 const getSaleById = async(req, res = response ) => {

    // Saqueme la venta de ese establecimiento que este activo cuyo id concuerde.
    const query = req.querySale;
    const sale = await Sale.findOne( query )
                            .populate('establishment', 'name')
                            .populate('user', 'name');

    return res.json( sale );
};

// /**
//  * Actualiza un % de volumen alcoholico especifico de la base de datos.
//  * @param {*} req 
//  * @param {*} res 
//  * @returns 
//  */
// const updateAlcoholById = async( req, res = response ) => {

//     const { id } = req.params;
//     const { state, user, ...data } = req.body;
//     const establishment = req.user.establishment;
//     const query = { $and: [{ '_id': id }, { establishment }, { 'state': true }] };

//     data.establishment = establishment;

//     const alcohol = await Alcohol.findOneAndUpdate(query, data, { new: true });

//     res.json( alcohol );
// };

// /**
//  * Elimina un % de volumen alcoholico especifico de la base de datos.
//  * @param {*} req 
//  * @param {*} res 
//  * @returns 
//  */
// const deleteAlcoholById = async(req, res = response ) => {

//     const { id } = req.params;
//     const establishment = req.user.establishment;
//     const query = { $and: [{ '_id': id }, { establishment }] };
//     const alcoholDeleted = await Alcohol.findOneAndUpdate( query, { state: false }, {new: true });
//     console.log(alcoholDeleted);
//     res.json( alcoholDeleted );
// };

module.exports = {
    refreshSales,
    createSale,
    getAllSales,
    getSaleById
    // updateAlcoholById,
    // deleteAlcoholById
};