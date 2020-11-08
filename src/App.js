import React, { useState } from 'react';


// BaseWeb
import { BaseProvider, LightTheme, DarkTheme } from "baseui"
import { SnackbarProvider } from 'baseui/snackbar'


// Component/Container Imports
import MainPage from './pages/MainPage'

// Redux
import { connect } from 'react-redux';


const App = ({ theme }) => {
    return (
        <BaseProvider
            theme={theme.toLowerCase() == "light" ? LightTheme : DarkTheme}
        >
            <SnackbarProvider>
                <MainPage />
            </SnackbarProvider>
        </BaseProvider>
    )
}

const mapStateToProps = state => ({
    theme: state.settings.theme
})

export default connect(mapStateToProps)(App);