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

createDb = 'CREATE DATABASE employee_directory'

createTbl = `CREATE TABLE employees (
			 id serial PRIMARY KEY,
			 name VARCHAR(50) NOT NULL,
		 	 code VARCHAR(5) UNIQUE NOT NULL,
			 profession VARCHAR(50) NOT NULL,
			 color VARCHAR(50) NOT NULL,
			 city VARCHAR(50) NOT NULL,
			 branch VARCHAR(50) NOT NULL,
			 assigned BOOL);`

createTriggerFunc = `CREATE OR REPLACE FUNCTION set_employee_code()
					 RETURNS TRIGGER AS $$
					 BEGIN
					 NEW.code := 'F' || (NEW.id + 99);
					 RETURN NEW;
					 END;
					 $$ LANGUAGE plpgsql;`

createTrigger = `CREATE TRIGGER before_insert_employee
				 BEFORE INSERT ON employees
				 FOR EACH ROW
				 EXECUTE FUNCTION set_employee_code();`

/*
run each one of the queries above to set up the database for use
pool
.query(createDb);
.then(res) => {
	console.log(res);
}
.catch(err) => {
	console.error(err);
}
*/

module.exports = pool;