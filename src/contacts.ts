import localforage from "localforage";

export async function getContacts() {
  let contacts:singleContact[] | null = [];
  await localforage.getItem<singleContact[]>("contacts").then((val)=>{
    contacts = val;
  });
  return contacts;
}

export async function getContact(id:string|undefined) {
  let contacts:singleContact[] | null = [];
  let contact:singleContact | undefined;
  await localforage.getItem<singleContact[]>("contacts").then((val)=>{
    contacts = val;
  });
  contact = contacts.find(contact => contact.id === id);
  return contact ?? null;
}

export async function createContact() {
  let id:string = Math.random().toString(36).substring(2, 9);
  let contact:singleContact = {
    id, 
    createAt: Date.now(),
  };
  let contacts:singleContact[];
  await getContacts().then((data)=>{
    contacts = data;
    contacts.unshift(contact);
    localforage.setItem("contacts", contacts);
  });
  return contact;
}

export async function updateContact(id:string, updates:{[k: string]: FormDataEntryValue;}) {
  let contact:singleContact | undefined;
  let contacts:singleContact[];
  await getContacts().then((data)=>{
    contacts = data;
    contact = contacts.find(contact=>contact.id === id);
    if (!contact) throw new Error("No contact found for" + id);
    Object.assign(contact, updates);
    localforage.setItem("contacts", contacts);
    return contact;
  });
}

export async function deleteContact(id:string) {
    
}

export async function cleanContacts() {
  localforage.clear().then(()=>{
    console.log("Database is now empty.");
  }).catch((err)=>{
    console.log(err);
  });
}