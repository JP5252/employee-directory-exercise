// file for the postgres database
// REF: https://www.youtube.com/watch?v=WKfwyEDjEgM

const {Pool} = require('pg');

const pool = new Pool({
	user: 'postgres',
	password: 'admin',
	hostL: 'localhost',
	port: 5432,
	database: 'employee_directory'
})

module.exports = pool;