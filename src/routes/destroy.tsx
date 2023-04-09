import { Params, redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function actionDestroy({ params }:{params:Params}) {
  await deleteContact(params.contactId ?? '');
  return redirect("/");
}