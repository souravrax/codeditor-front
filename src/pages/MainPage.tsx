import { lazy, Suspense, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useParams } from "react-router";
const Editor = lazy(() => import("../components/Editor"));

import { Textarea } from "baseui/textarea";

import importHandler from "../controllers/importHandler";
import { useCodeEditor } from "@/app/store";

const MainPage = () => {
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
      <NavBar toggleTheme={(val) => console.log(val)} />
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
        <Textarea
          placeholder="Input"
          value={input}
          clearable
          onChange={(e) => setInput(e.target.value)}
          overrides={{
            InputContainer: {
              style: ({ $theme }) => {
                return {
                  borderRight: `1px solid ${$theme.colors.primary100}`,
                  borderTop: `1px solid ${$theme.colors.primary100}`,
                };
              },
            },
          }}
        />
        <Textarea
          value={output}
          placeholder="Output"
          overrides={{
            InputContainer: {
              style: ({ $theme }) => {
                return {
                  borderTop: `1px solid ${$theme.colors.primary100}`,
                  backgroundColor: `${$theme.colors.backgroundStateDisabled}`,
                };
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default MainPage;
