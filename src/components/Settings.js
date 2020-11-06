import React, { useState } from 'react'
import { Drawer, SIZE, ANCHOR } from 'baseui/drawer';

import {
    Checkbox,
    STYLE_TYPE,
    LABEL_PLACEMENT
} from "baseui/checkbox";


import { connect } from 'react-redux';
import { setTheme } from '../app/settings/settings-actions';

const Settings = ({ showSettings, setShowSettings, setTheme }) => {
    const [checked, setChecked] = useState(false);
    console.log(setTheme);
    return (
        <Drawer
            isOpen={showSettings}
            autoFocus
            onClose={() => setShowSettings(false)}
        >
            <h1
                style={{
                    marginBottom: "35px"
                }}
            >Settings</h1>
            <Checkbox
                checked={checked}
                checkmarkType={STYLE_TYPE.toggle}
                onChange={e => {
                    setTheme(!e.target.checked ? "light" : "dark");
                    console.log(e.target.checked ? "dark" : "light");
                    setChecked(e.target.checked);
                }}
                labelPlacement={LABEL_PLACEMENT.right}
            >
                Dark Mode
            </Checkbox>
        </Drawer >
    )
};


const mapDispatchToProps = dispatch => ({
    setTheme: (theme) => (dispatch(setTheme(theme)))
})

export default connect(null, mapDispatchToProps)(Settings);