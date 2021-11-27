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
    }

    listen() 
    {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
}

module.exports = Server;
