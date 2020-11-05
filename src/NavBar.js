import * as React from "react";
import {
    HeaderNavigation,
    ALIGN,
    StyledNavigationList,
    StyledNavigationItem
} from "baseui/header-navigation";
import { Button, SIZE, SHAPE } from "baseui/button";
import { Input } from 'baseui/input'
import { Select } from 'baseui/select'
import { Drawer } from "baseui/drawer"
import { Heading, HeadingLevel } from 'baseui/heading'

export default ({toggleTheme}) => {
    const [value, setValue] = React.useState("");
    const [language, setLanguage] = React.useState("");
    const [open, isOpen] = React.useState(false);
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
                        <Select
                            size={SIZE.compact}
                            options={[
                                { label: "C", id: "c" },
                                { label: "C++", id: "c++" },
                                { label: "Java", id: "java" },
                                { label: "Python 3", id: "python3" },
                            ]}
                            startEnhancer={() => <i className="fas fa-code"></i>}
                            value={language}
                            placeholder="Language"
                            onChange={(params) => setLanguage(params.value)}
                            required
                            clearable={false}
                        >
                        </Select>
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
                        <Button
                            size={SIZE.compact}
                            shape={SHAPE.round}
                            onClick={()=>toggleTheme()}
                        >
                            <i className="fas fa-moon"></i>
                        </Button>
                    </StyledNavigationItem>
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
                            onClick={() => isOpen(true)}
                        >Settings</Button>
                    </StyledNavigationItem>

                </StyledNavigationList>

            </HeaderNavigation>
            <Drawer
                isOpen={open}
                autoFocus
                onClose={() => isOpen(false)}
            >
                <h1
                >Settings</h1>
            </Drawer>
        </div>
    );
}