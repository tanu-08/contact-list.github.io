import React, { useState } from 'react';
import '../components/Contact.css';
import { FaPen, FaTrash } from 'react-icons/fa';

const Contact = ({ contact, onEdit, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(contact.name);
  const [editedPhone, setEditedPhone] = useState(contact.phone);

  const handleEdit = () => {
    setIsEditing(true);
    onEdit(contact);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName(contact.name);
    setEditedPhone(contact.phone);
  };

  const handleUpdate = () => {
    const updatedContact = {
      ...contact,
      name: editedName,
      phone: editedPhone,
    };
    console.log('Updated Name:', editedName); // Debugging line
    console.log('Updated Phone:', editedPhone); // Debugging line
    onUpdate(updatedContact);
    setIsEditing(false);
  };

  return (
    <div className="contact">
      <div className="contact-container">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              required
            />
            <input
              type="tel"
              value={editedPhone}
              onChange={(e) => setEditedPhone(e.target.value)}
              required
            />
          </>
        ) : (
          <>
            <div className="user-name">{contact.name}</div>
            <div className="phone-num">{contact.phone}</div>
          </>
        )}
      </div>
      {isEditing ? (
        <>
        <button className="edit-button" onClick={handleUpdate}>
          Save
        </button>
        <button className="edit-button" onClick={handleCancelEdit}>
          Cancel
        </button>
      </>
      
      ) : (
        <>
          <span className="edit-icon" onClick={handleEdit}>
            <FaPen size={20} />
          </span>
          <span className="delete-icon" onClick={() => onDelete(contact.id)}>
            <FaTrash size={20} />
          </span>
        </>
      )}
    </div>
  );
};

export default Contact;
