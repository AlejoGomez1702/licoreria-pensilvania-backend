const User = require('./user');
const Role = require('./role');
const Category = require('./category');
// const Product = require('./product');
// ************** PRODUCTS **************** //
const Spirit = require('./products/spirit');

const Alcohol = require('./alcohol');
const Unit = require('./unit');
const Establishment = require('./establishment');
const Inventory = require('./inventory');
const Provider = require('./provider');

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
    Provider
};