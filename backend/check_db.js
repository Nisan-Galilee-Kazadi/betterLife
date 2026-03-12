const mysql = require('mysql2/promise');
require('dotenv').config();

const DB_CONFIG = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'betterlife_db'
};

async function checkTeam() {
    let connection;
    try {
        connection = await mysql.createConnection(DB_CONFIG);
        const [rows] = await connection.execute('SELECT id, name, email FROM team_members');
        console.log('--- TEAM MEMBERS ---');
        console.log(JSON.stringify(rows, null, 2));

        const [delRows] = await connection.execute('SELECT id, name, email FROM delegates');
        console.log('--- DELEGATES ---');
        console.log(JSON.stringify(delRows, null, 2));
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        if (connection) await connection.end();
    }
}

checkTeam();
