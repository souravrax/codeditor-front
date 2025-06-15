import { lazy, Suspense, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useParams } from "react-router";
const Editor = lazy(() => import("../components/Editor"));

import importHandler from "@/lib/importHandler";
import { useCodeEditor } from "@/app/store";

const App = () => {
  const setInput = useCodeEditor((s) => s.setInput);
  const setCode = useCodeEditor((s) => s.setCode);
  const setLanguage = useCodeEditor((s) => s.setLanguage);
  const setOutput = useCodeEditor((s) => s.setOutput);
  const input = useCodeEditor((s) => s.input);
  const output = useCodeEditor((s) => s.output);
  const { sharedId } = useParams();

  useEffect(() => {
    (async function () {
      if (sharedId) {
        try {
          const response = await importHandler(
            sharedId,
            setCode,
            setLanguage,
            setInput,
            setOutput
          );
          if (response) {
            setCode(response.code);
            setLanguage(response.language);
            setInput(response.input);
          }
        } catch (e) {
          console.error(e);
        }
      }
    })();
  }, [sharedId]);

  return (
    <>
      <NavBar />
      <div
        className="editor"
        style={{
          height: "60vh",
          width: "100vw",
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Editor />
        </Suspense>
      </div>
      <div
        className="input-output"
        style={{
          display: "flex",
          height: "calc(40vh - 61px)",
        }}
      >
        <textarea
          placeholder="Input"
          value={input}
          onChange={(e) => setInput((e.target as HTMLTextAreaElement).value)}
          className="flex-1 w-full border-r border-t border-solid border-primary100 p-2 outline-none resize-none"
        ></textarea>
        <textarea
          value={output}
          placeholder="Output"
          className="flex-1 w-full border-t border-solid border-primary100 bg-backgroundStateDisabled p-2 outline-none resize-none"
        ></textarea>
      </div>
    </>
  );
};

export default App;
