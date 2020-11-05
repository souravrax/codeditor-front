import React, { useState, useEffect } from 'react';
import NavBar from './NavBar'
import Editor from './Editor'


import { Textarea } from 'baseui/textarea';
import { SIZE } from 'baseui/input';

const App = ({ dark, toggleTheme }) => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [code, setCode] = useState('');
    return (
        <>
            <NavBar
                toggleTheme={toggleTheme}
            />
            <div className="editor"
                style={{
                    height: "60vh",
                    width: "100vw"
                }}
            >
                <Editor
                    theme={`vs-${dark ? "dark" : "light"}`}
                    onChange={(newCode, event) => {
                        setCode(newCode);
                        console.log(code);
                    }}
                    editorOptions={{
                        smoothScrolling: true,
                        showUnused: true,
                        showFoldingControls: true,
                        selectionClipboard: true,
                        selectOnLineNumbers: true,
                        scrollbar: true,
                        quickSuggestions: true,
                        padding: 0,
                        links: true,
                    }}
                    focus={true}
                />
            </div>
            <div className="input-output"
                style={{
                    display: "flex",
                    height: "calc(40vh - 61px)"
                }}
            >
                <Textarea
                    placeholder="Input"
                    value={input}
                    clearable
                    onChange={(e) => setInput(e.target.value)}
                />
                <Textarea
                    disabled
                    clearable
                    value={output}
                    placeholder="Output"
                />
            </div>
        </>
    )
}
export default App;