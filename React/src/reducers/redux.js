
const inaslaseState = {
    user: {},
    currentRecipe: {},
}

const redux = (state = inaslaseState, action) => {
    switch (action.type) {
        case "updateUser": return { ...state, user: action.user }
        case "UPDATERECIPE": return { ...state, currentRecipe: action.currentRecipe }
        default: return { ...state }

    }
}
export default redux;