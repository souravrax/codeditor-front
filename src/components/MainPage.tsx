import React from "react";
import NavBar from "./NavBar";
import Editor from "./Editor";

import { Textarea } from "baseui/textarea";

import { useAppContext } from "../context/AppContext";

const MainPage = () => {
    const { input, setInput, output } = useAppContext();
    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <NavBar />
            <main
                id="main-page"
                style={{
                    display: "grid",
                    flexGrow: 1,
                    gridTemplateRows: "1fr 1fr",
                    gridTemplateColumns: "2fr 1fr",
                    height: "100%",
                    width: "100%",
                }}
            >
                <div
                    className="editor"
                    style={{
                        gridRowStart: "span 2",
                    }}
                >
                    <Editor />
                </div>
                <div
                    id="input"
                    style={{
                        gridRowStart: "span 1",
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
                </div>
                <div
                    id="output"
                    style={{
                        gridRowStart: "span 1",
                    }}
                >
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
            </main>
        </div>
    );
};

export default MainPage;
