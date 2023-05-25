const Pool = require('pg').Pool
const pool = new Pool({
  user: 'api_diplom',
  host: 'localhost',
  database: 'diplom',
  password: 'root',
  port: 5432,
});

module.exports = pool