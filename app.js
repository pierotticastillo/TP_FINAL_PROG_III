// Import libraries
import express from 'express';
import passport from 'passport';
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
// Import middleware
import * as administradorMiddleware from './src/middlewares/esAdministrador.js'
import validateContentType from './src/middlewares/validateContentType.js';

const app = express();

app.use(express.json());
app.use(validateContentType)

passport.use(configPassport.passportStrategy)
passport.use(configPassport.passportValidity)
app.use(passport.initialize());
// app.use(express.urlencoded({ extended: true }));

const apiV1 = "/api/v1";
const authenticate = passport.authenticate('jwt', { session: false });

app.use(apiV1, indexRoutes);
app.use(`${apiV1}/auth`, authRoutes);
// ! En caso de necesitar crear un usuario sin privilegios de autenticación y autorización por el cifrado de sha2
// app.use(`${apiV1}/usuarios`,  usuariosRoutes);
app.use(`${apiV1}/usuarios`, usuariosRoutes);
app.use(`${apiV1}/reclamos`, authenticate, reclamosRoutes);
app.use(`${apiV1}/oficinas`, [authenticate, administradorMiddleware.esAdministrador], oficinasRoutes);
app.use(`${apiV1}/reclamostipos`, [authenticate, administradorMiddleware.esAdministrador], reclamosTiposRoutes);
app.use(`${apiV1}/reclamosestados`, [authenticate, administradorMiddleware.esAdministrador], reclamosEstadosRoutes);
app.use(`${apiV1}/usuariosoficinas`, [authenticate, administradorMiddleware.esAdministrador], usuariosOficinasRoutes);

export default app;