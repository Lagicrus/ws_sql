/**

1. `saveCar` with the following parameters: `reg`, `make`,
 *     `model`, `year`, and `price`. The function stores
 *     the information in a suitable database table
 *     that you create.
 *
 *  2. `getAveragePrice` with one parameter: `year`.
 *     The function should return the average price of all known cars
 *     from the given year. In case of an error (such as that we don't
 *     have any cars from the given year) it should return `null`.
 *
 *  3. `shutdown` with no parameters. The function closes any connection(s)
 *     used by the module. Use `await connection.end()` – substitute the
 *     word `connection` with the name of your own variable initialized
 *     with the call to `mysql.createConnection()`.

 **/
const sqlHelpers = require("./sql-helpers");

async function saveCar(reg, make, model, year, price){
    await sqlHelpers.insert(reg, make, model, year, price);
    console.log(`Inserted ${reg} ${make}`);
    await sqlHelpers.shutdown();
}

async function getAveragePrice(year){
    return await sqlHelpers.getAveragePrice(year)
}

async function shutdown(){
    await sqlHelpers.shutdown();
}

module.exports.saveCar = saveCar;
module.exports.getAveragePrice = getAveragePrice;
module.exports.shutdown = shutdown;
