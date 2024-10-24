// Import libraries
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// Import passport configuration
import * as configPassport from "./src/config/passport.js"
// Import routes
import authRoutes from './src/v1/routes/auth.routes.js';
import indexRoutes from './src/v1/routes/index.routes.js';
import oficinasRoutes from './src/v1/routes/oficinas.routes.js';
import usuariosRoutes from './src/v1/routes/usuarios.routes.js';
import usuariosOficinasRoutes from './src/v1/routes/usuariosoficinas.routes.js';
import reclamosRoutes from './src/v1/routes/reclamos.routes.js';
import reclamosTiposRoutes from './src/v1/routes/reclamostipos.routes.js';
import reclamosEstadosRoutes from './src/v1/routes/reclamosestados.routes.js';
import estadisticaRoutes from './src/v1/routes/estadistica.routes.js'
// Import middleware
import * as administradorMiddleware from './src/middlewares/esAdministrador.js'
import validateContentType from './src/middlewares/validateContentType.js';

const app = express();
app.use(morgan("combined"));

app.use(express.json());
app.use(validateContentType)

passport.use(configPassport.passportStrategy)
passport.use(configPassport.passportValidity)
app.use(passport.initialize());
// app.use(express.urlencoded({ extended: true }));

// configuración swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API REST - Programación 3 - 2024',
            version: '1.0.0',
            description: 'API REST para la gestión de reclamos de la concesionaria de automóviles Prog.III. '
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./src/v1/routes/*.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const apiV1 = "/api/v1";
const authenticate = passport.authenticate('jwt', { session: false });

app.use(apiV1, indexRoutes);
app.use(`${apiV1}/auth`, authRoutes);
app.use(`${apiV1}/usuarios`, usuariosRoutes);
app.use(`${apiV1}/reclamos`, authenticate, reclamosRoutes);
app.use(`${apiV1}/oficinas`, [authenticate, administradorMiddleware.esAdministrador], oficinasRoutes);
app.use(`${apiV1}/reclamostipos`, [authenticate, administradorMiddleware.esAdministrador], reclamosTiposRoutes);
app.use(`${apiV1}/reclamosestados`, [authenticate, administradorMiddleware.esAdministrador], reclamosEstadosRoutes);
app.use(`${apiV1}/usuariosoficinas`, [authenticate, administradorMiddleware.esAdministrador], usuariosOficinasRoutes);
app.use(`${apiV1}/estadistica`, [authenticate, administradorMiddleware.esAdministrador], estadisticaRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;