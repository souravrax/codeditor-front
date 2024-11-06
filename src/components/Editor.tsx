import React from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useAppContext } from "../context/AppContext";
import { useSettings } from "../context/SettingsContext";

export default function Editor() {
    const { minimap } = useSettings();
    const { code, setCode, language } = useAppContext();
    return (
        <div
            style={{
                height: "100%",
                width: "100%",
            }}
        >
            <MonacoEditor
                height="100%"
                language={language}
                value={code}
                onChange={(e) => setCode(e ?? "")}
                options={{
                    minimap: {
                        enabled: minimap,
                    },
                }}
            />
        </div>
    );
}
