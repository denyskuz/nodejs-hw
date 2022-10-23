const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.resolve('./db/contacts.json');
const shortid = require('shortid');


// get all contacts from JSON
async function listContacts() {
    await fs.readFile(contactsPath).then(data => { 
        const contact = JSON.parse(data)
        console.table(contact)
    })
  .catch(err => console.table(err.message));
}
// get contact by id
async function getContactById(contactId) {
  await fs.readFile(contactsPath).then(data => { 
      const contact = JSON.parse(data).filter(contact => contact.id == contactId);
        console.table(contact)
    })
  .catch(err => console.table(err.message));
}

// remove contact by id from JSON
async function removeContact(contactId) {
    await fs.readFile(contactsPath).then(data => { 
        const contacts = JSON.parse(data);
        const objWithIdIndex = contacts.findIndex((contact) => contact.id == contactId);
        contacts.splice(objWithIdIndex, 1);
        
        const contactsList = JSON.stringify([...contacts], null, '\t')
        fs.writeFile(contactsPath, contactsList)
            .then(() => {
                console.log('Removed successfully');
             })
            .catch(err => console.error(err.message));
    })
    .catch(err => console.error(err.message));
}

// add contact 
async function addContact(name, email, phone) {
    await fs.readFile(contactsPath).then(data => { 
        const contacts = JSON.parse(data);
        const contactNew = {id: shortid.generate(), name, email, phone }
        const contactsList = JSON.stringify([contactNew, ...contacts], null, '\t')
        fs.writeFile(contactsPath, contactsList)
            .then(() => {
                console.log('Added successfully');
                console.table(contactNew);        
             })
            .catch(err => console.error(err.message));
    
    })
    .catch(err => console.error(err.message));
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}