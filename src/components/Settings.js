import React, { useState } from "react";
import { Drawer } from "baseui/drawer";
import { Button, SIZE as ButtonSize } from "baseui/button";

import { Checkbox, STYLE_TYPE, LABEL_PLACEMENT } from "baseui/checkbox";

// import Option from './Option';

// Redux imports
import { connect } from "react-redux";
import {
    setTheme,
    setMinimap,
    setQuickSuggestion,
    setScrollbar,
    setSelectOnLineNumber,
    setShowFoldingControls,
    setShowUnused,
} from "../app/settings/settings-actions";

const Settings = ({
    showSettings,
    setShowSettings,

    theme,
    minimap,
    showUnused,
    selectOnLineNumbers,
    scrollbar,
    quickSuggestion,
    showFoldingControls,

    setTheme,
    setMinimap,
    setSelectOnLineNumber,
    setShowUnused,
    setScrollbar,
    setShowFoldingControls,
    setQuickSuggestion,
}) => {
    // showSettings and setShowSettings are from the parent node
    // others are from redux settings state

    const settings = [
        [minimap, setMinimap, "Editor Minimap"],
        [selectOnLineNumbers, setSelectOnLineNumber, "Select On Line Number"],
        [scrollbar, setScrollbar, "Editor Scrollbar"],
        [showUnused, setShowUnused, "Show Unused"],
        [quickSuggestion, setQuickSuggestion, "Quick Suggestion"],
        [showFoldingControls, setShowFoldingControls, "Folding Controls"],
    ];

    return (
        <Drawer
            isOpen={showSettings}
            autoFocus
            onClose={() => setShowSettings(false)}
        >
            <h1
                style={{
                    marginBottom: "35px",
                }}
            >
                Settings
            </h1>
            <Checkbox
                checked={theme === "dark"}
                checkmarkType={STYLE_TYPE.toggle_round}
                onChange={(e) => {
                    setTheme(!e.target.checked ? "light" : "dark");
                }}
                labelPlacement={LABEL_PLACEMENT.right}
                overrides={{
                    Root: {
                        style: ({ $theme }) => ({
                            marginTop: "10px",
                            marginBottom: "10px",
                            backgroundColor: `${$theme.colors.backgroundSecondary}`,
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            borderRadius: `${$theme.borders.radius400}`,
                        }),
                    },
                }}
            >
                Dark Mode
            </Checkbox>
            {settings.map(([state, action, name], indx) => (
                <Checkbox
                    checked={state}
                    key={indx}
                    checkmarkType={STYLE_TYPE.toggle_round}
                    onChange={(e) => action(e.target.checked)}
                    labelPlacement={LABEL_PLACEMENT.right}
                    overrides={{
                        Root: {
                            style: ({ $theme }) => ({
                                marginTop: "10px",
                                marginBottom: "10px",
                                backgroundColor: `${$theme.colors.backgroundSecondary}`,
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                borderRadius: `${$theme.borders.radius400}`,
                            }),
                        },
                    }}
                >
                    {name}
                </Checkbox>
            ))}
            <Button
                onClick={()=> {
                    localStorage.clear();
                    location.reload();
                }}
                startEnhancer={() => <i className="fas fa-redo-alt"></i>}
                size={ButtonSize.compact}
                overrides={{
                    BaseButton: {
                        style: ({ $theme }) => ({
                            marginBottom: "10px",
                            background: `linear-gradient(to right, rgb(255, 65, 108), rgb(255, 75, 43))`,
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            borderTopLeftRadius: `${$theme.borders.radius300} !important`,
                            borderTopRightRadius: `${$theme.borders.radius300} !important`,
                            borderBottomLeftRadius: `${$theme.borders.radius300} !important`,
                            borderBottomRightRadius: `${$theme.borders.radius300} !important`,
                        }),
                    },
                }}
            >
                Reset and Reload
            </Button>
        </Drawer>
    );
};

const mapStateToProps = ({ settings }) => ({
    theme: settings.theme,
    minimap: settings.minimap,
    showUnused: settings.showUnused,
    showFoldingControls: settings.showFoldingControls,
    selectOnLineNumbers: settings.selectOnLineNumbers,
    scrollbar: settings.scrollbar,
    quickSuggestion: settings.quickSuggestion,
});

const mapDispatchToProps = (dispatch) => ({
    setTheme: (theme) => dispatch(setTheme(theme)),
    setMinimap: (value) => dispatch(setMinimap(value)),
    setShowUnused: (value) => dispatch(setShowUnused(value)),
    setShowFoldingControls: (value) => dispatch(setShowFoldingControls(value)),
    setSelectOnLineNumber: (value) => dispatch(setSelectOnLineNumber(value)),
    setScrollbar: (value) => dispatch(setScrollbar(value)),
    setQuickSuggestion: (value) => dispatch(setQuickSuggestion(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
