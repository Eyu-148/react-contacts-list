import { useEffect, useState } from "react";
import { Form, useLoaderData, useParams } from "react-router-dom";
import { getContact, singleContact } from "../contacts";


export default function Contact() {

  // rendering
  return (
      <div id="contact">
        No thing here.
      </div>
    );
}

// Favorite component => favorite button
function Favorite({ contact }: { contact:singleContact }) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}