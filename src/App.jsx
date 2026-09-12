import { useState } from "react";
import "./App.css";
import contactsData from "./contacts.json";

function App() {
  const firstFiveContacts = contactsData.slice(0, 5);
  const [contacts, setContacts] = useState(firstFiveContacts);

  // Añadir contacto aleatorio de verdad (filtrando los que ya están mostrados para que no se repitan)
  const addRandomContact = () => {
    const remainingContacts = contactsData.filter(
      (contact) => !contacts.some((c) => c.id === contact.id),
    );

    if (remainingContacts.length === 0) {
      alert("¡Ya se han mostrado todos los contactos de la lista!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];

    setContacts((prevContacts) => [randomContact, ...prevContacts]);
  };

  // Ordenar por Nombre (A-Z)
  const sortByName = () => {
    const sortedByName = [...contacts].sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    setContacts(sortedByName);
  };

  // Ordenar por Popularidad (Mayor a menor)
  const sortByPopularity = () => {
    const sortedByPopularity = [...contacts].sort((a, b) => {
      return b.popularity - a.popularity;
    });
    setContacts(sortedByPopularity);
  };

  // Eliminar contacto por ID
  const deleteContact = (contactId) => {
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId,
    );
    setContacts(filteredContacts);
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>

      <div className="button-container">
        <button className="btn-add" onClick={addRandomContact}>
          Add Random Contact
        </button>
        <button className="btn-sort" onClick={sortByPopularity}>
          Sort by popularity
        </button>
        <button className="btn-sort" onClick={sortByName}>
          Sort by name
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            return (
              <tr key={contact.id}>
                <td>
                  <img src={contact.pictureUrl} alt={contact.name} />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                <td>{contact.wonOscar ? "🏆" : ""}</td>
                <td>{contact.wonEmmy ? "🌟" : ""}</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => deleteContact(contact.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
