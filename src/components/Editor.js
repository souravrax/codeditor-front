import React, { Component } from "react";
import MonacoEditor from "react-monaco-editor";
import ReactResizeDetector from 'react-resize-detector'
import { MetroSpinner as Loader } from 'react-spinners-kit'

import PropTypes from 'prop-types'

import { connect } from 'react-redux';

import { setCode } from '../app/master/master-actions'

import languageToSyntax from '../assets/mapLanguageToSyntax.json';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            width: 0,
            isReady: false
        };
    }


    editorDidMount = (editor, monaco) => {
        editor.onKeyDown(event => {
            const { browserEvent, ctrlKey } = event;
            const { key } = browserEvent;
            if (key === 's' && ctrlKey) {
                event.preventDefault();
            } else if(key == 'Enter' && ctrlKey) {
                event.preventDefault();
                alert("Execute");
            }
        });
    };

    componentDidMount() {
        this.setState({
            ...this.state,
            isReady: true
        })
    }

    handleResize = (width, height) => {
        this.setState({
            ...this.state,
            height: height,
            width: width
        })
    }

    render() {
        const { width, height, isReady } = this.state;
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
        } = this.props;

        return (
            <div style={{
                height: "100%",
                width: "100%"
            }}>
                <ReactResizeDetector
                    handleWidth
                    handleHeight
                    onResize={this.handleResize}
                    refreshMode="debounce"
                    refreshRate={50} />
                {
                    isReady ? <MonacoEditor
                        height={height}
                        width={width}
                        language={languageToSyntax[language]}
                        theme={`vs-${theme}`}
                        value={code}
                        options={{
                            minimap: {
                                enabled: minimapStatus
                            },
                            showFoldingControls: showFoldingControls,
                            selectOnLineNumbers: selectOnLineNumbers,
                            scrollbar: scrollbar,
                            quickSuggestions: quickSuggestion,
                            showUnused: showUnused
                        }}
                        onChange={(newCode, event) => {
                            setCode(newCode);
                        }}
                        editorDidMount={this.editorDidMount}
                        editorWillMount={this.editorWillMount}
                    /> :
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "black"
                        }}>
                            <Loader loading={!isReady} />
                        </div>
                }
            </div>
        );
    }
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