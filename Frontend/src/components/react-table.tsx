// implements react-table
// REF: - https://www.youtube.com/watch?v=A9oUTEP-Q84
//      - https://stackoverflow.com/questions/48945832/react-table-add-edit-delete-column

import React from 'react';
import { useTable , Row, Column } from 'react-table';
import { Employee } from './shared';

interface TableProps {
  employees: Employee[];
  handleEdit: (employee: Employee) => void;
  handleDelete: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ employees, handleEdit, handleDelete }) => {
  const data = React.useMemo(() => employees, [employees]);
  const columns: Column<Employee>[] = React.useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id'
    },
    {
      Header: 'Full Name',
      accessor: 'name'
    },
    {
      Header: 'Code',
      accessor: 'code'
    },
    {
      Header: 'Profession',
      accessor: 'profession'
    },
    {
      Header: 'Color',
      accessor: 'color',
      Cell: ({ value }: { value: string }) => (
          // this was the only way I could get the color to display in the table
          // data, I was unable to edit the td itself like in the html table.
          <div
            className='color-cell'
            style={{height: '50px', width: '50px',backgroundColor: isValidColor(value) ? value : 'white'}}
          >
          {isValidColor(value) ? null : value}
          </div>
      )
    },
    {
      Header: 'City',
      accessor: 'city'
    },
    {
      Header: 'Branch',
      accessor: 'branch'
    },
    {
      Header: 'Assigned',
      accessor: 'assigned',
      Cell: ({ value }: { value: boolean }) => (
        // Would be better to have this directly in td for dynamic size changing
        <span>{value ? 'true' : 'false'}</span>
      )
    },
    {
      Header: 'Edit',
      Cell: ({ row }: { row: Row<Employee> }) => (
        <button className='edit-btn' onClick={() => handleEdit(row.original)}>Edit</button>
      )
    },
    {
      Header: 'Delete',
      Cell: ({ row }: { row: Row<Employee> }) => (
        <button className='delete-btn' onClick={() => handleDelete(row.original.id)}>Delete</button>
      )
    }
  ], []);

  // for checking if the employees color is a valid color
  // REF: https://stackoverflow.com/questions/48484767/javascript-check-if-string-is-valid-css-color
  const isValidColor = (color: string): boolean => {
    // apply color to a style
    const s = new Option().style;
    s.color = color;
    // if the color is valid the string will not be empty
    return s.color !== '';
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  return (
    <table {...getTableProps()} className='employee-table'>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;