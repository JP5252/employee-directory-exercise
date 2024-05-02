import React, { useState, useEffect } from 'react';
import './App.css';
import { getEmployees, addEmployee, deleteEmployee, editEmployee} from './api';
import { Employee } from './components/shared';
import Popup from './components/popup';
import Table from './components/react-table';

function App(): JSX.Element {
  const emptyEmployeeData = {
    id: 0,
    name: '',
    code: '',
    profession: '',
    color: '',
    city: '',
    branch: '',
    assigned: false
  }
  const [employeeData, setEmployeeData] = useState<Employee>(emptyEmployeeData);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isDisplayingError, setIsDisplayingError] = useState<boolean>(false);

  // gets the employee list when page renders
  useEffect(() => {
    fetchEmployees();
  }, [employees]);

  // get the list of employees from the api
  // this will wait for a response from the api before setting the employees
  const fetchEmployees = async (): Promise<void> => {
    setEmployees(await getEmployees());
  };

  // triggered by add button, opens the popup window
  const openPopup = (): void => {
    setIsPopupOpen(true);
  };

  // triggered by close button, closes popup and resets isediting and error display
  const closePopup = (): void => {
    setIsPopupOpen(false);
    setIsEditing(false);
    setIsDisplayingError(false);
    setEmployeeData(emptyEmployeeData);
  };

  // triggered by edit button, sets isEditing to true and opens popup
  const handleEdit = (employee: Employee): void => {
    console.log("Editing employee:", employee);
    setEmployeeData(employee);
    setIsEditing(true);
    openPopup();
  };

  // triggered by the delete button, removes employee from the registry
  const handleDelete = async (id: number): Promise<void> => {
    // wait for confirmation of the delete
    await deleteEmployee(id);
  };

  // called from popup inputs to get the data from them
  const handleData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // checks if the type of input is a checkbox or not and set value based on that
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setEmployeeData({ ...employeeData, [e.target.name]: value });
  };

  // called when the add/edit button in the popup is pressed
  const handleSumbit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    // prevent a page reload
    e.preventDefault();

    // first make sure there are no empty values
    if (
      employeeData.name === '' ||
      employeeData.profession === '' ||
      employeeData.color === '' ||
      employeeData.city === '' ||
      employeeData.branch === ''
    ) {
      setIsDisplayingError(true);
      return;
    }

    // close the popup after confirming the data
    closePopup();
    
    // if the user is editing and employee
    if (isEditing) {
      // wait for the confirmation of the edit
      await editEmployee(employeeData);
      setIsEditing(false);
    } 
    // if the user is adding an employee
    else {
      // wait for the confirmations of the add
      await addEmployee(employeeData);
    }
    
  };  

  return (
    <>
      <div className='main-container'>
        <h3>Plexxis Employee Directory</h3>
        <button className='add-btn' onClick={openPopup}>Add Employee</button>
        <Popup 
          isPopupOpen={isPopupOpen}
          isEditing={isEditing}
          employeeData={employeeData}
          isDisplayingError={isDisplayingError}
          closePopup={closePopup}
          handleData={handleData}
          handleSumbit={handleSumbit}/>
        <Table
          employees={employees}
          handleEdit={handleEdit}
          handleDelete={handleDelete}/>
      </div>
    </>
  );
}

export default App;
