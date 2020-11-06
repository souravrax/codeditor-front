const INITIAL_STATE = {
    code: "",
    input: "",
    output: "",
    language: "C",
    commandLineArguments: "",
    isExecuting: false
};

const masterReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_CODE":
            return {
                ...state,
                code: action.payload
            }
            break;
        case "SET_INPUT":
            return {
                ...state,
                input: action.payload
            }
        case "SET_OUTPUT":
            return {
                ...state,
                output: action.payload
            }
        case "SET_LANGUAGE":
            return {
                ...state,
                language: action.payload
            }
        case "SET_COMMAND_LINE_ARGUMENTS":
            return {
                ...state,
                commandLineArguments: action.payload
            }
        case "SET_EXECUTION_STATE":
            return {
                ...state,
                isExecuting: action.payload
            }
        default:
            return state;
    }
}

export default masterReducer;