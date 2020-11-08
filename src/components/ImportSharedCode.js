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

const ImportSharedCode = ({ show, setShow }) => {
    const [id, setId] = useState('');
    const [css, theme] = useStyletron();
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
            <ModalHeader><h3>Import Shared Code</h3></ModalHeader>
            <ModalBody>
                <div className={css({ display: 'flex' })}>
                    <Input
                        placeholder="ID of the shared code"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        autoFocus
                    />
                    <Button
                        startEnhancer={()=><i className="fas fa-file-import"></i>}
                        kind={ButtonKind.primary}
                    >
                        Import
                    </Button>
                </div>
            </ModalBody>
            <ModalFooter>
                <ModalButton
                    onClick={() => {
                        setShow(false)
                    }}
                    kind={ButtonKind.tertiary}>
                    Close
                </ModalButton>
            </ModalFooter>
        </Modal>

    );
};

export default ImportSharedCode;