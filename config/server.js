const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database');
const fileUpload = require('express-fileupload');
const { loadRoutes } = require('./routes');

/**
 * Contiene todo lo necesario para ejecutarse el servidor con el servicio.
 */
class Server 
{
    /**
     * Inicializa la configuración inicial requerida.
     */
    constructor() 
    {
        this.app  = express();
        this.port = process.env.PORT;

        // Rutas a los diferentes END-POINTS.
        
        // this.paths = {
        //     auth:       '/api/auth',
        //     categories: '/api/categories',
        //     users:      '/api/users',    
        //     // products:   '/api/products',
        //     spirits:    '/api/spirits',
        //     alcohols:   '/api/alcohols',
        //     units:      '/api/units',
        //     uploads:    '/api/uploads',   
        //     providers:  '/api/providers',
        //     searchs:    '/api/searchs',
        //     sales:      '/api/sales'   
        // };

        // Conectar a base de datos
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async connectDB() 
    {
        await dbConnection();
    }

    middlewares() 
    {
        // CORS
        const corsOptions = {
            origin: [
                'https://licoreriapensilvania.com', 
                'http://localhost:4200'
            ],
        }
        this.app.use( cors( corsOptions ) );

        // Lectura y parseo del body
        this.app.use( express.json({limit: '20mb'}) );

        // Subida de archivos 
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes() 
    {        
        loadRoutes( this.app );
        // this.app.use( this.paths.users, require('../routes/users'));
        // this.app.use( this.paths.auth, require('../routes/auth/auth'));
        // this.app.use( this.paths.categories, require('../routes/products/categories'));
        // // this.app.use( this.paths.products, require('../routes/products'));
        // this.app.use( this.paths.spirits, require('../routes/products/spirits'));
        // this.app.use( this.paths.alcohols, require('../routes/products/alcohols'));
        // this.app.use( this.paths.units, require('../routes/products/units'));
        // this.app.use( this.paths.uploads, require('../routes/uploads'));
        // this.app.use( this.paths.providers, require('../routes/providers'));
        // this.app.use( this.paths.searchs, require('../routes/searchs'));
        // this.app.use( this.paths.sales, require('../routes/sales'));
        
    }

    listen() 
    {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
}

module.exports = Server;
