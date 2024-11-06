import React, { useState } from "react";
type SettingsContextType = {
    theme: string;
    minimap: boolean;
    showUnused: boolean;
    showFoldingControls: boolean;
    selectOnLineNumbers: boolean;
    scrollbar: boolean;
    quickSuggestion: boolean;
    setTheme: (theme: string) => void;
    setMinimap: (minimap: boolean) => void;
    setShowUnused: (showUnused: boolean) => void;
    setShowFoldingControls: (showFoldingControls: boolean) => void;
    setSelectOnLineNumber: (selectOnLineNumbers: boolean) => void;
    setScrollbar: (scrollbar: boolean) => void;
    setQuickSuggestion: (quickSuggestion: boolean) => void;
};
const SettingsContext = React.createContext<SettingsContextType>(
    {} as SettingsContextType
);

export const SettingsProvider = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    const [theme, setTheme] = useState("light");
    const [minimap, setMinimap] = useState(true);
    const [showUnused, setShowUnused] = useState(true);
    const [showFoldingControls, setShowFoldingControls] = useState(true);
    const [selectOnLineNumbers, setSelectOnLineNumber] = useState(true);
    const [scrollbar, setScrollbar] = useState(true);
    const [quickSuggestion, setQuickSuggestion] = useState(true);

    return (
        <SettingsContext.Provider
            value={{
                theme,
                minimap,
                showUnused,
                showFoldingControls,
                selectOnLineNumbers,
                scrollbar,
                quickSuggestion,
                setTheme,
                setMinimap,
                setShowUnused,
                setShowFoldingControls,
                setSelectOnLineNumber,
                setScrollbar,
                setQuickSuggestion,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = React.useContext(SettingsContext);
    if (context === undefined) {
        throw new Error(
            "useSettingsContext must be used within a SettingsContextProvider"
        );
    }
    return context;
};
