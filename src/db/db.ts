import dotenv from 'dotenv';
import pg from 'pg';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

const { Pool } = pg;

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});
