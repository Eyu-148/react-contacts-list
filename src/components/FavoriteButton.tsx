// Favorite component => favorite button
import { Form, useFetcher } from "react-router-dom";


export function Favorite({ contact, handleFavorite }: { contact:singleContact, handleFavorite:Function }) {
    const fetcher = useFetcher();
    // yes, this is a `let` for later
    let favorite = contact.favorite;
    return (
      <fetcher.Form method="post">
        <button
          name="favorite"
          value={favorite ? "false" : "true"}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          onClick={()=>handleFavorite(!favorite)}
        >
          {favorite ? "★" : "☆"}
        </button>
      </fetcher.Form>
    );
  }