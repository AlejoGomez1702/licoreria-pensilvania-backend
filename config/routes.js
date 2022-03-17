const paths = {
    // Públicos para licoreriapensilvania.com
    public:     '/api/public',


    auth:               '/api/auth',
    superCategories:    '/api/supercategories',
    categories:         '/api/categories',
    users:              '/api/users',    
    spirits:            '/api/spirits',
    cigarettes:         '/api/cigarettes',
    drinks:             '/api/drinks',
    groceries:          '/api/groceries',
    units:              '/api/units',
    uploads:            '/api/uploads',   
    providers:          '/api/providers',
    searchs:            '/api/searchs',
    sales:              '/api/sales',
    purchases:          '/api/purchases'   
};

const loadRoutes = ( app ) => {
    // Públicos para licoreriapensilvania.com
    app.use( paths.public, require('../routes/licoreria-pensilvania/spirits-licoreria'));


    app.use( paths.users, require('../routes/users/users'));
    app.use( paths.auth, require('../routes/auth/auth'));
    app.use( paths.superCategories, require('../routes/products/super-categories'));
    app.use( paths.categories, require('../routes/products/categories'));
    app.use( paths.spirits, require('../routes/products/spirits'));
    app.use( paths.cigarettes, require('../routes/products/cigarettes'));
    app.use( paths.drinks, require('../routes/products/drinks'));
    app.use( paths.groceries, require('../routes/products/groceries'));
    app.use( paths.units, require('../routes/products/units'));
    app.use( paths.uploads, require('../routes/uploads'));
    app.use( paths.providers, require('../routes/users/providers'));
    app.use( paths.searchs, require('../routes/searchs'));
    app.use( paths.sales, require('../routes/sales'));
    app.use( paths.purchases, require('../routes/purchases'));
};

module.exports = {
    loadRoutes
};