const mysql = require('mysql2/promise');
const config = require('../config');

async function selectBooks() {
    const sql = 'SELECT * FROM book';
    const connection = await mysql.createConnection(config.db);
    const [results,] = await connection.execute(sql);

    return results;
}

async function selectBookById(id) {
    const sql = 'SELECT * FROM book WHERE id=?';
    const connection = await mysql.createConnection(config.db);
    const [results,] = await connection.execute(sql, [id]);

    if (results.length == 1) {
        return results[0];
    } else {
        return undefined;
    }
}

module.exports = {
    selectBooks, selectBookById
}