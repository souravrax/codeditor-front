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
import { useSnackbar, PLACEMENT, DURATION } from "baseui/snackbar";

import { connect } from "react-redux";

import exportHandler from "../controllers/exportHandler";
import { languageSet } from "../assets/languageOptions";

const snackBarNegative = {
    Root: {
        style: ({ $theme }) => ({
            backgroundColor: `${$theme.colors.negative400}`,
        }),
    },
    Message: {
        style: () => ({
            color: "#fff",
            fontWeight: "600",
        }),
    },
    StartEnhancerContainer: {
        style: () => ({
            color: "#fff",
        }),
    },
};

const Share = ({ show, setShow, code, language, input }) => {
    const [css, theme] = useStyletron();
    const linkRef = React.useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [id, setId] = useState("");
    const [copied, setCopied] = useState(false);
    const { enqueue } = useSnackbar();

    const [expire, setExpire] = useState({ label: "5 minutes", value: "1" });

    const shareHandler = () => {
        if (code.length === 0) {
            enqueue({
                startEnhancer: () => (
                    <i className="fas fa-exclamation-triangle"></i>
                ),
                overrides: snackBarNegative,
                message: "Code should not be blank",
            });
            return;
        } else if (!languageSet.find(language)) {
            enqueue({
                startEnhancer: () => (
                    <i className="fas fa-exclamation-triangle"></i>
                ),
                overrides: snackBarNegative,
                message: "Choose a valid language",
            });
            return;
        }
        setClicked(true);
        setIsLoading(true);
        setCopied(false);
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
            unstable_ModalBackdropScroll={true}
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
                <div className={css({ display: "flex", marginTop: "15px" })}>
                    {clicked ? (
                        isLoading ? (
                            <Skeleton
                                rows={0}
                                height={"40px"}
                                width={"100%"}
                                animation
                            />
                        ) : (
                            <>
                                <Input
                                    inputRef={linkRef}
                                    placeholder="Link"
                                    value={id}
                                    size={SIZE.compact}
                                    startEnhancer={() => (
                                        <i className="fas fa-key"></i>
                                    )}
                                />
                                <Button
                                    kind={ButtonKind.primary}
                                    size={SIZE.compact}
                                    startEnhancer={() => (
                                        <i className="fas fa-copy"></i>
                                    )}
                                    onClick={() => {
                                        linkRef.current &&
                                            linkRef.current.select();
                                        document.execCommand("copy");
                                        setCopied(true);
                                        setTimeout(() => {
                                            setCopied(false);
                                        }, 2000);
                                    }}
                                >
                                    Copy
                                </Button>
                            </>
                        )
                    ) : (
                        <p>
                            <i
                                className={
                                    `fas fa-info-circle ` +
                                    css({
                                        marginRight: "5px",
                                    })
                                }
                            ></i>
                            Click Share to get the share ID
                        </p>
                    )}
                </div>
                {copied && (
                    <p
                        className={css({
                            color: theme.colors.positive300,
                        })}
                    >
                        Copied to your clipboard 🎉, share this key with others
                        😀
                    </p>
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
