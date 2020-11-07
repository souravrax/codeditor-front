const INITIAL_STATE = {
    theme: "light",
    minimap: true,
    showUnused: true,
    showFoldingControls: true,
    selectOnLineNumbers: true,
    scrollbar: true,
    quickSuggestion: true,
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
        case "SET_SHOW_UNUSED":
            return {
                ...state,
                showUnused: action.payload
            }
        case "SET_SHOW_FOLDING_CONTROLS":
            return {
                ...state,
                showFoldingControls: action.payload
            }
        case "SET_SELECT_ON_LINE_NUMBER":
            return {
                ...state,
                selectOnLineNumbers: action.payload
            }
        case "SET_SCROLLBAR":
            return {
                ...state,
                scrollbar: action.payload
            }
        case "SET_QUICK_SUGGESTION":
            return {
                ...state,
                quickSuggestion: action.payload
            }
        default:
            return state;
    }
};

export default settingsReducer;