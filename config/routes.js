const paths = {
    // Públicos para licoreriapensilvania.com
    public:     '/api/public',


    auth:               '/api/auth',
    superCategories:    '/api/supercategories',
    categories:         '/api/categories',
    users:              '/api/users',    
    products:           '/api/products',

    spirits:            '/api/spirits',
    cigarettes:         '/api/cigarettes',
    drinks:             '/api/drinks',
    groceries:          '/api/groceries',
    naturists:          '/api/naturists',
    sexshops:           '/api/sexshops',

    units:              '/api/units',
    uploads:            '/api/uploads',   
    providers:          '/api/providers',
    clients:            '/api/clients',
    searchs:            '/api/searchs',
    sales:              '/api/sales',
    purchases:          '/api/purchases',
    movements:          '/api/movements'   
};

const loadRoutes = ( app ) => {
    // Públicos para licoreriapensilvania.com
    app.use( paths.public, require('../routes/licoreria-pensilvania/spirits-licoreria'));


    app.use( paths.users, require('../routes/users/users'));
    app.use( paths.auth, require('../routes/auth/auth'));
    app.use( paths.superCategories, require('../routes/products/super-categories'));
    app.use( paths.categories, require('../routes/products/categories'));
    app.use( paths.products, require('../routes/products/products'));

    // app.use( paths.spirits, require('../routes/products/establishment-spirit/spirits'));
    // app.use( paths.cigarettes, require('../routes/products/establishment-spirit/cigarettes'));
    // app.use( paths.drinks, require('../routes/products/establishment-spirit/drinks'));
    // app.use( paths.groceries, require('../routes/products/establishment-spirit/groceries'));
    // app.use( paths.naturists, require('../routes/products/establishment-naturist/naturists'));
    // app.use( paths.sexshops, require('../routes/products/establishment-naturist/sexshops'));

    app.use( paths.units, require('../routes/products/units'));
    app.use( paths.uploads, require('../routes/uploads'));
    app.use( paths.providers, require('../routes/users/providers'));
    app.use( paths.clients, require('../routes/users/clients'));
    app.use( paths.searchs, require('../routes/searchs'));
    app.use( paths.sales, require('../routes/sales'));
    app.use( paths.purchases, require('../routes/purchases'));
    app.use( paths.movements, require('../routes/movements'));

};

module.exports = {
    loadRoutes
};