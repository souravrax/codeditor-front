import { languageSet } from "@/assets/languageOptions";
import { BACKEND_URL } from "@/lib/constants";
import axios from "axios";
import { toast } from "sonner";
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
  execute: () => Promise<void>;
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
    (set, get) => ({
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
      execute: async () => {
        const { code, language, input, commandLineArguments, setIsExecuting } =
          get();
        set({
          isExecuting: true,
        });
        const payload = {
          code,
          cArgs: commandLineArguments,
          language,
          input,
        };
        console.table(payload);
        if (!languageSet.find(language)) {
          set({
            isExecuting: false,
          });
          toast.error("Invalid language selected", {
            description: "Please select a valid language from the dropdown",
          });
        }
        try {
          const response = await axios.post(`${BACKEND_URL}/execute`, payload);
          set({
            output: response.data.output,
          });
        } catch (e) {
          toast.error("Something went wrong", {
            description:
              "We are having issues running the code, please make sure the code is valid",
          });
        } finally {
          set({
            isExecuting: false,
          });
        }
      },
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
