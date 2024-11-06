import React from "react";
import { BaseProvider, LightTheme, DarkTheme } from "baseui";
import { SnackbarProvider } from "baseui/snackbar";

import MainPage from "./components/MainPage";
import BaseWebProvider from "./context/BaseWebProvider";
import { useSettings } from "./context/SettingsContext";
import { AppContextProvider } from "./context/AppContext";

export default function App() {
    const { theme } = useSettings();
    return (
        <AppContextProvider>
            <SnackbarProvider>
                <MainPage />
            </SnackbarProvider>
        </AppContextProvider>
    );
}
