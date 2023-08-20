import React, { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { useNavigate } from 'react-router-dom'

export function SignupPage({ setUser }) {
    const [name, setName] = useState('')
    const navigate = useNavigate()

    const onSignup = () => {
        if (!name) {
            alert('Please enter a name...')
            return
        }
        const newUser = userService.signup(name)
        if (newUser) {
            setUser(newUser)
            navigate('/')
        }
    }

    return (
        <div className="signup-page">
            <h2>Signup</h2>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={onSignup}>Signup</button>
        </div>
    )
}
