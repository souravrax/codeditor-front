import React, { useState } from 'react';
import NavBar from '../components/NavBar'
import Editor from "../components/Editor"

import { Textarea } from 'baseui/textarea';

import { connect } from 'react-redux'

import { setInput } from '../app/master/master-actions';


const MainPage = ({ input, setInput, output }) => {
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
                <Editor />
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
                    overrides={{
                        InputContainer: {
                            style: ({ $theme }) => {
                                return {
                                    borderRight: `1px solid ${$theme.colors.primary100}`,
                                    borderTop: `1px solid ${$theme.colors.primary100}`,
                                }
                            }
                        }
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
                                }
                            }
                        }
                    }}

                />
            </div>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    setInput: input => dispatch(setInput(input)),
})

const mapStateToProps = state => ({
    input: state.master.input,
    output: state.master.output,
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);