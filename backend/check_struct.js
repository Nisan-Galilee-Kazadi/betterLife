const mysql = require('mysql2/promise');
require('dotenv').config();

const DB_CONFIG = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'betterlife_db'
};

async function checkStructure() {
    let connection;
    try {
        connection = await mysql.createConnection(DB_CONFIG);
        const [rows] = await connection.execute('DESCRIBE team_members');
        console.log('--- team_members structure ---');
        console.table(rows);

        const [data] = await connection.execute('SELECT * FROM team_members');
        console.log('--- team_members data ---');
        console.log(JSON.stringify(data, null, 2));

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        if (connection) await connection.end();
    }
}

checkStructure();
