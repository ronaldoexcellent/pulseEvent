const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

// Log a message when a connection is successfully established
pool.on('connect', () => {
  console.log('✅ PostgreSQL database pool connected successfully.');
});

// Handle errors on idle clients to prevent crashing the server
pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle PostgreSQL client:', err);
  process.exit(-1);
});

module.exports = pool;