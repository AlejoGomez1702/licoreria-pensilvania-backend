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

        // this.usuariosPath = '/api/usuarios';
        // this.authPath     = '/api/auth';

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
        // this.app.use( this.authPath, require('../routes/auth'));
        // this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }

    listen() 
    {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;
