import React, { useState } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
    ROLE
} from "baseui/modal";
import { useStyletron } from 'baseui';
import { Input } from 'baseui/input'
import { Button, SIZE, SHAPE, KIND as ButtonKind } from "baseui/button";

const Share = ({ show, setShow }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [css, theme] = useStyletron();
    const linkRef = React.useRef(null);
    return (
        <Modal
            onClose={() => {
                setShow(false);
                setIsCopied(false);
            }}
            closeable
            isOpen={show}
            size={SIZE.default}
            role={ROLE.dialog}
        >
            <ModalHeader><h3>Share Your Code</h3></ModalHeader>
            <ModalBody>
                <div className={css({ display: 'flex' })}>
                    <Input
                        inputRef={linkRef}
                        placeholder="Link"
                        value="https://xyz.com/share/hash"
                        autoFocus
                    />
                    <Button
                        kind={ButtonKind.primary}
                        onClick={() => {
                            linkRef.current && linkRef.current.select();
                            document.execCommand("copy")
                            setIsCopied(true);
                        }}
                    >
                        Copy
                    </Button>
                </div>
                <span>{isCopied ? "Link copied to clipboard" : ""}</span>
            </ModalBody>
            <ModalFooter>
                <ModalButton
                    onClick={() => {
                        setShow(false)
                        setIsCopied(false);
                    }}
                    kind={ButtonKind.tertiary}>
                    Close
                </ModalButton>
            </ModalFooter>
        </Modal>

    );
};

export default Share;