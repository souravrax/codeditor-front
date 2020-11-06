import React, { useState } from 'react';
import NavBar from '../components/NavBar'
import Editor from "../components/Editor"

import { Textarea } from 'baseui/textarea';

const MainPage = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [code, setCode] = useState('');
    return (
        <>
            <NavBar
                toggleTheme={(val) => console.log(val)}
            />
            <div className="editor"
                style={{
                    height: "60vh",
                    width: "100vw"
                }}
            >
                <Editor
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

export default MainPage;