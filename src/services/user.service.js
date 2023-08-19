import { utilService } from "./util.service"

const STORAGE_KEY = 'loggedinUser'

export const userService = {
    getUser,
    signup,
    addMove,
    getLoggedinUser
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
    const move = {
        toId: contact._id,
        to: contact.name,
        at: Date.now(),
        amount
    }
    user.moves.push(move)
    _saveLocal(user)
    return Promise.resolve(move)
}

function _saveLocal(user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

function getUser() {
    return {
        name: utilService.getRandomName(),
        coins: 100,
        moves: []
    }
}