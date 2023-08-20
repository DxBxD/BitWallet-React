import { userService } from "../../services/user.service"
import { store } from "../store"

export async function transferToContact(contact, amount) {
    try {
        const move = {
            toId: contact._id,
            to: contact.name,
            at: Date.now(),
            amount: parseFloat(amount)
        }
        store.dispatch({ type: 'addMove', move })
    } catch (error) {
        console.log('error:', error)
    }
}

export async function loadUser() {
    try {
        const user = userService.getLoggedinUser()

        store.dispatch({ type: 'setUser', user })
    } catch (error) {
        console.log('error:', error)
    }
}