import React, { Component } from "react";

const MonacoEditor = React.lazy(() => import("react-monaco-editor"))

import ReactResizeDetector from 'react-resize-detector'

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
        this.editorContainerRef = React.createRef();
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
            }} ref={this.editorContainerRef}>
                <ReactResizeDetector
                    handleWidth
                    handleHeight
                    onResize={this.handleResize}
                    refreshMode="debounce"
                    refreshRate={50}
                    targetRef={this.editorContainerRef} />
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
                    /> : null
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