'use scrict';

const mysql = require("mysql2/promise");
const config = require("./config");

async function insertSingle(reg, make, model, year, price){
    const sql = await init();
    const insertQuery = sql.format("INSERT INTO cars (reg, make, model, year, price) VALUES (?, ?, ?, ?, ?)",
        [reg, make, model, year, price]);
    console.log(insertQuery);
    await sql.query(insertQuery)
}

async function getAveragePrice(year){
    const sql = await init();
    const query = sql.format("SELECT price FROM cars WHERE year = ?",
        year);
    let [rows, fields] = await sql.query(query);
    let avg_list = [];
    console.log(rows);
    for (data of rows){
        avg_list.push(data.price)
    }
    console.log(avg_list);
    console.log(rows[0].price);
    let sum = avg_list.reduce(function (accumulator, currentValue){
        return accumulator + currentValue;
    }, 0);
    return sum/avg_list.length;
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
    shutdown: shutDown,
    getAveragePrice: getAveragePrice
};
