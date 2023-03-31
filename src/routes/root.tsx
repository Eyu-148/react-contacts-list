// Global layout
import { useEffect, useState } from "react";
import { Outlet, Link, Form, useNavigate, redirect } from "react-router-dom";
import {getContacts, createContact} from "../contacts";

export async function actionNew() {
    const contact:singleContact = await createContact();
    console.log(contact);
    return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
    const [contact_list, setList] = useState<singleContact[]>([]);

    useEffect(() => {
        async function loadingData() {
            const contact_list = await getContacts();
            setList(contact_list);
        }
        loadingData();
    }, []);
    
    return(
        <>
            <div className="sidebar">
                <h1>Contacts List</h1>
                <div>
                    <form className="search-form" role="search">
                        <input className="search-input" aria-label="search contacts" 
                               placeholder="Search..." type="search" name="Jane Joe" />
                        <div className="search-spinner" aria-hidden hidden={true} />
                        <div className="sr-only" aria-live="polite" />
                    </form>
                    <Form method="post">
                        <button className="btn-newContact" type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {contact_list.length ? (
                        <ul>
                            {contact_list.map((contact) => (
                                <li key={contact.id}>
                                    <Link to={`contacts/${contact.id}`}>
                                        {contact.first || contact.last ? 
                                        (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}{contact.favorite && <span>★</span>}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p><i>No Contacts</i></p>
                    )}
                </nav>
            </div>
            <div className="detail">
                <Outlet />
            </div>
        </>
    );
}