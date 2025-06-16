import * as monaco from "monaco-editor";
import { useState, useEffect, useRef, Suspense, SetStateAction } from "react";
import MonacoEditor from "@monaco-editor/react";

import languageToSyntax from "../assets/mapLanguageToSyntax.json";
import { useAppSettings, useCodeEditor } from "@/store/store";
import { useTheme } from "@/context/ThemeProvider";
import { loader } from "@monaco-editor/react";

loader.config({ monaco });

monaco.editor.defineTheme("transparent", {
  base: "vs-dark",
  inherit: true,
  rules: [
    {
      background: "00000000",
    } as any,
    {
      token: "comment",
      foreground: "6a9955",
    },
    {
      token: "string",
      foreground: "ce9178",
    },
    {
      token: "number",
      foreground: "b5cea8",
    },
    {
      token: "keyword",
      foreground: "569cd6",
    },
    {
      token: "type",
      foreground: "4ec9b0",
    },
    {
      token: "delimiter",
      foreground: "d4d4d4",
    },
    {
      token: "tag",
      foreground: "569cd6",
    },
    {
      token: "attribute.name",
      foreground: "9cdcfe",
    },
    {
      token: "attribute.value",
      foreground: "ce9178",
    },
    {
      token: "operator",
      foreground: "d4d4d4",
    },
  ],
  colors: {
    "editor.background": "#00000000",
    "editor.foreground": "#d4d4d4",
    "editor.lineHighlightBackground": "#ffffff1a",
    "editorCursor.foreground": "#d4d4d4",
    "editorWhitespace.foreground": "#ffffff1a",
    "editorIndentGuide.background": "#ffffff1a",
    "editorIndentGuide.activeBackground": "#ffffff33",
    "editor.selectionBackground": "#264f78",

    "minimap.background": "#00000000",
    "minimap.selectionHighlight": "#264f7880",
    "minimapSlider.background": "#ffffff20",
    "minimapSlider.hoverBackground": "#ffffff33",
    "minimapSlider.activeBackground": "#ffffff44",
  },
});

const Editor = () => {
  const { resolvedTheme: theme } = useTheme();
  const {
    showUnused,
    selectOnLineNumbers,
    scrollbar,
    quickSuggestion,
    showFoldingControls,
    minimap,
  } = useAppSettings((s) => s);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const [editorOptions, setEditorOptions] = useState({});
  const execute = useCodeEditor((s) => s.execute);
  const code = useCodeEditor((s) => s.code);
  const language = useCodeEditor((s) => s.language);
  const setCode = useCodeEditor((s) => s.setCode);

  const editorDidMount = (editor: any, monaco: any) => {
    editor.onKeyDown((event: any) => {
      const { browserEvent, ctrlKey } = event;
      const { key } = browserEvent;
      if (key === "s" && ctrlKey) {
        event.preventDefault();
      } else if (key === "Enter" && ctrlKey) {
        event.preventDefault();
        execute();
      }
    });
  };

  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        handleResize(width, height);
      }
    });

    if (editorContainerRef.current) {
      resizeObserver.current.observe(editorContainerRef.current);
    }

    setIsReady(true);

    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    setEditorOptions({
      minimap: {
        enabled: minimap,
      },
      showFoldingControls: showFoldingControls,
      selectOnLineNumbers: selectOnLineNumbers,
      scrollbar: scrollbar,
      quickSuggestions: quickSuggestion,
      showUnused: showUnused,
    });
  }, [
    minimap,
    showFoldingControls,
    selectOnLineNumbers,
    scrollbar,
    quickSuggestion,
    showUnused,
  ]);

  const handleResize = (
    newWidth: SetStateAction<number>,
    newHeight: SetStateAction<number>
  ) => {
    setWidth(newWidth);
    setHeight(newHeight);
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
      ref={editorContainerRef}
    >
      {isReady ? (
        <Suspense fallback={<div>Loading Editor...</div>}>
          <MonacoEditor
            height={height}
            width={width}
            language={
              languageToSyntax[language as keyof typeof languageToSyntax]
            }
            theme={`transparent`}
            value={code}
            options={{
              ...editorOptions,
            }}
            onChange={(newCode, event) => {
              setCode(newCode ?? "");
            }}
            onMount={editorDidMount}
          />
        </Suspense>
      ) : null}
    </div>
  );
};

export default Editor;
