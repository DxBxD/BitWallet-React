import { utilService } from "./util.service"

export const userService = {
    getUser
}


function getUser() {
    return {
        name: utilService.getRandomName(),
        coins: 100,
        moves: []
    }
}