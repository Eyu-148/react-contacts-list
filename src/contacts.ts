import localforage from "localforage";
import { matchSorter } from "match-sorter";

export interface singleContact {
  id: string,
  createAt: number,
  first?: string,
  last?: string,
  avatar?: string,
  twitter?: string,
  notes?: string,
  favorite?: boolean,
}

export async function getContacts() {
  let contacts:singleContact[] | null = [];
  await localforage.getItem<singleContact[]>("contacts").then((val)=>{
    contacts = val;
  });
  return contacts;
}

export async function getContact(id:string) {
  let contacts:singleContact[] | null = [];
  let contact:singleContact | undefined;
  await localforage.getItem<singleContact[]>("contacts").then((val)=>{
    contacts = val;
  });
  contact = contacts.find(contact => contact.id === id);
  console.log(contact);
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

export async function updateContact(id:string, updates:[]) {
    
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