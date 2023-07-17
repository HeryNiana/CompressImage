import React, { useState } from 'react';

export default function PhoneBookForm({ addEntryToPhoneBook }) {
  const style = {
    form: {
      container: {
        padding: '20px',
        border: '1px solid #F0F8FF',
        borderRadius: '15px',
        width: 'max-content',
        marginBottom: '40px'
      },
      inputs: {
        marginBottom: '5px'
      },
      submitBtn: {
        marginTop: '10px',
        padding: '10px 15px',
        border: 'none',
        backgroundColor: 'lightseagreen',
        fontSize: '14px',
        borderRadius: '5px'
      }
    }
  }

  const [contactInfo, setContactInfo] = useState({
    firstName: 'Codeur',
    lastName: 'Octet',
    phone: '8885559999'
  });

  const [phoneBook, setPhoneBook] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newEntry = { ...contactInfo };
    setPhoneBook([...phoneBook, newEntry]);
    addEntryToPhoneBook(newEntry);
    resetForm();
  };

  const resetForm = () => {
    setContactInfo({
      firstName: '',
      lastName: '',
      phone: ''
    });
  };

  return (
    <form style={style.form.container}>
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className='phoneBookFormFirstname'
        name='userFirstname'
        type='text'
        value={contactInfo.firstName}
        onChange={(e) =>
          setContactInfo((prevContact) => ({
            ...prevContact,
            firstName: e.target.value
          }))
        }
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className='phoneBookFormLastname'
        name='userLastname'
        type='text'
        value={contactInfo.lastName}
        onChange={(e) =>
          setContactInfo((prevContact) => ({
            ...prevContact,
            lastName: e.target.value
          }))
        }
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className='phoneBookFormPhone'
        name='userPhone'
        type='text'
        value={contactInfo.phone}
        onChange={(e) =>
          setContactInfo((prevContact) => ({
            ...prevContact,
            phone: e.target.value
          }))
        }
      />
      <br />
      <input
        style={style.form.submitBtn}
        className='submitButton'
        type='button'
        disabled={ !contactInfo.phone || !contactInfo.firstName || !contactInfo.lastName }
        value='Add User'
        onClick={handleFormSubmit}
      />
    </form>
  );
}
