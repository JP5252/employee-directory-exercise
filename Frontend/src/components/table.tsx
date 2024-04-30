import React from 'react';
import { Employee } from './shared';

interface tableProps {
  employees: Employee[];
  handleEdit: (employee: Employee) => void;
  handleDelete: (id: number) => void;
}

const Table: React.FC<tableProps> = ({ employees, handleEdit, handleDelete }) => {
  
  // for checking if the employees color is a valid color
  // REF: https://stackoverflow.com/questions/48484767/javascript-check-if-string-is-valid-css-color
  const isValidColor = (color: string): boolean => {
    // apply color to a style
    const s = new Option().style;
    s.color = color;
    // if the color is valid the string will not be empty
    return s.color !== '';
  };

  return (
    <table className='employee-table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Code</th>
          <th>Profession</th>
          <th>Color</th>
          <th>City</th>
          <th>Branch</th>
          <th>Assigned</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(employee => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.code}</td>
            <td>{employee.profession}</td>
            <td style={{ backgroundColor: isValidColor(employee.color) ? employee.color : 'white' }}>
              {isValidColor(employee.color) ? null : employee.color}
            </td>
            <td>{employee.city}</td>
            <td>{employee.branch}</td>
            <td>{String(employee.assigned)}</td>
            <td><button className='edit-btn' onClick={() => handleEdit(employee)}>Edit</button></td>
            <td><button className='delete-btn' onClick={() => handleDelete(employee.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
