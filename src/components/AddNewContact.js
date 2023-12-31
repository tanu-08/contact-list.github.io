import React, { useState } from 'react';
import '../components/AddNewContact.css';

const AddNewContactForm = ({ addContact }) => {
  //setting initial state for name and contact umber
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
//on submit click sending data to add contact prop function and api is called
  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      name,
      phone: mobileNumber,
    };
    addContact(newContact);
    setName('');
    setMobileNumber('');
  };

  return (
    <div className="add-contact">
      <form className="add-contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="mobileNumber">Mobile Number:</label>
        <input
          type="tel"
          id="mobileNumber"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          required
        />
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export default AddNewContactForm;
