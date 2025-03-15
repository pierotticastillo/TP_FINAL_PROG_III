import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_USER = process.env.DB_USER || 'concesionaria';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'conceder';
export const DB_DATABASE = process.env.DB_DATABASE || 'concesionaria';
// Si desea utilizar una contraseña aleatoria para firmar su token require('crypto').randomBytes(32).toString('hex');
export const JWT_SECRET = process.env.JWT_SECRET || 'Ponersucontraseñasecret';
export const USER_CORREO = process.env.USER_CORREO || 'ponersucorreo';
export const PASS_CORREO = process.env.PASS_CORREO || 'ponersucontraseñadeaplicaciones';

