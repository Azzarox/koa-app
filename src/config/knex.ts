import knex from 'knex';
import { config } from '../../config';

const isProd = process.env.NODE_ENV === 'production';

const setup = {
    client: 'pg',
    connection: {
        connectionString: config.DATABASE_URL,
        ...(isProd && { ssl: { rejectUnauthorized: false } }),
    },
};

export const knexSetup = setup;
export const db = knex(setup);