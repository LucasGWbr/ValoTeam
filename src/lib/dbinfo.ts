import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    password: 'postgres',
    database:'vamovalo',
})

export default pool;