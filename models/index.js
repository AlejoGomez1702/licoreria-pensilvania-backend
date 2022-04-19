const User = require('./users/user');
const Role = require('./users/role');
const Category = require('./products/category');
const Product = require('./products/product');
// ************** PRODUCTS **************** //
// const Spirit = require('./products/spirit');

const Alcohol = require('./products/alcohol');
const Unit = require('./products/unit');
const Establishment = require('./establishment');
// const Inventory = require('./inventory');
const Provider = require('./users/provider');
const Sale = require('./sale');
const Purchase = require('./purchase');

module.exports = {
    User,
    Role,
    Category,
    Product,
    // ************** PRODUCTS **************** //
    // Spirit,
    Alcohol,
    Unit,
    Establishment,
    // Inventory,
    Provider,
    Sale,
    Purchase
};