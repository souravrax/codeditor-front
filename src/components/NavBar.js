import React, { useState, useMemo } from "react";
import {
    HeaderNavigation,
    ALIGN,
    StyledNavigationList,
    StyledNavigationItem
} from "baseui/header-navigation";
import { useStyletron } from 'baseui';
import { Button, SIZE, SHAPE, KIND as ButtonKind } from "baseui/button";
import { Input } from 'baseui/input'

import { Combobox } from 'baseui/combobox';
import { Heading, HeadingLevel } from 'baseui/heading'

import Settings from './Settings'
import Share from './Share'


const options =
    [
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

const NavBar = () => {
    const [value, setValue] = React.useState("");
    const [language, setLanguage] = React.useState("Bash");
    const [showSettings, setShowSettings] = React.useState(false);
    const [showShareModel, setShowShareModel] = React.useState(false);
    const [css] = useStyletron();

    options.sort();

    function mapOptionToString(option) {
        return option.label;
    }
    const filteredOptions = useMemo(() => {
        return options.filter(option => {
            const optionAsString = mapOptionToString(option);
            return optionAsString
                .toLowerCase()
                .includes(value.toLowerCase());
        });
    }, [options, value]);

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
                            options={filteredOptions}
                            mapOptionToString={mapOptionToString}
                            name="Language"
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
                            }}
                            isLoading={false}
                        >
                            Run
                    </Button>
                    </StyledNavigationItem>
                </StyledNavigationList>
                <StyledNavigationList $align={ALIGN.right} $style={{ marginRight: "10px" }}>
                    <StyledNavigationItem>
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
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

export default NavBar;