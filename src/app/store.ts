import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SettingsState {
  theme: "light" | "dark";
  minimap: boolean;
  showUnused: boolean;
  showFoldingControls: boolean;
  selectOnLineNumbers: boolean;
  scrollbar: boolean;
  quickSuggestion: boolean;
}

interface MasterState {
  code: string;
  input: string;
  output: string | undefined;
  language: string;
  commandLineArguments: string;
  isExecuting: boolean;
}

interface AppSettingsStore extends SettingsState {
  setTheme: (theme: SettingsState["theme"]) => void;
  setMinimap: (minimap: SettingsState["minimap"]) => void;
  setShowUnused: (showUnused: SettingsState["showUnused"]) => void;
  setShowFoldingControls: (
    showFoldingControls: SettingsState["showFoldingControls"]
  ) => void;
  setSelectOnLineNumbers: (
    selectOnLineNumbers: SettingsState["selectOnLineNumbers"]
  ) => void;
  setScrollbar: (scrollbar: SettingsState["scrollbar"]) => void;
  setQuickSuggestion: (
    quickSuggestion: SettingsState["quickSuggestion"]
  ) => void;
}

interface CodeEditorStore extends MasterState {
  setCode: (code: MasterState["code"]) => void;
  setInput: (input: MasterState["input"]) => void;
  setOutput: (output: MasterState["output"]) => void;
  setLanguage: (language: MasterState["language"]) => void;
  setCommandLineArguments: (
    commandLineArguments: MasterState["commandLineArguments"]
  ) => void;
  setIsExecuting: (isExecuting: MasterState["isExecuting"]) => void;
}

export const useAppSettings = create(
  persist<AppSettingsStore>(
    (set) => ({
      theme: "light",
      minimap: true,
      showUnused: true,
      showFoldingControls: true,
      selectOnLineNumbers: true,
      scrollbar: true,
      quickSuggestion: true,
      setTheme: (theme) => set({ theme }),
      setMinimap: (minimap) => set({ minimap }),
      setShowUnused: (showUnused) => set({ showUnused }),
      setShowFoldingControls: (showFoldingControls) =>
        set({ showFoldingControls }),
      setSelectOnLineNumbers: (selectOnLineNumbers) =>
        set({ selectOnLineNumbers }),
      setScrollbar: (scrollbar) => set({ scrollbar }),
      setQuickSuggestion: (quickSuggestion) => set({ quickSuggestion }),
    }),
    {
      name: "app-settings-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useCodeEditor = create(
  persist<CodeEditorStore>(
    (set) => ({
      code: "",
      input: "",
      output: "",
      language: "C",
      commandLineArguments: "",
      isExecuting: false,
      setCode: (code) => set({ code }),
      setInput: (input) => set({ input }),
      setOutput: (output) => set({ output }),
      setLanguage: (language) => set({ language }),
      setCommandLineArguments: (commandLineArguments) =>
        set({ commandLineArguments }),
      setIsExecuting: (isExecuting) => set({ isExecuting }),
    }),
    {
      name: "code-editor-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        ...state,
        output: undefined, // Do not persist output, set it to undefined so it is not saved
      }),
    }
  )
);
