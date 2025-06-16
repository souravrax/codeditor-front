import { lazy, Suspense, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useParams } from "react-router";
const Editor = lazy(() => import("../components/Editor"));

import importHandler from "@/lib/importHandler";
import { useCodeEditor } from "@/store/store";
import { Textarea } from "@/components/ui/textarea";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

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
    <div className="flex flex-col h-screen w-full p-4 gap-4">
      <NavBar />
      <div className="flex-1 w-full min-h-0 flex gap-4">
        <div className="w-[60%] rounded-lg overflow-hidden border">
          <Suspense fallback={<div>Loading...</div>}>
            <Editor />
          </Suspense>
        </div>
        <div className="grid grid-rows-2 w-[40%] gap-4">
          <Textarea
            placeholder="Input"
            value={input}
            onChange={(e) => setInput((e.target as HTMLTextAreaElement).value)}
            className="w-full resize-none"
          ></Textarea>
          <Textarea
            value={output}
            placeholder="Output"
            className="w-full resize-none"
          ></Textarea>
        </div>
      </div>
    </div>
  );
};

export default App;
