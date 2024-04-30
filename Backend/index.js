const express = require('express');
const app = express();
const port=8080;
const cors=require('cors')
const pool = require('./database')

app.use(express.json());
app.use(cors());

app.listen(port, error => {
  if (error) {
    return console.error('Unable to start the server:', error);
  }
  console.log(`Server is running on port: ${port}`);
})

// getting the employee data
app.get('/employees', (req, res) => {
  // create the statement for getting the employees from the server
  const selectStmt = 'SELECT * FROM employees';

  // run the query
  pool
  .query(selectStmt)
  .then((result) => {
    return res.json(result.rows);
  })
  .catch((err) => {
    console.error('Error fetching employees from database:', err);
    return err;
  });
});

// for adding a new employee
app.post('/employees/add/', (req,res) => {
  // creating the statement to insert employee into database
  const insertStmt = `INSERT INTO 
                      employees (name, profession, color, city, branch, assigned) 
                      VALUES ($1, $2, $3, $4, $5, $6)`;
  const values = [req.body.name, 
                  req.body.profession, 
                  req.body.color, 
                  req.body.city, 
                  req.body.branch, 
                  req.body.assigned];

  // run the query
  pool
  .query(insertStmt, values)
  .then((result) => {
    console.log('employee added:' , result);
    return res.json({ message: 'employee added successfully' });
  })
  .catch((err) => {
    console.error('Error adding employee to database:', err);
    return err;
  })
})

// for editing employee information
app.patch('/employees/edit/:id', (req,res) => {
  const updateStmt = `UPDATE employees 
                      SET 
                      name = $1, 
                      profession = $2, 
                      color = $3, 
                      city = $4, 
                      branch = $5, 
                      assigned = $6 
                      WHERE id = $7`;
    
  const values = [req.body.name, 
                  req.body.profession, 
                  req.body.color, 
                  req.body.city, 
                  req.body.branch, 
                  req.body.assigned, 
                  req.params.id];


  // run the query
  pool
  .query(updateStmt, values)
  .then((result) => {
    console.log('employee edited: ', result)
    return res.json({ message: 'employee edited successfully' });
  })
  .catch((err) => {
    console.error('Error editing employee in database:', err);
    return err;
  })
})



// for deleting employees
app.delete('/employees/remove/:id', (req,res) => {
  // create the delete statement  
  const deleteStmt = `DELETE FROM employees WHERE id = $1`

  // run the query
  pool
  .query(deleteStmt, [req.params.id])
  .then((result) => {
    console.log('employee removed: ', result);
    return res.json({ message: 'employee removed successfully' });
  })
  .catch((err) => {
    console.error('Error removing employee from the database:', err);
    return err;
  })
})