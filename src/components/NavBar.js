import React, { useState } from "react";

// Baseui
import { useStyletron } from 'baseui';
import {
    HeaderNavigation,
    ALIGN,
    StyledNavigationList,
    StyledNavigationItem
} from "baseui/header-navigation";
import { Button, SIZE, SHAPE, KIND as ButtonKind } from "baseui/button";
import { Input } from 'baseui/input'

import { Combobox } from 'baseui/combobox';
import { Heading, HeadingLevel } from 'baseui/heading'

import Settings from './Settings'
import Share from './Share'


// Redux
import { connect } from 'react-redux';
import { setCommandLineArguments, setExecutionState, setLanguage, setOutput } from '../app/master/master-actions';

// Connect to server
import axios from 'axios';

const options = [
    { label: "Bash", id: "bash" },
    { label: "C", id: "c" },
    { label: "C++", id: "c++" },
    { label: "C++14", id: "c++14" },
    { label: "C++17", id: "c++17" },
    { label: "Java", id: "java" },
    { label: "Python 2", id: "py2" },
    { label: "Python 3", id: "py3" },
    { label: "Javascript", id: "nodejs" },
    { label: "Go", id: "go" },
];

const URL = "http://localhost:5000/";

const NavBar = ({ code, isExecuting, setIsExecuting, cla, setCLA, language, setLanguage, input, setOutput }) => {
    const [showSettings, setShowSettings] = React.useState(false);
    const [showShareModel, setShowShareModel] = React.useState(false);
    const [css] = useStyletron();


    const handleRun = () => {
        setIsExecuting(true);
        const payload = {
            code: code,
            cArgs: cla,
            language: language,
            input: input
        }
        console.table(payload);
        axios.post(URL, payload)
            .then(response => {
                setIsExecuting(false);
                console.log("Response: ", response);
                setOutput(response);
            })
            .catch(error => {
                setIsExecuting(false);
                console.log(error);
            })
    }

    return (
        <div>
            <HeaderNavigation>
                <StyledNavigationList $align={ALIGN.left}>
                    <StyledNavigationItem
                        $style={{
                            color: "#fff",
                            fontFamily: "Poppins"
                        }}
                    >
                        <HeadingLevel>
                            <Heading styleLevel={4}>
                                CodEditor
                        </Heading>
                        </HeadingLevel>
                    </StyledNavigationItem>
                    <StyledNavigationItem>
                        <Combobox
                            value={language}
                            onChange={lang => {
                                setLanguage(lang);
                                console.log(lang);
                            }}
                            size={SIZE.compact}
                            options={options}
                            mapOptionToString={(option) => option.label}
                        />
                    </StyledNavigationItem>
                </StyledNavigationList>
                <StyledNavigationList $align={ALIGN.center}
                >
                    <StyledNavigationItem>
                        <Button
                            size={SIZE.compact}
                            startEnhancer={() => <i className="fas fa-play"></i>}
                            $style={{
                                backgroundColor: "#00AE86",
                                margin: "0px",
                            }}
                            isLoading={isExecuting}
                            onClick={handleRun}
                        >
                            Run
                    </Button>
                    </StyledNavigationItem>
                </StyledNavigationList>
                <StyledNavigationList $align={ALIGN.right} $style={{ marginRight: "10px" }}>
                    <StyledNavigationItem>
                        <Input
                            value={cla}
                            onChange={(e) => setCLA(e.target.value)}
                            placeholder="Command Line Args"
                            size={SIZE.compact}
                            startEnhancer={() => <i className="fas fa-terminal"></i>}
                            clearOnEscape
                        />
                    </StyledNavigationItem>
                    <StyledNavigationItem>
                        <Button
                            startEnhancer={() => <i className="fas fa-cog"></i>}
                            size={SIZE.compact}
                            onClick={() => setShowSettings(true)}
                        >Settings</Button>
                    </StyledNavigationItem>
                    <StyledNavigationItem>
                        <Button
                            startEnhancer={() => <i className="fas fa-share"></i>}
                            size={SIZE.compact}
                            onClick={() => setShowShareModel(true)}
                        >Share</Button>
                    </StyledNavigationItem>
                </StyledNavigationList>

            </HeaderNavigation>
            <Settings showSettings={showSettings} setShowSettings={setShowSettings} />
            <Share show={showShareModel} setShow={setShowShareModel} />
        </div >
    );
}

const mapStateToProps = state => ({
    isExecuting: state.master.isExecuting,
    language: state.master.language,
    cla: state.master.commandLineArguments,
    input: state.master.input,
    code: state.master.code
})

const mapDispatchToProps = dispatch => ({
    setIsExecuting: value => dispatch(setExecutionState(value)),
    setLanguage: language => dispatch(setLanguage(language)),
    setCLA: cla => dispatch(setCommandLineArguments(cla)),
    setOutput: output => dispatch(setOutput(output))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);