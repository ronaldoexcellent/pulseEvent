// config/db.js
const { Pool } = require('pg');
require('dotenv').config();

// Initialize the pool with environmental variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  // Automatically close connections that have sat idle for 30 seconds
  idleTimeoutMillis: 30000, 
  // Allow a maximum of 10 client connections at once
  max: 10, 
});

// Log a message when a connection is successfully established
pool.on('connect', () => {
  console.log('PostgreSQL database pool connected successfully.');
});

// Handle errors on idle clients to prevent crashing the server
pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client:', err);
  process.exit(-1);
});

module.exports = {
  // Use this query helper method in your controllers
  query: (text, params) => pool.query(text, params),
};



// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   idleTimeoutMillis: 30000,
//   max: 10,
// });

// pool.on('connect', () => {
//   console.log('✅ PostgreSQL database pool connected successfully.');
// });

// pool.on('error', (err) => {
//   console.error('❌ Unexpected error on idle PostgreSQL client:', err);
//   process.exit(-1);
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };