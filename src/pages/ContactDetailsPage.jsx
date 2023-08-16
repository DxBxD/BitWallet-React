import React, { useEffect, useState } from "react";
import { contactService } from "../services/contact.service";
import { useNavigate, useParams } from "react-router-dom";

export function ContactDetailsPage({ contactId }) {

    const [contact, setContact] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadContact()
    }, [params.id])

    async function loadContact() {
        const contact = await contactService.getContactById(params.id)
        setContact(contact)
    }

    function onBack() {
        navigate('/contact')
        // navigate(-1)
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

            <button onClick={onBack}>Back</button>
        </article>
    )
}