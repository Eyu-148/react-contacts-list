import { useEffect, useState } from "react";
import { useParams, useNavigate, Form, redirect, Params } from "react-router-dom";
import { getContact, updateContact } from "../contacts";
import { defaultContact} from "../models/interfaces";


export async function actionEdit({ request, params }:{request:Request, params: Params}) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId ?? '', updates);
    return redirect(`/contacts/${params.contactId}`);
}

export default function NewContact({isNew}:newContactProps) {
    const navigate = useNavigate();
    const {contactId} = useParams<string>();
    const [contact, setContact] = useState<singleContact>(defaultContact);

    useEffect(()=>{
        async function loadingData() {
        const contact = await getContact(contactId);
        if (contact !== null) setContact(contact);
        }
        loadingData();
    }, []);

    return (
        <Form method="post" id="contact-form">
            <p>
                <span>Name</span>
                <input
                    placeholder={isNew ? "First Name":contact.first}
                    aria-label="First name"
                    type="text"
                    name="first"
                    defaultValue={isNew ? "First Name":contact.first}
                />
                <input
                    placeholder={isNew ? "Last Name":contact.last}
                    aria-label="Last name"
                    type="text"
                    name="last"
                    defaultValue={isNew ? "Last Name":contact.last}
                />
            </p>
            <label>
                <span>Twitter</span>
                <input
                    type="text"
                    name="twitter"
                    placeholder={isNew ? "@jack":contact.twitter}
                    defaultValue={isNew ? "@jack":contact.twitter}
                />
            </label>
            <label>
                <span>Avatar URL</span>
                <input
                    placeholder={isNew ? "https://example.com/avatar.jpg":contact.avatar}
                    aria-label="Avatar URL"
                    type="text"
                    name="avatar"
                    defaultValue={isNew ? "https://example.com/avatar.jpg":contact.avatar}
                />
            </label>
            <label>
                <span>Notes</span>
                <textarea
                    name="notes"
                    defaultValue={contact.notes}
                    rows={6}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button type="button" onClick={()=>navigate(-1)}>Cancel</button>
            </p>
        </Form>
    );
}