import React, { useState } from 'react';


// BaseWeb
import { BaseProvider, LightTheme, DarkTheme } from "baseui"


// Component/Container Imports
import MainPage from './pages/MainPage'

// Redux
import { connect } from 'react-redux';


function capitalize(theme) {
    return theme[0].toUpperCase() + theme.slice(1);
}

const App = ({ theme }) => {
    return (
        <BaseProvider theme={`${capitalize(theme)}Theme` == "LightTheme" ? LightTheme : DarkTheme}>
            <MainPage />
        </BaseProvider>
    )
}

const mapStateToProps = state => ({
    theme: state.settings.theme
})

export default connect(mapStateToProps)(App);