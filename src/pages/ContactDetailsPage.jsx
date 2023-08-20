import React, { useEffect, useState } from "react"
import { contactService } from "../services/contact.service"
import { userService } from "../services/user.service"
import { useNavigate, useParams } from "react-router-dom"
import { MovesList } from "../cmps/MovesList"
import { TransferFund } from "../cmps/TransferFund"

export function ContactDetailsPage() {
    const [contact, setContact] = useState(null)
    const [loggedinUser, setLoggedinUser] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editedContact, setEditedContact] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const user = userService.getLoggedinUser()
        setLoggedinUser(user)
        loadContact()
    }, [params.id])

    async function loadContact() {
        const contact = await contactService.getContactById(params.id)
        setContact(contact)
    }

    function onBack() {
        navigate("/contact")
    }

    function onTransferCoins(contact, amount) {
        userService.addMove(contact, amount)
            .then(updatedUser => {
                setLoggedinUser(updatedUser)
                window.location.reload()
            })
            .catch(error => {
                console.error("Error transferring coins:", error)
            })
    }

    function startEditing() {
        setIsEditing(true)
        setEditedContact({ ...contact })
    }

    async function saveEditedContact() {
        await contactService.saveContact(editedContact)
        setIsEditing(false)
        loadContact()
    }

    if (!contact) return <div>Loading...</div>

    return (
        <>
            <article className="contact-details">
                {loggedinUser && <img src={`https://robohash.org/${contact.name}`} alt="User's Robot Avatar" className="robot-avatar" />}
                <h3>Full Name: </h3>
                {isEditing ? (
                    <input value={editedContact.name} onChange={(ev) => setEditedContact({ ...editedContact, name: ev.target.value })} />
                ) : (
                    <p>{contact.name}</p>
                )}

                <h3>Phone: </h3>
                {isEditing ? (
                    <input value={editedContact.phone} onChange={(ev) => setEditedContact({ ...editedContact, phone: ev.target.value })} />
                ) : (
                    <p>{contact.phone}</p>
                )}

                <h3>Email: </h3>
                {isEditing ? (
                    <input value={editedContact.email} onChange={(ev) => setEditedContact({ ...editedContact, email: ev.target.value })} />
                ) : (
                    <p>{contact.email}</p>
                )}

                <button onClick={onBack}>Back</button>
                <button
                    className={isEditing ? "btn-save" : "btn-edit"}
                    onClick={isEditing ? saveEditedContact : startEditing}>
                    {isEditing ? 'Save' : 'Edit'}
                </button>
                {isEditing && <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>}
            </article>

            <TransferFund contact={contact} maxCoins={loggedinUser ? loggedinUser.coins : 0} onTransferCoins={onTransferCoins} />

            <MovesList contactId={contact._id} title={`Your moves to ${contact.name}`} />
        </>
    )
}
