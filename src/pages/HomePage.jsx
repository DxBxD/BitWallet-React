import React, { useEffect, useState } from 'react'

import { userService } from '../services/user.service.js'
import { bitcoinService } from '../services/bitcoin.service.js'

import { MovesList } from '../cmps/MovesList.jsx'

export function HomePage() {
    const [user, setUser] = useState(null)
    const [rate, setRate] = useState(null)

    useEffect(() => {
        async function loadData() {
            try {
                const loadedUser = await userService.getLoggedinUser()
                setUser(loadedUser)

                if (loadedUser) {
                    const rate = await bitcoinService.getRate(loadedUser.coins)
                    setRate(rate)
                }
            } catch (error) {
                console.error("Error loading data:", error)
            }
        }

        loadData()
    }, [])

    if (!user || !rate) return <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    return (
        <>
            <section className="home-page">
                <h2>Welcome, </h2><h4>{user.name}</h4>
                <h2>Coins: </h2><h4>{user.coins}</h4>
                <h2>BTC Rate: </h2><h4><span>₿</span> {rate}</h4>
            </section>
            <MovesList contactId={null} title="Last Moves" />
        </>
    )
}