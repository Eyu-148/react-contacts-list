// Global layout
import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {getContacts, createContact, singleContact} from "../contacts";


function handleSubmitNew() {
    createContact().then((data)=>{
        console.log(data);
    }).catch((err)=>{
        console.log(err);
    });
}


export default function Root() {
    const [contact_list, setList] = useState<singleContact[]>([]);
    useEffect(() => {
        async function loadingData() {
            const contact_list = await getContacts();
            console.log(contact_list);
            setList(contact_list);
        }
        loadingData(); //我超终于搞出来了
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
                    <form method="post" onSubmit={handleSubmitNew}>
                        <button type="submit">New</button>
                    </form>
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