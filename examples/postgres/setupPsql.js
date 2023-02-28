'use strict';

const { Pool } = require('pg');

// create new pool for psql
const CONFIG = {
  connectionString: "postgresql://postgres:postgres@localhost:54320/postgres"
};

function startPsql() {
  const pool = new Pool(CONFIG);

  pool.connect((connectErr, client, release) => {
    if (connectErr) throw connectErr;
    release();
    const queryText = 'CREATE TABLE IF NOT EXISTS test(id SERIAL PRIMARY KEY, text VARCHAR(40) not null)';
    client.query(queryText, (err, res) => {
      if (err) throw err;
      console.log(res.rows[0]);
    });
  });

  return pool;
}

exports.startPsql = startPsql;
