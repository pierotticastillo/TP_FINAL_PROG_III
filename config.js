import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_USER = process.env.DB_USER || 'concesionaria';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'conceder';
export const DB_DATABASE = process.env.DB_DATABASE || 'concesionaria';
// require('crypto').randomBytes(32).toString('hex');
export const JWT_SECRET = process.env.JWT_SECRET || '849f19bd341dbed0f1400dbc5273d03b3af770ccb41c6cb98951fae468257402';
export const USER_CORREO = process.env.USER_CORREO || 'ponersucorreo@correo.com';
export const PASS_CORREO = process.env.PASS_CORREO || 'ponersucontraseñadeaplicaciones';

