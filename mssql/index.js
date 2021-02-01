const mssql = require("mssql");
const config = {
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  server: process.env.MSSQL_SERVER,
  database: process.env.MSSQL_DB,
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
};

const pool = new mssql.ConnectionPool(config);
const poolCon = pool.connect();

pool.on("error", (err) => {
  console.err(err);
});

module.exports = pool;
