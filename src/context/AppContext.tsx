import React, { useState } from "react";

type AppContextType = {
    code: string;
    input: string;
    output: string;
    language: string;
    commandLineArguments: string;
    isExecuting: boolean;
    setCode: (code: string) => void;
    setInput: (input: string) => void;
    setOutput: (output: string) => void;
    setLanguage: (language: string) => void;
    setCommandLineArguments: (commandLineArguments: string) => void;
    setIsExecuting: (isExecuting: boolean) => void;
};
const AppContext = React.createContext<AppContextType>({} as AppContextType);

export const AppContextProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [code, setCode] = useState("");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState("python");
    const [commandLineArguments, setCommandLineArguments] = useState("");
    const [isExecuting, setIsExecuting] = useState(false);

    return (
        <AppContext.Provider
            value={{
                code,
                input,
                output,
                language,
                commandLineArguments,
                isExecuting,
                setCode,
                setInput,
                setOutput,
                setLanguage,
                setCommandLineArguments,
                setIsExecuting,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = React.useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within a AppContextProvider");
    }
    return context;
};