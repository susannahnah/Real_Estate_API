
const pg = require('pg');

let config = {};

if (process.env.DATABASE_URL) {
  // Heroku gives a url, not a connection object
  // https://github.com/brianc/node-pg-pool
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true, // heroku requires ssl to be true
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, 
  };
} else {
  config = {
    host: 'localhost', 
    port: 5001, 
    database: 'RealEstateAPI', 
    idleTimeoutMillis: 30000, 
  };
}



module.exports = new pg.Pool(config);
