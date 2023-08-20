import React, { useState, useEffect } from 'react'
import { userService } from '../services/user.service'

export function MovesList({ contactId, title }) {
    const [moves, setMoves] = useState([])

    useEffect(() => {
        async function fetchMoves() {
            try {
                let userMoves
                if (contactId) {
                    userMoves = await userService.getMovesByContactId(contactId)
                } else {
                    userMoves = await userService.getLastNMoves(3)
                }
                setMoves(userMoves)
            } catch (error) {
                console.error("Failed to fetch moves:", error)
                setMoves([])
            }
        }
        fetchMoves()
    }, [contactId])

    if (!moves.length) {
        return (
            <div className="moves-list">
                <h4>{title || "Moves"}</h4>
                <small>No moves found.</small>
            </div>
        )
    }

    return (
        <div className="moves-list">
            <h4>{title || "Moves"}</h4>
            <ul>
                {moves.map((move, index) => (
                    <li key={`${move.toId}-${index}`}>
                        {!contactId && `To ${move.to}: `}
                        Sent {move.amount} coins at {new Date(move.at).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    )
}
