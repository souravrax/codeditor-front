export const setTheme = (theme) => ({
    type: "SET_THEME",
    payload: theme,
});

export const setMinimap = (value) => ({
    type: "SET_MINIMAP",
    payload: value,
});

export const setShowUnused = (value) => ({
    type: "SET_SHOW_UNUSED",
    payload: value,
});

export const setShowFoldingControls = (value) => ({
    type: "SET_SHOW_FOLDING_CONTROLS",
    payload: value,
});

export const setSelectOnLineNumber = (value) => ({
    type: "SET_SELECT_ON_LINE_NUMBER",
    payload: value,
});

export const setScrollbar = (value) => ({
    type: "SET_SCROLLBAR",
    payload: value,
});

export const setQuickSuggestion = (value) => ({
    type: "SET_QUICK_SUGGESTION",
    payload: value,
});

export default {
    setTheme,
    setShowFoldingControls,
    setShowUnused,
    setQuickSuggestion,
    setScrollbar,
    setMinimap,
    setSelectOnLineNumber,
};
