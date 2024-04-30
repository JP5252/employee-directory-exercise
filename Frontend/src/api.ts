import axios from 'axios';
import { Employee } from './components/shared';

// api call for getting the list of the employees from the directory
export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const res = await axios.get<Employee[]>('http://localhost:8080/employees');
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// api call for adding an employee to the directory
export const addEmployee = async (employeeData: Employee): Promise<void> => {
	try {
		await axios.post<Employee>('http://localhost:8080/employees/add/', employeeData);
	} catch (error) {
	  console.error(error);
	}
  };

// api call for deleting an employee from the directory
export const deleteEmployee = async (id: number): Promise<void> => {
  try {
    await axios.delete(`http://localhost:8080/employees/remove/${id}`);
  } catch (error) {
    console.error(error);
  }
};

// api call for editing an employee in the directory
export const editEmployee = async (employeeData: Employee): Promise<void> => {
	try {
	  await axios.patch<Employee>(`http://localhost:8080/employees/edit/${employeeData.id}`, employeeData);
	} catch (error) {
	  console.error(error);
	}
  };