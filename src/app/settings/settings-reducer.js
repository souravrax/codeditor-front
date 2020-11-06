const INITIAL_STATE = {
    theme: "light",
}

const settingsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "SET_THEME":
            return {
                ...state,
                theme: action.payload
            }
        default:
            return state;
    }
};

export default settingsReducer;