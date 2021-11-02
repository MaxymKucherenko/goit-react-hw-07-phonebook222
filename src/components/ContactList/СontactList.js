import { toast, Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import {
  useFetchContactsQuery,
  useDeleteContactMutation,
} from '../../redux/contacts/contacts-slice';
import Filter from '../Filter/Filter';
import styles from './contactList.module.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const { data, isFetching } = useFetchContactsQuery();

  useEffect(() => {
    if (data) {
      setContacts(data);
    }
  }, [data]);

  function memoize(func) {
    var cache = {};
    return function () {
      var key = JSON.stringify(arguments);
      if (cache[key]) {
        return cache[key];
      } else {
        var val = func.apply(this, arguments);
        cache[key] = val;
        return val;
      }
    };
  }

  const onFilterContacts = memoize(function (filter) {
    if (filter) {
      const normalizedFilter = filter.toLowerCase();

      return setContacts(
        contacts.filter((contact) =>
          contact.name.toLowerCase().includes(normalizedFilter)
        )
      );
    } else {
      setContacts(data);
    }
  });

  const [deleteContact] = useDeleteContactMutation();
  const onDeleteContact = async (contactId) => {
    await deleteContact(contactId).unwrap();
    toast.success('Contact deleted');
  };

  return (
    <div>
      <Filter filter={onFilterContacts} />
      {contacts && (
        <ul className={styles.list}>
          {contacts.map(({ name, number, id }) => (
            <li className={styles.listItem} key={id}>
              <p className={styles.contactName}>
                {name}: {number}
              </p>
              <button
                className={styles.contactBtn}
                onClick={() => onDeleteContact(id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <div>
        <Toaster />
      </div>

      {isFetching && <h1>Waiting...</h1>}
    </div>
  );
};

export default ContactList;
