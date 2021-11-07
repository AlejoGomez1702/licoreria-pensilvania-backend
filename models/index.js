const User = require('./user');
const Role = require('./role');
const Category = require('./products/category');
// const Product = require('./product');
// ************** PRODUCTS **************** //
const Spirit = require('./products/spirit');

const Alcohol = require('./products/alcohol');
const Unit = require('./products/unit');
const Establishment = require('./establishment');
const Inventory = require('./inventory');
const Provider = require('./provider');
const Sale = require('./sale');

module.exports = {
    User,
    Role,
    Category,
    // Product,
    // ************** PRODUCTS **************** //
    Spirit,
    Alcohol,
    Unit,
    Establishment,
    Inventory,
    Provider,
    Sale
};