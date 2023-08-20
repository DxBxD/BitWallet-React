import React from 'react'
import { Link } from 'react-router-dom'

export function ContactPreview({ contact, onSelectContactId }) {

    return (
        <article className="contact-preview">
            <Link to={`/contact/${contact._id}`}>
                <img src={`https://robohash.org/${contact.name}`} alt="" />
                <span class="contact-text-container">
                    <span>{contact.name}</span>
                </span>
            </Link>
        </article>
    )
}