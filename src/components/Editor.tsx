import { useState, useEffect, useRef, Suspense, SetStateAction } from "react";
import MonacoEditor from "@monaco-editor/react";

import languageToSyntax from "../assets/mapLanguageToSyntax.json";
import { useAppSettings, useCodeEditor } from "@/app/store";

const Editor = () => {
  const {
    theme,
    showUnused,
    selectOnLineNumbers,
    scrollbar,
    quickSuggestion,
    showFoldingControls,
    minimap,
  } = useAppSettings((s) => s);
  const { code, language, setCode } = useCodeEditor((s) => s);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const [editorOptions, setEditorOptions] = useState({});

  const editorDidMount = (editor: any, monaco: any) => {
    editor.onKeyDown((event: any) => {
      const { browserEvent, ctrlKey } = event;
      const { key } = browserEvent;
      if (key === "s" && ctrlKey) {
        event.preventDefault();
      } else if (key === "Enter" && ctrlKey) {
        event.preventDefault();
        alert("Execute");
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
            theme={`vs-${theme}`}
            value={code}
            options={editorOptions}
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
