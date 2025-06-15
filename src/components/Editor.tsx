import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import MonacoEditor from '@monaco-editor/react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux';

import { setCode } from '../app/master/master-actions'

import languageToSyntax from '../assets/mapLanguageToSyntax.json';

const Editor = (props) => {
    const {
        language,
        code,
        setCode,
        theme,
        minimapStatus,
        showUnused,
        selectOnLineNumbers,
        scrollbar,
        quickSuggestion,
        showFoldingControls,
    } = props;


    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const editorContainerRef = useRef(null);
    const resizeObserver = useRef(null);
    const [editorOptions, setEditorOptions] = useState({});

    const editorDidMount = (editor, monaco) => {
        editor.onKeyDown(event => {
            const { browserEvent, ctrlKey } = event;
            const { key } = browserEvent;
            if (key === 's' && ctrlKey) {
                event.preventDefault();
            } else if(key === 'Enter' && ctrlKey) {
                event.preventDefault();
                alert("Execute");
            }
        });
    };

    useEffect(() => {
        resizeObserver.current = new ResizeObserver(entries => {
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
                enabled: minimapStatus
            },
            showFoldingControls: showFoldingControls,
            selectOnLineNumbers: selectOnLineNumbers,
            scrollbar: scrollbar,
            quickSuggestions: quickSuggestion,
            showUnused: showUnused
        });
    }, [minimapStatus, showFoldingControls, selectOnLineNumbers, scrollbar, quickSuggestion, showUnused]);

    const handleResize = (newWidth, newHeight) => {
        setWidth(newWidth);
        setHeight(newHeight);
    };

    return (
        <div style={{
            height: "100%",
            width: "100%"
        }} ref={editorContainerRef}>
            {
                isReady ? (
                    <Suspense fallback={<div>Loading Editor...</div>}>
                        <MonacoEditor
                            height={height}
                            width={width}
                            language={languageToSyntax[language]}
                            theme={`vs-${theme}`}
                            value={code}
                            options={editorOptions}
                            onChange={(newCode, event) => {
                                setCode(newCode);
                            }}
                            editorDidMount={editorDidMount}
                        />
                    </Suspense>
                ) : null
            }
        </div>
    );
}

Editor.propTypes = {
    editorOptions: PropTypes.object,
    language: PropTypes.string,
    theme: PropTypes.oneOf(["dark", "light"]),
    focus: PropTypes.bool
}

const mapStateToProps = state => ({
    // master states
    code: state.master.code,
    language: state.master.language,

    // settings states
    theme: state.settings.theme,
    minimapStatus: state.settings.minimap,
    showUnused: state.settings.showUnused,
    showFoldingControls: state.settings.showFoldingControls,
    selectOnLineNumbers: state.settings.selectOnLineNumbers,
    scrollbar: state.settings.scrollbar,
    quickSuggestion: state.settings.quickSuggestion
});

const mapDispatchToProps = dispatch => ({
    setCode: code => dispatch(setCode(code))
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor);