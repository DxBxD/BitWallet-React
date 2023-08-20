const initialState = {
    coins: 100,
    moves: []
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'addMove':
            return {
                ...state,
                moves: [...state.moves, action.move],
                coins: state.coins - action.move.amount
            }
        case 'setUser':
            return { ...state, ...action.user }
        default:
            return state
    }
}