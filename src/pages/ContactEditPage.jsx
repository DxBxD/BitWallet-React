import React, { useEffect, useState } from "react"
import { contactService } from "../services/contact.service"

export function ContactEditPage({ contactId }) {

    const [contact, setContact] = useState(null)
    const [isEditMode, setIsEditMode] = useState(false)
    const [editedContact, setEditedContact] = useState(null)

    useEffect(() => {
        loadContact()
    }, [])

    async function loadContact() {
        const contact = await contactService.getContactById(contactId)
        setContact(contact)
    }

    function saveEditedContact() {
        contactService.saveContact(editedContact)
            .then(updatedContact => {
                setIsEditMode(false)
                setContact(updatedContact)
            })
            .catch(error => {
                console.error('Error updating contact:', error)
            });
    }

    if (!contact) return <div>Loading...</div>

    return (
        <article className="contact-details">
            {isEditMode ? (
                <>
                    <label>Full Name: </label>
                    <input type="text" value={editedContact.name} onChange={(e) => setEditedContact({ ...editedContact, name: e.target.value })} />

                    <label>Phone: </label>
                    <input type="text" value={editedContact.phone} onChange={(e) => setEditedContact({ ...editedContact, phone: e.target.value })} />

                    <label>Email: </label>
                    <input type="email" value={editedContact.email} onChange={(e) => setEditedContact({ ...editedContact, email: e.target.value })} />

                    <button onClick={saveEditedContact}>Save</button>
                    <button onClick={() => setIsEditMode(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <h3>Full Name: </h3>
                    <p>{contact.name}</p>
                    <h3>Phone: </h3>
                    <p>{contact.phone}</p>
                    <h3>Email: </h3>
                    <p>{contact.email}</p>
                    <button onClick={() => { setIsEditMode(true); setEditedContact({ ...contact }) }}>Edit</button>
                    <button onClick={onBack}>Back</button>
                </>
            )}
        </article>
    )
}