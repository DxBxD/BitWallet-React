import { ContactList } from '../cmps/ContactList.jsx'
import { ContactFilter } from '../cmps/ContactFilter.jsx'
import { contactService } from '../services/contact.service.js'
import { ContactDetailsPage } from '../pages/ContactDetailsPage.jsx'
import { useEffect, useState } from 'react'

export function ContactPage() {

    const [contacts, setContacts] = useState(null)
    const [selectedContactId, setSelectedContactId] = useState(null)
    const [filterBy, setFilterBy] = useState({
        txt: '',
        minCoins: '',
        maxCoins: ''
    })

    useEffect(() => {
        loadContacts()
    }, [filterBy])

    async function loadContacts() {
        const contacts = await contactService.getContacts(filterBy)
        setContacts(contacts)
    }

    async function onChangeFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSelectedContactId(contactId) {
        setSelectedContactId(contactId)
    }


    if (!contacts) return <div>Loading...</div>

    return (
        <section className="contact-index">
            {!selectedContactId ?
                <>
                    <ContactFilter onChangeFilter={onChangeFilter} filterBy={filterBy} />
                    <ContactList onSelectContactId={onSetSelectedContactId} contacts={contacts} />
                </> :
                <ContactDetailsPage contactId={selectedContactId} />
            }
        </section>
    )
}