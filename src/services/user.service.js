import { utilService } from "./util.service"

const STORAGE_KEY = 'loggedinUser'

export const userService = {
    signup,
    addMove,
    getLoggedinUser,
    getLastNMoves,
    getMovesByContactId
}

function getLoggedinUser() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY))
}

function signup(name) {
    if (!name) return Promise.reject('Name is required!')
    const user = {
        _id: utilService.makeId(),
        name,
        coins: 100,
        moves: []
    }
    _saveLocal(user)
    return Promise.resolve(user)
}

function addMove(contact, amount) {
    const user = getLoggedinUser()
    if (!user) return Promise.reject('User not found!')

    const moveAmount = parseFloat(amount)
    if (isNaN(moveAmount)) {
        return Promise.reject('Invalid transfer amount!')
    }

    const currentCoins = parseFloat(user.coins)
    if (isNaN(currentCoins)) {
        return Promise.reject('Invalid user coin balance!')
    }

    if (currentCoins - moveAmount < 0) {
        return Promise.reject('Insufficient coins!')
    }

    const move = {
        toId: contact._id,
        to: contact.name,
        at: Date.now(),
        amount: moveAmount
    }
    user.moves.push(move)
    user.coins = currentCoins - moveAmount

    _saveLocal(user)
    return Promise.resolve(user)
}

function getLastNMoves(n) {
    const user = userService.getLoggedinUser()
    if (!user || !user.moves) return Promise.reject('User not found or no moves!')

    const lastNMoves = user.moves.slice(-n)

    return Promise.resolve(lastNMoves)
}

function getMovesByContactId(contactId) {
    const user = getLoggedinUser()
    if (!user || !user.moves) return Promise.reject('User not found or no moves!')
    const movesForContact = user.moves.filter(move => move.toId === contactId)
    return Promise.resolve(movesForContact)
}

function _saveLocal(user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}