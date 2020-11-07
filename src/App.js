import React, { useState } from 'react';


// BaseWeb
import { BaseProvider, LightTheme, DarkTheme } from "baseui"


// Component/Container Imports
import MainPage from './pages/MainPage'

// Redux
import { connect } from 'react-redux';


const App = ({ theme }) => {
    return (
        <BaseProvider
            theme={theme.toLowerCase() == "light" ? LightTheme : DarkTheme}
        >
            <MainPage />
        </BaseProvider>
    )
}

const mapStateToProps = state => ({
    theme: state.settings.theme
})

export default connect(mapStateToProps)(App);