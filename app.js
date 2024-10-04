import express from 'express';

import indexRoutes from './src/v1/routes/index.routes.js';
import oficinasRoutes from './src/v1/routes/oficinas.routes.js';
import usuariosRoutes from './src/v1/routes/usuarios.routes.js';
import usuariosOficinasRoutes from './src/v1/routes/usuariosoficinas.routes.js';
import reclamosRoutes from './src/v1/routes/reclamos.routes.js';
import reclamosTiposRoutes from './src/v1/routes/reclamostipos.routes.js';
import reclamosEstadosRoutes from './src/v1/routes/reclamosestados.routes.js';
import validateContentType from './src/middlewares/validateContentType.js';

const app = express();

app.use(express.json());
app.use(validateContentType)
// app.use(express.urlencoded({ extended: true }));

const apiV1 = "/api/v1";

app.use(apiV1, indexRoutes);
app.use(`${apiV1}/usuarios`, usuariosRoutes);
app.use(`${apiV1}/reclamos`, reclamosRoutes);
app.use(`${apiV1}/oficinas`, oficinasRoutes);
app.use(`${apiV1}/reclamostipos`, reclamosTiposRoutes);
app.use(`${apiV1}/reclamosestados`, reclamosEstadosRoutes);
app.use(`${apiV1}/usuariosoficinas`, usuariosOficinasRoutes);

export default app;
