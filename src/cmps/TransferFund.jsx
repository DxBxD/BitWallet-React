import React, { useState } from 'react'
import { userService } from '../services/user.service'

export function TransferFund({ contact, maxCoins, onTransferCoins }) {
    const [amount, setAmount] = useState('')

    const handleSubmit = (ev) => {
        ev.preventDefault()
        onTransferCoins(contact, amount)
    }

    return (
        <div className="transfer-fund">
            <h3>Transfer Funds</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={ev => setAmount(+ev.target.value)}
                        max={maxCoins}
                    />
                </label>
                <button type="submit">Transfer</button>
            </form>
        </div>
    )
}
