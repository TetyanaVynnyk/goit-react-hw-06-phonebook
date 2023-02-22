import { useSelector, useDispatch } from 'react-redux';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import {addContact, deleteContact} from "../../redux/contacts/contacts-slice";
import {setFilter} from "../../redux/filter/filter-slice";

import { getAllContacts, getFilteredContacts } from "../../redux/contacts/contacts-selectors";
import {getFilter} from "../../redux/filter/filter-selectors";


const Phonebook = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const allContacts = useSelector(getAllContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const isDublicate = name => {
    const normalizedName = name.toLowerCase();
    const result = allContacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });

    return Boolean(result);
  };

  const handleAddContact = ({ name, number }) => {
    if (isDublicate(name)) {
      alert(`${name} is already in contacts.`);
      return false;
    }

    dispatch(addContact({ name, number }));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleFilter = ({ target }) => {
    dispatch(setFilter(target.value))
  };

  const isContacts = Boolean(filteredContacts.length);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2>Contacts</h2>
      {isContacts ? (
        <div>
          <Filter value={filter} changeFilter={handleFilter} />
          <ContactList
            contacts={filteredContacts}
            onDeleteContacts={handleDeleteContact}
          />
        </div>
      ) : (
        <p>You have no contacts</p>
      )}
    </div>
  );
};

export default Phonebook;
