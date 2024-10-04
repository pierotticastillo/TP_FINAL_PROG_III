import app from './app.js';
import * as config from './config.js';

app.listen(config.PORT);
console.log(`Puerto escuchando en el ${config.PORT}☠️`);
