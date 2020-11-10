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

import importHandler from "../controllers/importHandler";

import { connect } from "react-redux";
import {
    setCode,
    setLanguage,
    setInput,
    setOutput,
} from "../app/master/master-actions";

const ImportSharedCode = ({
    show,
    setShow,
    setCode,
    setInput,
    setLanguage,
    setOutput,
}) => {
    const [id, setId] = useState("");
    const [css, theme] = useStyletron();
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Modal
            onClose={() => {
                setShow(false);
            }}
            closeable
            isOpen={show}
            size={SIZE.default}
            role={ROLE.dialog}
        >
            <ModalHeader>
                <h3>Import Shared Code</h3>
            </ModalHeader>
            <ModalBody>
                <div className={css({ display: "flex" })}>
                    <Input
                        placeholder="ID of the shared code"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        autoFocus
                    />
                    <Button
                        startEnhancer={() => (
                            <i className="fas fa-file-import"></i>
                        )}
                        kind={ButtonKind.primary}
                        isLoading={isLoading}
                        onClick={() => {
                            console.log("called");
                            setIsLoading(true);
                            importHandler(
                                id,
                                setIsLoading,
                                setCode,
                                setInput,
                                setLanguage,
                                setShow
                            );
                            setOutput("");
                        }}
                    >
                        Import
                    </Button>
                </div>
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
