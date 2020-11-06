import React, { Component } from "react";
import MonacoEditor from "react-monaco-editor";
import ReactResizeDetector from 'react-resize-detector'
import { MetroSpinner as Loader } from 'react-spinners-kit'

import PropTypes from 'prop-types'

import { connect } from 'react-redux';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            height: 0,
            width: 0,
            isReady: false
        };
    }


    editorDidMount = (editor, monaco) => {
        this.setState({
            ...this.state,
            code: '',
        })
        // if (this.props.focus) editor.focus();
        // console.log(editor.onKeyDown(event => {

        //     const { browserEvent, ctrlKey } = event;
        //     if (browserEvent.key === 's' && ctrlKey) {
        //         event.preventDefault();
        //         if (this.props.editorOptions.readOnly) {
        //             alert("ReadOnly area, cannot simulate ctrl+s")
        //         } else {
        //             // console.log("Saving", this.state.code);
        //         }
        //     }

        // }));
    };

    componentDidMount() {
        this.setState({
            ...this.state,
            isReady: true
        })
    }

    onChange = (newValue, e) => {
        this.setState({
            ...this.state,
            code: newValue
        })
    };

    handleResize = (width, height) => {
        this.setState({
            ...this.state,
            height: height,
            width: width
        })
    }

    render() {
        const { code, width, height, isReady } = this.state;
        const { editorOptions, language, theme } = this.props;
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
                        language={language}
                        theme={`vs-${theme}`}
                        value={code}
                        options={editorOptions}
                        onChange={this.onChange}
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
    theme: state.settings.theme
})

export default connect(mapStateToProps)(Editor);