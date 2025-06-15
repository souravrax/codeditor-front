import React, { useState } from "react";
import { Drawer } from "baseui/drawer";
import { Button, SIZE as ButtonSize } from "baseui/button";

import { Checkbox, STYLE_TYPE, LABEL_PLACEMENT } from "baseui/checkbox";

import { useAppSettings } from "@/app/store";

const Settings: React.FC<{
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
}> = ({ showSettings, setShowSettings }) => {
  const theme = useAppSettings((state) => state.theme);
  const minimap = useAppSettings((state) => state.minimap);
  const showUnused = useAppSettings((state) => state.showUnused);
  const selectOnLineNumbers = useAppSettings(
    (state) => state.selectOnLineNumbers
  );
  const scrollbar = useAppSettings((state) => state.scrollbar);
  const quickSuggestion = useAppSettings((state) => state.quickSuggestion);
  const showFoldingControls = useAppSettings(
    (state) => state.showFoldingControls
  );

  const setTheme = useAppSettings((state) => state.setTheme);
  const setMinimap = useAppSettings((state) => state.setMinimap);
  const setSelectOnLineNumber = useAppSettings(
    (state) => state.setSelectOnLineNumbers
  );
  const setShowUnused = useAppSettings((state) => state.setShowUnused);
  const setScrollbar = useAppSettings((state) => state.setScrollbar);
  const setShowFoldingControls = useAppSettings(
    (state) => state.setShowFoldingControls
  );
  const setQuickSuggestion = useAppSettings(
    (state) => state.setQuickSuggestion
  );

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
          setTheme(e.target.checked ? "dark" : "light");
        }}
        labelPlacement={LABEL_PLACEMENT.right}
        overrides={{
          Root: {
            style: ({ $theme }: { $theme: any }) => ({
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
          checked={state as boolean}
          key={indx}
          checkmarkType={STYLE_TYPE.toggle_round}
          onChange={(e) => action(e.target.checked as boolean)}
          labelPlacement={LABEL_PLACEMENT.right}
          overrides={{
            Root: {
              style: ({ $theme }: { $theme: any }) => ({
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
        onClick={() => {
          localStorage.clear();
          location.reload();
        }}
        startEnhancer={() => <i className="fas fa-redo-alt"></i>}
        size={ButtonSize.compact}
        overrides={{
          BaseButton: {
            style: ({ $theme }: { $theme: any }) => ({
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

export default Settings;
