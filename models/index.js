const User = require('./users/user');
const Role = require('./users/role');
const Category = require('./products/category');
const Product = require('./products/product');
// ************** PRODUCTS **************** //
const Unit = require('./products/unit');
const Establishment = require('./establishments/establishment');
const Provider = require('./users/provider');
const Client = require('./users/client');
const Sale = require('./sale');
const Purchase = require('./purchase');
const Movement = require('./movement');

module.exports = {
    User,
    Role,
    Category,
    Product,
    // ************** PRODUCTS **************** //
    Unit,
    Establishment,
    Provider,
    Client,
    Sale,
    Purchase,
    Movement
};