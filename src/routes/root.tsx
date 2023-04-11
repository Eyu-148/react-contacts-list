// Global layout
import { useEffect, useState } from "react";
import { Outlet, NavLink, Form, redirect, useNavigation } from "react-router-dom";
import {getContacts, createContact} from "../contacts";

export async function actionNew() {
    const contact:singleContact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
    const navigation = useNavigation(); // this should work with loader to show a pending UI
    const [contact_list, setList] = useState<singleContact[]>([]);
    const [query, setQuery] = useState<string>("");

    useEffect(() => {
        async function loadingData() {
            const contacts = await getContacts();
            if (contacts) setList(contacts);
        }
        loadingData();
    }, [query]);

    return(
        <>
            <div className="sidebar">
                <h1>Contacts List</h1>
                <div>
                    <form className="search-form" role="search">
                        <input id="search-input" aria-label="search contacts" 
                               placeholder="Search..." type="search" name="search" 
                               onChange={(event)=>{setQuery(event.target.value)}}/>
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
                            {contact_list.filter((c) => {
                                if (query === "") {
                                    return c
                                }
                                else if (c.first?.toLowerCase().includes(query.toLowerCase()) || 
                                         c.first?.toLowerCase().includes(query.toLowerCase())) {
                                    return c;
                                }
                            }).map((c) => (
                                <li key={c.id}>
                                    <NavLink to={`contacts/${c.id}`}
                                             className={({isActive, isPending})=>
                                                isActive ? "active" : isPending ? "pending" : ""
                                            }>
                                        {c.first || c.last ? 
                                        (
                                            <>
                                                {c.first} {c.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}{c.favorite && <span>★</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p><i>No Contacts</i></p>
                    )}
                </nav>
            </div>
            <div id="detail" className={navigation.state==="loading"?"loading":""}>
                <Outlet />
            </div>
        </>
    );
}