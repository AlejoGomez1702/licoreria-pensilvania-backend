const paths = {
    auth:       '/api/auth',
    categories: '/api/categories',
    users:      '/api/users',    
    // products:   '/api/products',
    spirits:    '/api/spirits',
    // alcohols:   '/api/alcohols',
    units:      '/api/units',
    uploads:    '/api/uploads',   
    providers:  '/api/providers',
    searchs:    '/api/searchs',
    sales:      '/api/sales'   
};

const loadRoutes = ( app ) => {
    app.use( paths.users, require('../routes/users'));
    app.use( paths.auth, require('../routes/auth/auth'));
    app.use( paths.categories, require('../routes/products/categories'));
    // app.use( paths.products, require('../routes/products'));
    app.use( paths.spirits, require('../routes/products/spirits'));
    // app.use( paths.alcohols, require('../routes/products/alcohols'));
    app.use( paths.units, require('../routes/products/units'));
    app.use( paths.uploads, require('../routes/uploads'));
    app.use( paths.providers, require('../routes/providers'));
    app.use( paths.searchs, require('../routes/searchs'));
    app.use( paths.sales, require('../routes/sales'));
};

module.exports = {
    loadRoutes
};