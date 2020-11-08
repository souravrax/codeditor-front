"use strict";
import React from "react";

// Baseui
import { HeaderNavigation, ALIGN, StyledNavigationList, StyledNavigationItem } from "baseui/header-navigation";
import { Button, SIZE, SHAPE, KIND as ButtonKind } from "baseui/button";
import { Input } from 'baseui/input'
import { Combobox } from 'baseui/combobox';
import { Heading, HeadingLevel } from 'baseui/heading'
import { useSnackbar, PLACEMENT, DURATION } from 'baseui/snackbar';

// Custom Components
import Settings from './Settings'
import Share from './Share'

// React spinners kit
import { RingSpinner } from 'react-spinners-kit'
// Redux
import { connect } from 'react-redux';
import { setCommandLineArguments, setExecutionState, setLanguage, setOutput } from '../app/master/master-actions';

// Connect to server
import axios from 'axios';


// Resource import 
import { languageOptions as options, languageSet } from '../assets/languageOptions';


// const URL = "http://localhost:5000/execute/";
const URL = "https://codeditorapi.azurewebsites.net/execute";

const NavBar = ({ code, isExecuting, setIsExecuting, cla, setCLA, language, setLanguage, input, setOutput }) => {
    const [showSettings, setShowSettings] = React.useState(false);
    const [showShareModel, setShowShareModel] = React.useState(false);
    const { enqueue } = useSnackbar(PLACEMENT.top);

    const handleRun = () => {
        setIsExecuting(true);
        if (!languageSet.find(language)) {
            setIsExecuting(false);
            enqueue({
                startEnhancer: ({ size }) => <i className="fas fa-exclamation-triangle"></i>,
                message: "Language is not valid, please select one from the dropdown"
            },
                DURATION.short
            )
            return;
        }
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
                setOutput(response.data.output);
            })
            .catch(error => {
                setIsExecuting(false);
                console.log(error);
            });
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
                            <Heading
                                overrides={{
                                    Block: {
                                        style: ({ $theme }) => ({
                                            fontSize: "20px",
                                            lineHeight: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            fontFamily: `"Comfortaa", cursive`,
                                        })
                                    }
                                }}
                            >
                                c
                                <RingSpinner />
                                deditor
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
                            clearable={false}
                            options={options}
                            error={language.length == 0}
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
                            isLoading={isExecuting}
                            onClick={handleRun}
                            overrides={{
                                BaseButton: {
                                    style: ({ $theme, $isLoading }) => {
                                        return {
                                            backgroundColor: `${$isLoading ? $theme.colors.positive200 : $theme.colors.positive300}`,
                                            borderTopLeftRadius: `${$theme.borders.radius200} !important`,
                                            borderTopRightRadius: `${$theme.borders.radius200} !important`,
                                            borderBottomLeftRadius: `${$theme.borders.radius200} !important`,
                                            borderBottomRightRadius: `${$theme.borders.radius200} !important`,
                                            paddingTop: "10px",
                                            paddingBottom: "10px",
                                            paddingLeft: "30px",
                                            paddingRight: "30px",
                                            boxShadow: `${$theme.lighting.shadow400}`
                                        }
                                    }
                                }
                            }}
                        > Run </Button>
                    </StyledNavigationItem>
                </StyledNavigationList>
                <StyledNavigationList $align={ALIGN.right} $style={{ marginRight: "10px" }}>
                    <StyledNavigationItem>
                        <Input
                            value={cla}
                            onChange={(e) => setCLA(e.target.value)}
                            placeholder="Command Line Args"
                            disabled
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