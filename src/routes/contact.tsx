import localforage from "localforage";
import { useEffect, useState } from "react";
import { Form, Params, useParams } from "react-router-dom";
import { getContact, getContacts, updateContact } from "../contacts";
import { defaultContact } from "../models/interfaces";
import { Favorite } from "../components/FavoriteButton";

export async function handleFavorite({ request, params }:{request:Request, params: Params}) {
  let formData = await request.formData();
  let updates = {
    favorite: formData.get("favorite") === "true"
  };
  console.log("favorite");
  return updateContact(params.contactId ?? '', updates);
}

export default function Contact() {
  const {contactId} = useParams<string>();
  const [contact, setContact] = useState<singleContact>(defaultContact);
  const [favor, setFavorite] = useState<boolean>(false);

  useEffect(()=>{
    getContact(contactId).then((res) => {
      if (res) setContact(res);
      setFavorite(contact.favorite ?? false);
    })
  }, [contactId, favor]);


  // rendering
  return (
    <div className="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} handleFavorite={setFavorite} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action={`/contacts/${contact.id}/edit`}>
            <button className="btn-edit" type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
