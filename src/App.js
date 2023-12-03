import React, { useState, useEffect } from 'react';
import './App.css';
import AddNewContactForm from './components/AddNewContact';
import Contact from './components/Contact';

function App() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const addContact = async (newContact) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });

      if (!response.ok) {
        throw new Error('Failed to add new contact');
      }

      const addedContact = await response.json();
      setContacts([addedContact, ...contacts]);
    } catch (error) {
      console.error('Error adding contact:', error.message);
    }
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
  };

  const handleDeleteContact = async (contactId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${contactId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }

      setContacts(contacts.filter((contact) => contact.id !== contactId));
    } catch (error) {
      console.error('Error deleting contact:', error.message);
    }
  };

  const handleUpdateContact = async (updatedContact) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${selectedContact.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContact),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update contact');
      }
  
      const updatedData = await response.json();
      setContacts(contacts.map((contact) => (contact.id === selectedContact.id ? updatedData : contact)));
      setSelectedContact(null);
    } catch (error) {
      console.error('Error updating contact:', error.message);
      setContacts(contacts.map((contact) => (contact.id === selectedContact.id ? updatedContact : contact)));
      setSelectedContact(null);
    }
  };
  

  return (
    <div className="App">
      <div className="contact-heading">My Contact List</div>
      <AddNewContactForm addContact={addContact} />
      {Array.isArray(contacts) &&
        contacts.map((contact) => (
          <Contact
            key={contact.id}
            contact={contact}
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
            onUpdate={handleUpdateContact}
          />
        ))}
    </div>
  );
}

export default App;
