import mysql from 'mysql2/promise';
import * as config from '../../config.js';

const pool = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    port: config.DB_PORT
});

export default pool;
