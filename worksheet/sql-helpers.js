'use scrict';

const mysql = require("mysql2/promise");
const config = require("./config");

async function insertSingle(reg, make, model, year, price){
    const sql = await init();
    const insertQuery = sql.format("INSERT INTO car (reg, make, model, year, price) VALUES (? ? ? ? ?)",
        [reg, make, model, year, price]);
    console.log(insertQuery);
    await sql.query(insertQuery)
}

let sqlPromise = null;

async function init(){
    if (sqlPromise) return sqlPromise;
    sqlPromise = newConnection();
    return sqlPromise
}

async function newConnection() {
  const sql = await mysql.createConnection(config.mysql);
  sql.on('error', (err) => {
    console.error(err);
    sql.end();
  });
  return sql;
}

async function releaseConnection(connection) {
  await connection.end();
}

async function shutDown() {
  if (!sqlPromise) return;
  const stashed = sqlPromise;
  sqlPromise = null;
  await releaseConnection(await stashed);
}

module.exports = {
    insert: insertSingle,
    shutdown: shutDown
};
