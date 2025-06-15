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
import { useSnackbar, PLACEMENT, DURATION } from "baseui/snackbar";

import importHandler from "../controllers/importHandler";

import { connect } from "react-redux";
import {
    setCode,
    setLanguage,
    setInput,
    setOutput,
} from "../app/master/master-actions";

const Body = ({
    id,
    setCode,
    setInput,
    setLanguage,
    setShow,
    enqueue,
    isLoading,
    setIsLoading,
    importHandler,
    setId,
}) => {
    const [css] = useStyletron();
    return (
        <>
            <div className={css({ display: "flex" })}>
                <Input
                    placeholder="ID of the shared code"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    autoFocus
                />
                <Button
                    startEnhancer={() => <i className="fas fa-file-import"></i>}
                    kind={ButtonKind.primary}
                    isLoading={isLoading}
                    onClick={() => {
                        // console.log("called");
                        setIsLoading(true);
                        importHandler(
                            id,
                            setIsLoading,
                            setCode,
                            setInput,
                            setLanguage,
                            setShow,
                            enqueue
                        );
                        setOutput("");
                    }}
                >
                    Import
                </Button>
            </div>
            <p
                className={css({
                    marginTop: "10px",
                    width: "100%",
                    fontFamily: `system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif`,
                    fontWeight: 400
                })}
            >
                <i
                    className={
                        `fas fa-info-circle ` +
                        css({
                            marginRight: "5px",
                        })
                    }
                ></i>
                Enter the share ID to fetch the code
            </p>
        </>
    );
};

const ImportSharedCode = ({
    show,
    setShow,
    setCode,
    setInput,
    setLanguage,
    setOutput,
}) => {
    const [id, setId] = useState("");
    const [css] = useStyletron();
    const [isLoading, setIsLoading] = useState(false);
    const { enqueue } = useSnackbar();
    return (
        <Modal
            onClose={() => {
                setShow(false);
            }}
            closeable
            animate
            autoFocus
            isOpen={show}
            unstable_ModalBackdropScroll={true}
            size={SIZE.default}
            role={ROLE.dialog}
        >
            <ModalHeader>
                <h3>Import Shared Code</h3>
            </ModalHeader>
            <ModalBody>
                <Body
                    enqueue={enqueue}
                    id={id}
                    importHandler={importHandler}
                    isLoading={isLoading}
                    setCode={setCode}
                    setId={setId}
                    setInput={setInput}
                    setIsLoading={setIsLoading}
                    setLanguage={setLanguage}
                    setShow={setShow}
                />
            </ModalBody>
            <ModalFooter>
                <ModalButton
                    onClick={() => {
                        setShow(false);
                    }}
                    kind={ButtonKind.tertiary}
                >
                    Close
                </ModalButton>
            </ModalFooter>
        </Modal>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setCode: (code) => dispatch(setCode(code)),
    setLanguage: (language) => dispatch(setLanguage(language)),
    setInput: (input) => dispatch(setInput(input)),
    setOutput: (output) => dispatch(setOutput(output)),
});

export default connect(null, mapDispatchToProps)(ImportSharedCode);
