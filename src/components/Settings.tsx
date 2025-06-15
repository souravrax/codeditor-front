import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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

  type SettingItem = [boolean, (value: boolean) => void, string];

  const settings: SettingItem[] = [
    [minimap, setMinimap, "Editor Minimap"],
    [selectOnLineNumbers, setSelectOnLineNumber, "Select On Line Number"],
    [scrollbar, setScrollbar, "Editor Scrollbar"],
    [showUnused, setShowUnused, "Show Unused"],
    [quickSuggestion, setQuickSuggestion, "Quick Suggestion"],
    [showFoldingControls, setShowFoldingControls, "Folding Controls"],
  ];

  return (
    <Dialog open={showSettings} onOpenChange={setShowSettings}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between rounded-md bg-secondary p-3">
            <Label htmlFor="dark-mode" className="text-right">
              Dark Mode
            </Label>
            <Checkbox
              id="dark-mode"
              checked={theme === "dark"}
              onCheckedChange={(checked) => {
                setTheme(checked ? "dark" : "light");
              }}
            />
          </div>
          {settings.map(([state, action, name], indx) => (
            <div
              key={indx}
              className="flex items-center justify-between rounded-md bg-secondary p-3"
            >
              <Label htmlFor={`setting-${indx}`} className="text-right">
                {name}
              </Label>
              <Checkbox
                id={`setting-${indx}`}
                checked={state as boolean}
                onCheckedChange={(checked) => action(checked as boolean)}
              />
            </div>
          ))}
          <Button
            onClick={() => {
              localStorage.clear();
              location.reload();
            }}
            className="mb-3 w-full rounded-md bg-gradient-to-r from-rose-500 to-red-500 p-3"
          >
            <i className="fas fa-redo-alt mr-2"></i>
            Reset and Reload
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
