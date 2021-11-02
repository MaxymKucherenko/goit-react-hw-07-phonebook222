import Form from './components/Form/Form';
import ContactsList from './components/ContactList/СontactList';
/* import Filter from './components/Filter/Filter'; */

import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Phonebook</h1>
      </header>
      <Form />
      <div>
        <h2>CONTACTS</h2>

        <ContactsList />
      </div>
    </div>
  );
}
