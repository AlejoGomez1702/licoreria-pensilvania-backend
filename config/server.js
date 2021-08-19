const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database');

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
        this.paths = {
            auth:       '/api/auth',
            categories: '/api/categories',
            users:      '/api/users',    
            products:   '/api/products',
            alcohols:   '/api/alcohols',
            units:      '/api/units'      
        };

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
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        // this.app.use( express.static('public') );

    }

    routes() 
    {        
        this.app.use( this.paths.users, require('../routes/users'));
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.categories, require('../routes/categories'));
        this.app.use( this.paths.products, require('../routes/products'));
        this.app.use( this.paths.alcohols, require('../routes/alcohols'));
        this.app.use( this.paths.units, require('../routes/units'));

    }

    listen() 
    {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
}

module.exports = Server;
