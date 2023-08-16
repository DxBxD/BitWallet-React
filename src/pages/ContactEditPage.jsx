import React, { useEffect, useState } from "react";
import { contactService } from "../services/contact.service";

export function ContactEditPage({ contactId }) {

    const [contact, setContact] = useState(null)

    useEffect(() => {
        loadContact()
    }, [])

    async function loadContact() {
        const contact = await contactService.getContactById(contactId)
        setContact(contact)
    }

    if (!contact) return <div>Loading...</div>

    return (
        <article class="contact-details">
            <h3>Full Name: </h3>
            <p>{contact.name}</p>

            <h3>Phone: </h3>
            <p>{contact.phone}</p>

            <h3>Email: </h3>
            <p>{contact.email}</p>
        </article>
    )
}