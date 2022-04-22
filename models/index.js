const User = require('./users/user');
const Role = require('./users/role');
const Category = require('./products/category');
const Product = require('./products/product');
// ************** PRODUCTS **************** //
const Alcohol = require('./products/alcohol');
const Unit = require('./products/unit');
const Establishment = require('./establishment');
const Provider = require('./users/provider');
const Client = require('./users/client');
const Sale = require('./sale');
const Purchase = require('./purchase');

module.exports = {
    User,
    Role,
    Category,
    Product,
    // ************** PRODUCTS **************** //
    Alcohol,
    Unit,
    Establishment,
    Provider,
    Client,
    Sale,
    Purchase
};