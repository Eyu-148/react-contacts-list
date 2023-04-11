// Favorite component => favorite button
import { Form, useFetcher } from "react-router-dom";


export function Favorite({ contact }: { contact:singleContact }) {
    const fetcher = useFetcher();
    // yes, this is a `let` for later
    let favorite = contact.favorite;
    return (
      <fetcher.Form method="post">
        <button
          name="favorite"
          value={favorite ? "false" : "true"}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? "★" : "☆"}
        </button>
      </fetcher.Form>
    );
  }