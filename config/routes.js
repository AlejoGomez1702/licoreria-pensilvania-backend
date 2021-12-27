const paths = {
    // Públicos para licoreriapensilvania.com
    public:     '/api/public',


    auth:       '/api/auth',
    categories: '/api/categories',
    users:      '/api/users',    
    spirits:    '/api/spirits',
    units:      '/api/units',
    uploads:    '/api/uploads',   
    providers:  '/api/providers',
    searchs:    '/api/searchs',
    sales:      '/api/sales'   
};

const loadRoutes = ( app ) => {
    // Públicos para licoreriapensilvania.com
    app.use( paths.public, require('../routes/licoreria-pensilvania/spirits-licoreria'));


    app.use( paths.users, require('../routes/users/users'));
    app.use( paths.auth, require('../routes/auth/auth'));
    app.use( paths.categories, require('../routes/products/categories'));
    app.use( paths.spirits, require('../routes/products/spirits'));
    app.use( paths.units, require('../routes/products/units'));
    app.use( paths.uploads, require('../routes/uploads'));
    app.use( paths.providers, require('../routes/users/providers'));
    app.use( paths.searchs, require('../routes/searchs'));
    app.use( paths.sales, require('../routes/sales'));
};

module.exports = {
    loadRoutes
};