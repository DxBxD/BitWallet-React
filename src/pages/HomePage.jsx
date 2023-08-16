import React, { useEffect, useState } from 'react';

import { userService } from '../services/user.service.js'
import { bitcoinService } from '../services/bitcoin.service.js'

export function HomePage() {
    const [user, setUser] = useState(null)
    const [rate, setRate] = useState(null)

    useEffect(() => {
        async function loadData() {
            try {
                const loadedUser = await userService.getUser()
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

    if (!user || !rate) return <div>Loading...</div>
    return (
        <>
            <section className="home-page">
                <h2>Username: </h2><h4>{user.name}</h4>
                <h2>Coins: </h2><h4>₿{user.coins}</h4>
                <h2>Current Rate: </h2><h4>{rate}</h4>
            </section>
        </>
    )
}