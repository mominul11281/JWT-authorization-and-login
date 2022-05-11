import { Sequelize } from 'sequelize';
import config from './config.json';
const env = process.env.NODE_ENV || 'development';

const db = new Sequelize(
    config[env].database,
    config[env].username,
    config[env].password,
    {
        host: config[env].host,
        dialect: config[env].dialect,
        port: config[env].port,
        pool: {
            max: config[env].pool.max,
            min: config[env].pool.min,
            acquire: config[env].pool.acquire,
            idle: config[env].pool.idle,
        },
    }
);

export default db;
