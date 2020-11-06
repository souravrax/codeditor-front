const INITIAL_STATE = {
    theme: "light",
    minimap: true,
}

const settingsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "SET_THEME":
            return {
                ...state,
                theme: action.payload
            }
        case "SET_MINIMAP":
            return {
                ...state,
                minimap: action.payload
            }
        default:
            return state;
    }
};

export default settingsReducer;