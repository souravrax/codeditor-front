import React, { useState } from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
    ROLE,
} from "baseui/modal";
import { useStyletron } from "baseui";
import { Input } from "baseui/input";
import { Button, SIZE, SHAPE, KIND as ButtonKind } from "baseui/button";
import { FormControl } from "baseui/form-control";
import Select from "react-select";
import { Skeleton } from "baseui/skeleton";

import { connect } from "react-redux";

import exportHandler from "../controllers/exportHandler";

const Share = ({ show, setShow, code, language, input }) => {
    const [css, theme] = useStyletron();
    const linkRef = React.useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [id, setId] = useState("");

    const [expire, setExpire] = useState({ label: "5 minutes", value: "1" });

    const shareHandler = () => {
        setClicked(true);
        setIsLoading(true);
        exportHandler(code, language, input, expire, setIsLoading, setId);
    };

    const options = [
        { label: "5 minutes", value: "1" },
        { label: "30 minutes", value: "2" },
        { label: "2 hours", value: "3" },
        { label: "12 hours", value: "4" },
        { label: "1 day", value: "5" },
        { label: "5 days", value: "6" },
    ];
    return (
        <Modal
            onClose={() => {
                setShow(false);
                setClicked(false);
            }}
            closeable
            isOpen={show}
            size={SIZE.default}
            role={ROLE.dialog}
        >
            <ModalHeader>
                <h3>Share Your Code</h3>
            </ModalHeader>
            <ModalBody>
                <FormControl label={() => "Expire After"}>
                    <Select
                        isDisabled={isLoading}
                        value={expire}
                        options={options}
                        onChange={(exp) => {
                            setExpire(exp);
                        }}
                    />
                </FormControl>
                <Button
                    size={SIZE.compact}
                    isLoading={isLoading}
                    overrides={{
                        BaseButton: {
                            style: ({ $theme }) => ({
                                width: "100%",
                                marginTop: 0,
                                marginBottom: "20px",
                                borderTopLeftRadius: $theme.borders.radius200,
                                borderTopRightRadius: $theme.borders.radius200,
                                borderBottomRightRadius:
                                    $theme.borders.radius200,
                                borderBottomLeftRadius:
                                    $theme.borders.radius200,
                            }),
                        },
                    }}
                    onClick={shareHandler}
                >
                    <i
                        className="fas fa-share"
                        style={{
                            marginRight: "10px",
                        }}
                    ></i>
                    Share
                </Button>
                {/* Copying the ID */}
                {clicked ? (
                    isLoading ? (
                        <Skeleton
                            rows={0}
                            height={"40px"}
                            width={"100%"}
                            animation
                        />
                    ) : (
                        <div className={css({ display: "flex" })}>
                            <Input
                                inputRef={linkRef}
                                placeholder="Link"
                                value={id}
                                size={SIZE.compact}
                            />
                            <Button
                                kind={ButtonKind.primary}
                                size={SIZE.compact}
                                startEnhancer={() => (
                                    <i className="fas fa-copy"></i>
                                )}
                                onClick={() => {
                                    linkRef.current && linkRef.current.select();
                                    document.execCommand("copy");
                                }}
                            >
                                Copy
                            </Button>
                        </div>
                    )
                ) : (
                    <Skeleton
                        rows={0}
                        height={"40px"}
                        width={"100%"}
                        animation
                    />
                )}
            </ModalBody>
            <ModalFooter>
                <ModalButton
                    onClick={() => {
                        setShow(false);
                        setClicked(false);
                    }}
                    kind={ButtonKind.tertiary}
                >
                    Close
                </ModalButton>
            </ModalFooter>
        </Modal>
    );
};

const mapStateToProps = ({ master }) => ({
    code: master.code,
    language: master.language,
    input: master.input,
});

export default connect(mapStateToProps)(Share);
