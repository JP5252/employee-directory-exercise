import React from 'react';
import { Employee } from './shared';

// interface for the popup to receive all the props it needs
interface popupProps {
  isPopupOpen: boolean;
  isEditing: boolean;
  employeeData: Employee;
  isDisplayingError: boolean;
  closePopup: () => void;
  handleData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSumbit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const Popup: React.FC<popupProps> = ({
  isPopupOpen,
  isEditing,
  employeeData,
  isDisplayingError,
  closePopup,
  handleData,
  handleSumbit
}) => {
  return (
    isPopupOpen && (
      <div className='add-edit-popup'>
        <span className='close-btn' onClick={closePopup}>&times;</span>
        <h4 className='add-edit-title'>Employee Details</h4>
        {isDisplayingError && (
          <h5 className='error-message'>Some values seem to be missing/invalid.</h5>
        )}

        <div className='add-edit-inputs'>
		<label className='popup-label' htmlFor='name'>Full Name:</label>
                <input className='popup-input' type="text" name="name" id="name" value={employeeData.name} onChange={handleData} />

                <label className='popup-label' htmlFor='profession'>Profession: </label>
                <input className='popup-input' type="text" name="profession" id="Profession" value={employeeData.profession} onChange={handleData} />

                <label className='popup-label' htmlFor='color'>Color: </label>
                <input className='popup-input' type="text" name="color" id="color" value={employeeData.color} onChange={handleData} />

                <label className='popup-label' htmlFor='city'>City: </label>
                <input className='popup-input' type="text" name="city" id="city" value={employeeData.city} onChange={handleData} />

                <label className='popup-label' htmlFor='branch'>Branch: </label>
                <input className='popup-input' type="text" name="branch" id="branch" value={employeeData.branch} onChange={handleData} />

                <label className='popup-label' htmlFor='assigned'>Assigned: </label>
                <input className='popup-input' type="checkbox" name="assigned" id="assigned" checked={employeeData.assigned} onChange={handleData} />
          
          {isEditing ? (
            <button className='edit-btn' onClick={handleSumbit}>Save Changes</button>
          ) : (
            <button className='add-btn' onClick={handleSumbit}>Add</button>
          )}
        </div>
      </div>
    )
  );
}

export default Popup;
