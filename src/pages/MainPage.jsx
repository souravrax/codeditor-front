import { lazy, Suspense, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useParams } from "react-router";
const Editor = lazy(() => import("../components/Editor"));

import { Textarea } from "baseui/textarea";

import { connect } from "react-redux";

import {
  setInput,
  setCode,
  setLanguage,
  setOutput,
} from "../app/master/master-actions";
import importHandler from "../controllers/importHandler";

const MainPage = ({
  input,
  setInput,
  output,
  setCode,
  setLanguage,
  setOutput,
}) => {
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

const mapDispatchToProps = (dispatch) => ({
  setInput: (input) => dispatch(setInput(input)),
  setCode: (code) => dispatch(setCode(code)),
  setLanguage: (language) => dispatch(setLanguage(language)),
  setOutput: (output) => dispatch(setOutput(output)),
});

const mapStateToProps = (state) => ({
  input: state.master.input,
  output: state.master.output,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
