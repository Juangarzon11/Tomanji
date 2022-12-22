
const types = {
    addPlayer: 'add player',
    deletePlayer: 'delete player',
    editPlayer: 'edit player',
    deleteAll: 'delete all',
}

const initialStore = []

const storeReducer = (state, action) => {
    switch (action.type) {
        case types.addPlayer:
            return [...state, action.payload].flat()
        case types.deletePlayer:
            state.splice(action.payload, 1)
            return [...state]
        case types.editPlayer:
            state[action.payload.index] = {...state[action.payload.index], name: action.payload.name, avatar: action.payload.avatar}
            return [...state]
        case types.deleteAll:
            return []
        default:
            return state
    }
}

export { initialStore, types }
export default storeReducer