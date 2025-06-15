export const setCode = (code) => {
    return {
        type: "SET_CODE",
        payload: code,
    };
};

export const setInput = (input) => {
    return {
        type: "SET_INPUT",
        payload: input,
    };
};

export const setOutput = (output) => {
    return {
        type: "SET_OUTPUT",
        payload: output,
    };
};

export const setLanguage = (language) => {
    return {
        type: "SET_LANGUAGE",
        payload: language,
    };
};

export const setCommandLineArguments = (cla) => {
    return {
        type: "SET_COMMAND_LINE_ARGUMENTS",
        payload: cla,
    };
};

export const setExecutionState = (state) => {
    return {
        type: "SET_EXECUTION_STATE",
        payload: state,
    };
};

export default {
    setLanguage,
    setCommandLineArguments,
    setExecutionState,
    setInput,
    setCode,
    setOutput,
};
